from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from typing import List

from model.NB import NaiveBayesTextClassifier
import uvicorn
import models
import schemas
import crud
import auth
from database import SessionLocal, engine
from grammar_correction import  check_grammar

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

@app.post("/token", response_model=schemas.Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = auth.authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = auth.create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"}

@app.post("/users/", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return crud.create_user(db=db, user=user)

@app.post("/correct-grammar/", response_model=schemas.CorrectionResponseWithCheck)
async def correct_grammar_endpoint(request: schemas.CorrectionRequest, current_user: schemas.User = Depends(auth.get_current_user), db: Session = Depends(get_db)):
    original_check, corrected_text, corrected_check = check_grammar(request.text)
    
    correction = crud.create_correction(
        db, 
        user_id=current_user.id, 
        original_text=request.text, 
        corrected_text=corrected_text,
        original_check=original_check,
        corrected_check=corrected_check
    )
    
    return {
        "corrected_text": corrected_text,
        "correction_id": correction.id,
        "original_check": original_check,
        "corrected_check": corrected_check
    }

@app.get("/users/", response_model=List[schemas.User])
async def read_users(skip: int = 0, limit: int = 100, current_user: schemas.User = Depends(auth.get_current_admin_user), db: Session = Depends(get_db)):
    users = crud.get_users(db, skip=skip, limit=limit)
    return users

@app.delete("/users/{user_id}", response_model=schemas.User)
async def delete_user(user_id: int, current_user: schemas.User = Depends(auth.get_current_admin_user), db: Session = Depends(get_db)):
    user = crud.delete_user(db, user_id=user_id)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@app.get("/corrections/", response_model=List[schemas.Correction])
async def read_corrections(skip: int = 0, limit: int = 100, current_user: schemas.User = Depends(auth.get_current_admin_user), db: Session = Depends(get_db)):
    corrections = crud.get_corrections(db, skip=skip, limit=limit)
    return corrections

if __name__ == "__main__" : 
    uvicorn.run(app) 