from pydantic import BaseModel
from typing import Optional


class ProjectCreate(BaseModel):
    name: str
    location: str = ""
    category: str = "khac"


class ProjectUpdate(BaseModel):
    name: Optional[str] = None
    location: Optional[str] = None
    category: Optional[str] = None


class ProjectResponse(BaseModel):
    id: int
    name: str
    location: str
    category: str
    image_url: str
    created_at: str
