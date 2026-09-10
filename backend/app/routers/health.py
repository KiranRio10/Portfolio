from datetime import datetime, timezone
from fastapi import APIRouter
from app.database import get_db_info
from app.schemas import HealthResponse

router = APIRouter(prefix="/api/health", tags=["Health"])

@router.get("", response_model=HealthResponse)
def get_health():
    db_info = get_db_info()
    return {
        "status": "healthy",
        "app": "Medishetty Kiran Kumar Portfolio API",
        "version": "2.0.0 (FastAPI + PostgreSQL)",
        "database": db_info,
        "timestamp": datetime.now(timezone.utc).isoformat()
    }
