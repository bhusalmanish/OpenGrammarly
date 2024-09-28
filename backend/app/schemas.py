from pydantic import BaseModel
from typing import List, Optional

class UserBase(BaseModel):
    email: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    is_admin: bool

    class Config:
        orm_mode = True

class CorrectionBase(BaseModel):
    original_text: str
    corrected_text: str

class CorrectionCreate(CorrectionBase):
    pass

class Correction(CorrectionBase):
    id: int
    user_id: int

    class Config:
        orm_mode = True

class CorrectionRequest(BaseModel):
    text: str

class CorrectionResponseWithCheck(BaseModel):
    corrected_text: str
    correction_id: int
    original_check: int
    corrected_check: int

class Token(BaseModel):
    access_token: str
    token_type: str
    
class TokenData(BaseModel):
    email: Optional[str] = None