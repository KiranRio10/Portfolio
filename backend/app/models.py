import json
from datetime import datetime, timezone
from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime
from app.database import Base

class Project(Base):
    __tablename__ = "projects"

    id = Column(String(64), primary_key=True, index=True)
    title = Column(String(128), nullable=False)
    subtitle = Column(String(255), nullable=False)
    category = Column(String(128), nullable=False)
    tagline = Column(Text, nullable=False)
    badge = Column(String(64), nullable=False)
    role = Column(String(128), nullable=False)
    timeline = Column(String(32), nullable=False)
    color = Column(String(32), nullable=False)
    github = Column(String(255), nullable=True)
    live = Column(String(255), nullable=True)
    sandbox_type = Column(String(32), nullable=False)
    
    # Serialized JSON fields
    tech_stack_json = Column(Text, default="[]")
    metrics_json = Column(Text, default="[]")
    problem = Column(Text, nullable=False)
    process_json = Column(Text, default="[]")
    decisions_json = Column(Text, default="[]")
    outcomes = Column(Text, nullable=False)
    key_features_json = Column(Text, default="[]")
    code_highlight_json = Column(Text, default="{}")

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "subtitle": self.subtitle,
            "category": self.category,
            "tagline": self.tagline,
            "badge": self.badge,
            "role": self.role,
            "timeline": self.timeline,
            "color": self.color,
            "github": self.github,
            "live": self.live,
            "sandboxType": self.sandbox_type,
            "techStack": json.loads(self.tech_stack_json) if self.tech_stack_json else [],
            "metrics": json.loads(self.metrics_json) if self.metrics_json else [],
            "problem": self.problem,
            "process": json.loads(self.process_json) if self.process_json else [],
            "decisions": json.loads(self.decisions_json) if self.decisions_json else [],
            "outcomes": self.outcomes,
            "keyFeatures": json.loads(self.key_features_json) if self.key_features_json else [],
            "codeHighlight": json.loads(self.code_highlight_json) if self.code_highlight_json else {}
        }


class Skill(Base):
    __tablename__ = "skills"

    id = Column(Integer, primary_key=True, autoincrement=True)
    category = Column(String(64), index=True, nullable=False)
    name = Column(String(128), nullable=False)
    level = Column(Integer, nullable=False)
    projects_json = Column(Text, default="[]")

    def to_dict(self):
        return {
            "id": self.id,
            "category": self.category,
            "name": self.name,
            "level": self.level,
            "projects": json.loads(self.projects_json) if self.projects_json else []
        }


class ContactMessage(Base):
    __tablename__ = "contact_messages"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(128), nullable=False)
    email = Column(String(255), index=True, nullable=False)
    message = Column(Text, nullable=False)
    is_read = Column(Boolean, default=False)
    ip_address = Column(String(64), nullable=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "message": self.message,
            "isRead": self.is_read,
            "ipAddress": self.ip_address,
            "createdAt": self.created_at.isoformat() if self.created_at else None
        }


class AnalyticsEvent(Base):
    __tablename__ = "analytics_events"

    id = Column(Integer, primary_key=True, autoincrement=True)
    event_type = Column(String(64), index=True, nullable=False)  # 'page_view', 'modal_open', 'terminal_cmd'
    event_name = Column(String(128), nullable=False)
    metadata_json = Column(Text, default="{}")
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    def to_dict(self):
        return {
            "id": self.id,
            "eventType": self.event_type,
            "eventName": self.event_name,
            "metadata": json.loads(self.metadata_json) if self.metadata_json else {},
            "createdAt": self.created_at.isoformat() if self.created_at else None
        }
