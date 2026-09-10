import json
from typing import Dict, Any
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.database import get_db
from app.models import AnalyticsEvent
from app.schemas import AnalyticsTrackRequest

router = APIRouter(prefix="/api/analytics", tags=["Analytics"])

@router.post("/track")
def track_event(payload: AnalyticsTrackRequest, db: Session = Depends(get_db)):
    event = AnalyticsEvent(
        event_type=payload.event_type,
        event_name=payload.event_name,
        metadata_json=json.dumps(payload.metadata) if payload.metadata else "{}"
    )
    db.add(event)
    db.commit()
    db.refresh(event)
    return {"status": "recorded", "id": event.id}

@router.get("/summary")
def get_analytics_summary(db: Session = Depends(get_db)):
    total_events = db.query(AnalyticsEvent).count()
    page_views = db.query(AnalyticsEvent).filter(AnalyticsEvent.event_type == "page_view").count()
    project_clicks = db.query(AnalyticsEvent).filter(AnalyticsEvent.event_type == "project_click").count()
    terminal_cmds = db.query(AnalyticsEvent).filter(AnalyticsEvent.event_type == "terminal_command").count()

    return {
        "totalEvents": total_events,
        "pageViews": page_views,
        "projectClicks": project_clicks,
        "terminalCommands": terminal_cmds
    }
