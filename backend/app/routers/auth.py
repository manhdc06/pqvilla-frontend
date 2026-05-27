from fastapi import APIRouter, HTTPException, status

from app.auth import (
    LoginRequest,
    TokenResponse,
    create_access_token,
    hash_password,
    verify_password,
)
from app.config import settings

router = APIRouter(prefix="/api/auth", tags=["auth"])

# Hashed password lưu trong env (production nên lưu DB)
_ADMIN_HASH = hash_password(settings.admin_password)


@router.post("/login", response_model=TokenResponse)
async def login(body: LoginRequest):
    if body.email != settings.admin_email or not verify_password(body.password, _ADMIN_HASH):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Email hoặc mật khẩu không đúng")
    token = create_access_token({"sub": body.email})
    return TokenResponse(access_token=token)
