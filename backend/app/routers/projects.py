import uuid

from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile, status

from app.auth import get_current_admin
from app.database import supabase
from app.models.project import ProjectResponse, ProjectUpdate

router = APIRouter(prefix="/api/projects", tags=["projects"])

BUCKET = "project-images"


@router.get("", response_model=list[ProjectResponse])
async def list_projects():
    result = supabase.table("projects").select("*").order("created_at", desc=True).execute()
    return result.data


@router.get("/{project_id}", response_model=ProjectResponse)
async def get_project(project_id: int):
    result = supabase.table("projects").select("*").eq("id", project_id).single().execute()
    if not result.data:
        raise HTTPException(status_code=404, detail="Không tìm thấy dự án")
    return result.data


@router.post("", response_model=ProjectResponse, status_code=status.HTTP_201_CREATED)
async def create_project(
    name: str = Form(...),
    location: str = Form(""),
    category: str = Form("khac"),
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

    result = supabase.table("projects").insert({
        "name": name,
        "location": location,
        "category": category,
        "image_url": public_url,
    }).execute()

    return result.data[0]


@router.patch("/{project_id}", response_model=ProjectResponse)
async def update_project(
    project_id: int,
    body: ProjectUpdate,
    _admin: str = Depends(get_current_admin),
):
    data = body.model_dump(exclude_none=True)
    if not data:
        raise HTTPException(status_code=400, detail="Không có trường nào để cập nhật")
    result = supabase.table("projects").update(data).eq("id", project_id).execute()
    if not result.data:
        raise HTTPException(status_code=404, detail="Không tìm thấy dự án")
    return result.data[0]


@router.delete("/{project_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_project(
    project_id: int,
    _admin: str = Depends(get_current_admin),
):
    result = supabase.table("projects").select("image_url").eq("id", project_id).single().execute()
    if not result.data:
        raise HTTPException(status_code=404, detail="Không tìm thấy dự án")

    image_url: str = result.data.get("image_url", "")
    if image_url:
        filename = image_url.split("/")[-1]
        supabase.storage.from_(BUCKET).remove([filename])

    supabase.table("projects").delete().eq("id", project_id).execute()
