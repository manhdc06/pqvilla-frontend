from pydantic import BaseModel
from typing import Optional


class ProductCreate(BaseModel):
    name: str
    category: str
    description: str = "Sản phẩm nhôm kính cao cấp."


class ProductUpdate(BaseModel):
    name: Optional[str] = None
    category: Optional[str] = None
    description: Optional[str] = None


class ProductResponse(BaseModel):
    id: int
    name: str
    category: str
    description: str
    image_url: str
    created_at: str
