from typing import List, Dict, Any
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Project

router = APIRouter(prefix="/api/projects", tags=["Projects"])

@router.get("", response_model=List[Dict[str, Any]])
def list_projects(db: Session = Depends(get_db)):
    projects = db.query(Project).all()
    return [p.to_dict() for p in projects]

@router.get("/{project_id}", response_model=Dict[str, Any])
def get_project(project_id: str, db: Session = Depends(get_db)):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project.to_dict()
