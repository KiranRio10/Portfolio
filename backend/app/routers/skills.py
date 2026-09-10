from typing import List, Dict, Any
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Skill

router = APIRouter(prefix="/api/skills", tags=["Skills"])

@router.get("", response_model=List[Dict[str, Any]])
def list_skills(db: Session = Depends(get_db)):
    skills = db.query(Skill).all()
    # Group by category
    categories = {}
    for s in skills:
        cat = s.category
        if cat not in categories:
            categories[cat] = []
        categories[cat].append(s.to_dict())

    result = []
    for cat_name, skill_list in categories.items():
        result.append({
            "category": cat_name,
            "skills": skill_list
        })
    return result
