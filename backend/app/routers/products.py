import base64
import uuid
from typing import Optional

from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile, status

from app.auth import get_current_admin
from app.database import supabase
from app.models.product import ProductCreate, ProductResponse, ProductUpdate

router = APIRouter(prefix="/api/products", tags=["products"])

BUCKET = "product-images"


@router.get("", response_model=list[ProductResponse])
async def list_products(limit: Optional[int] = None):
    query = supabase.table("products").select("*").order("created_at", desc=True)
    if limit:
        query = query.limit(limit)
    result = query.execute()
    return result.data


@router.get("/{product_id}", response_model=ProductResponse)
async def get_product(product_id: int):
    result = supabase.table("products").select("*").eq("id", product_id).single().execute()
    if not result.data:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Không tìm thấy sản phẩm")
    return result.data


@router.post("", response_model=ProductResponse, status_code=status.HTTP_201_CREATED)
async def create_product(
    name: str = Form(...),
    category: str = Form(...),
    description: str = Form("Sản phẩm nhôm kính cao cấp."),
    image: UploadFile = File(...),
    _admin: str = Depends(get_current_admin),
):
    ext = image.filename.rsplit(".", 1)[-1].lower() if image.filename and "." in image.filename else "jpg"
    filename = f"{uuid.uuid4().hex}.{ext}"
    content = await image.read()

    upload_result = supabase.storage.from_(BUCKET).upload(
        filename,
        content,
        {"content-type": image.content_type or "image/jpeg"},
    )
    if hasattr(upload_result, "error") and upload_result.error:
        raise HTTPException(status_code=500, detail="Upload ảnh thất bại")

    public_url = supabase.storage.from_(BUCKET).get_public_url(filename)

    result = supabase.table("products").insert({
        "name": name,
        "category": category,
        "description": description,
        "image_url": public_url,
    }).execute()

    return result.data[0]


@router.patch("/{product_id}", response_model=ProductResponse)
async def update_product(
    product_id: int,
    body: ProductUpdate,
    _admin: str = Depends(get_current_admin),
):
    data = body.model_dump(exclude_none=True)
    if not data:
        raise HTTPException(status_code=400, detail="Không có trường nào để cập nhật")
    result = supabase.table("products").update(data).eq("id", product_id).execute()
    if not result.data:
        raise HTTPException(status_code=404, detail="Không tìm thấy sản phẩm")
    return result.data[0]


@router.delete("/{product_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_product(
    product_id: int,
    _admin: str = Depends(get_current_admin),
):
    result = supabase.table("products").select("image_url").eq("id", product_id).single().execute()
    if not result.data:
        raise HTTPException(status_code=404, detail="Không tìm thấy sản phẩm")

    image_url: str = result.data.get("image_url", "")
    if image_url:
        filename = image_url.split("/")[-1]
        supabase.storage.from_(BUCKET).remove([filename])

    supabase.table("products").delete().eq("id", product_id).execute()
