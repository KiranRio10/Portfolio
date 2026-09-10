from typing import List, Dict, Any, Optional
from pydantic import BaseModel, Field

class ContactCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=128)
    email: str = Field(..., min_length=5, max_length=255)
    message: str = Field(..., min_length=5, max_length=5000)

class ContactResponse(BaseModel):
    id: int
    name: str
    email: str
    message: str
    isRead: bool
    createdAt: Optional[str] = None
    status: str = "success"

class AnalyticsTrackRequest(BaseModel):
    event_type: str = Field(..., max_length=64)
    event_name: str = Field(..., max_length=128)
    metadata: Optional[Dict[str, Any]] = None

class TerminalExecRequest(BaseModel):
    command: str = Field(..., max_length=255)

class TerminalExecResponse(BaseModel):
    command: str
    output: str
    status: str = "ok"
    action: Optional[str] = None
    target_id: Optional[str] = None

class HealthResponse(BaseModel):
    status: str
    app: str
    version: str
    database: Dict[str, Any]
    timestamp: str
