import sys
from typing import Dict, Any
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db, get_db_info
from app.models import Project, Skill, ContactMessage, AnalyticsEvent
from app.schemas import TerminalExecRequest, TerminalExecResponse

router = APIRouter(prefix="/api/terminal", tags=["Terminal"])

@router.post("/exec", response_model=TerminalExecResponse)
def execute_terminal_command(payload: TerminalExecRequest, db: Session = Depends(get_db)):
    cmd_raw = payload.command.strip()
    cmd = cmd_raw.lower()
    args = cmd.split()
    root = args[0] if args else ""

    # Log command execution
    event = AnalyticsEvent(
        event_type="terminal_command",
        event_name=root,
        metadata_json=f'{{"raw": "{cmd_raw}"}}'
    )
    db.add(event)
    db.commit()

    if root == "help":
        output = """
Available Backend Commands:
  help           - Display this list of terminal commands
  projects (ls)  - Query projects table in database
  open <id>      - Open specific project case study modal
  skills         - Query technical competencies from database
  education      - View academic records (JBIET B.Tech AIML 7.73 CGPA)
  certifications - View verified certifications (CCBP, Python, Cybersecurity)
  contact        - Display Kiran's email, phone, LinkedIn, GitHub
  db             - Show active database engine (PostgreSQL / SQLite) & records
  stats          - Show live database analytics (views, inquiries, commands)
  sysinfo        - Display backend runtime, Python version & server status
  clear          - Clear terminal output
        """.strip()
        return {"command": cmd_raw, "output": output, "status": "ok"}

    elif root in ["projects", "ls"]:
        projects = db.query(Project).all()
        lines = ["Active Systems (queried from database):"]
        for p in projects:
            lines.append(f"  • {p.id.ljust(24)} - {p.title} ({p.category})")
        lines.append("\nType 'open fitzone', 'open weather', or 'open khaata' to launch.")
        return {"command": cmd_raw, "output": "\n".join(lines), "status": "ok"}

    elif root == "open":
        target = args[1] if len(args) > 1 else ""
        if not target:
            return {"command": cmd_raw, "output": "Usage: open <project-id> (e.g. 'open fitzone')", "status": "error"}
        match = db.query(Project).filter(Project.id.like(f"%{target}%")).first()
        if match:
            return {
                "command": cmd_raw,
                "output": f"Launching case study drawer for [{match.title}]...",
                "status": "ok",
                "action": "open_project",
                "target_id": match.id
            }
        return {"command": cmd_raw, "output": f"Project '{target}' not found in database.", "status": "error"}

    elif root == "db":
        info = get_db_info()
        p_count = db.query(Project).count()
        s_count = db.query(Skill).count()
        m_count = db.query(ContactMessage).count()
        a_count = db.query(AnalyticsEvent).count()
        output = f"""
DATABASE CONNECTION TELEMETRY:
  • Engine:           {info['engine'].upper()} (SQLAlchemy ORM)
  • Host/Target:      {info['url_masked']}
  • PostgreSQL Mode:  {'Active ✅' if info['is_postgres'] else 'Fallback Mode (SQLite active; set DATABASE_URL in backend/.env for PostgreSQL)'}
  • Status:           {info['status'].upper()}
  • Records Stored:
      - Projects:         {p_count} rows
      - Skills:           {s_count} rows
      - Contact Messages: {m_count} rows
      - Analytics Events: {a_count} rows
        """.strip()
        return {"command": cmd_raw, "output": output, "status": "ok"}

    elif root == "stats":
        views = db.query(AnalyticsEvent).filter(AnalyticsEvent.event_type == "page_view").count()
        clicks = db.query(AnalyticsEvent).filter(AnalyticsEvent.event_type == "project_click").count()
        cmds = db.query(AnalyticsEvent).filter(AnalyticsEvent.event_type == "terminal_command").count()
        inquiries = db.query(ContactMessage).count()
        output = f"""
LIVE PORTFOLIO TELEMETRY (from Database):
  • Page Impressions:    {views}
  • Project Case Views:  {clicks}
  • Terminal Commands:   {cmds}
  • Contact Inquiries:   {inquiries}
        """.strip()
        return {"command": cmd_raw, "output": output, "status": "ok"}

    elif root == "sysinfo":
        output = f"""
SYSTEM RUNTIME DIAGNOSTICS:
  • Framework:        FastAPI + Uvicorn ASGI
  • Python Version:   {sys.version.split()[0]}
  • Operating System: Windows
  • Drivers:          psycopg2-binary, psycopg, SQLAlchemy
  • Architecture:     React 19 (Frontend) <--> FastAPI REST <--> PostgreSQL
        """.strip()
        return {"command": cmd_raw, "output": output, "status": "ok"}

    elif root == "skills":
        skills = db.query(Skill).all()
        lines = ["==================== TECHNICAL CORE (FROM DATABASE) ===================="]
        by_cat = {}
        for s in skills:
            by_cat.setdefault(s.category, []).append(f"{s.name} ({s.level}%)")
        for cat, items in by_cat.items():
            lines.append(f"{cat.upper()}:")
            lines.append("  • " + " | ".join(items))
        return {"command": cmd_raw, "output": "\n".join(lines), "status": "ok"}

    elif root == "education":
        output = """
ACADEMIC RECORD:
1. B.Tech in Artificial Intelligence and Machine Learning (2022 – 2026)
   JB Institute of Engineering and Technology, Moinabad, Telangana
   CGPA: 7.73 / 10.0

2. Board of Intermediate Education (MPC) (2020 – 2022)
   Sri Chaitanya Junior Kalasala, Hyderabad | CGPA: 6.65

3. Board of Secondary Education (SSC) (2010 – 2020)
   New Gen High School of Excellence, Hyderabad | Distinction: 10.0 / 10.0 CGPA
        """.strip()
        return {"command": cmd_raw, "output": output, "status": "ok"}

    elif root == "certifications":
        output = """
CERTIFIED CREDENTIALS:
1. [CCBP Nxtwave] Certified Python Full Stack Developer
2. [Udemy] The Complete Python Bootcamp From Zero to Hero in Python
3. [Coursework] Introduction to Cybersecurity
        """.strip()
        return {"command": cmd_raw, "output": output, "status": "ok"}

    elif root == "contact":
        output = """
COMMUNICATION CHANNELS:
  • Name:     Medishetty Kiran Kumar
  • Email:    mkirankumar4050@gmail.com
  • Phone:    +91 9381911081
  • LinkedIn: https://www.linkedin.com/in/kiranmedishetty/
  • GitHub:   https://github.com/KiranRio10
  • Location: Telangana, India
        """.strip()
        return {"command": cmd_raw, "output": output, "status": "ok"}

    else:
        return {
            "command": cmd_raw,
            "output": f"command not found: '{cmd_raw}'. Type 'help' for valid backend commands.",
            "status": "not_found"
        }
