from sqlalchemy.orm import Session
import models
import schemas
import crud
from auth import get_password_hash

def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()

def create_user(db: Session, user: schemas.UserCreate):
    hashed_password = get_password_hash(user.password)
    db_user = models.User(email=user.email, hashed_password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def delete_user(db: Session, user_id: int):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if user:
        db.delete(user)
        db.commit()
    return user

def create_correction(db: Session, user_id: int, original_text: str, corrected_text: str, original_check: int, corrected_check: int):
    db_correction = models.Correction(
        user_id=user_id,
        original_text=original_text,
        corrected_text=corrected_text,
        original_check=original_check,
        corrected_check=corrected_check
    )
    db.add(db_correction)
    db.commit()
    db.refresh(db_correction)
    return db_correction

def get_corrections(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Correction).offset(skip).limit(limit).all()