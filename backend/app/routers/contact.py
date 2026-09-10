import smtplib
import logging
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime, timezone
from typing import List, Dict, Any
from fastapi import APIRouter, Depends, Request, HTTPException, BackgroundTasks
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import ContactMessage
from app.schemas import ContactCreate, ContactResponse
from app import config

logger = logging.getLogger("contact_router")
router = APIRouter(prefix="/api/contact", tags=["Contact"])

def send_email_notification(name: str, sender_email: str, message: str, ip: str = None):
    """
    Sends an email notification to Kiran (mkirankumar4050@gmail.com)
    via SMTP if credentials are configured in .env.
    """
    if not config.ENABLE_EMAIL_NOTIFICATIONS:
        return

    recipient = config.NOTIFICATION_EMAIL
    subject = f"[Portfolio Inquiry] New message from {name}"
    
    body_text = f"""Hello Kiran,

You received a new message through your interactive portfolio website:

--------------------------------------------------
Sender Name:  {name}
Sender Email: {sender_email}
IP Address:   {ip or 'Unknown'}
Sent Time:    {datetime.now(timezone.utc).strftime('%Y-%m-%d %H:%M:%S UTC')}
--------------------------------------------------

Message:
{message}

--------------------------------------------------
To reply directly to {name}, reply to this email or send to {sender_email}.
View in Portfolio: http://localhost:5173
"""

    body_html = f"""
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #030712; color: #f3f4f6; border-radius: 12px; border: 1px solid #1f2937;">
      <h2 style="color: #06b6d4; margin-top: 0;">📬 New Portfolio Inquiry</h2>
      <p style="color: #9ca3af; font-size: 14px;">Someone submitted a direct inquiry on your portfolio website.</p>
      
      <div style="background-color: #111827; padding: 16px; border-radius: 8px; border: 1px solid #374151; margin: 16px 0;">
        <p style="margin: 4px 0;"><strong style="color: #38bdf8;">Sender Name:</strong> {name}</p>
        <p style="margin: 4px 0;"><strong style="color: #38bdf8;">Sender Email:</strong> <a href="mailto:{sender_email}" style="color: #34d399;">{sender_email}</a></p>
        <p style="margin: 4px 0;"><strong style="color: #38bdf8;">Timestamp:</strong> {datetime.now(timezone.utc).strftime('%Y-%m-%d %H:%M:%S UTC')}</p>
      </div>

      <div style="background-color: #111827; padding: 16px; border-radius: 8px; border-left: 4px solid #06b6d4; margin: 16px 0;">
        <h4 style="margin: 0 0 8px 0; color: #9ca3af; font-size: 12px; text-transform: uppercase;">Message Content:</h4>
        <p style="white-space: pre-wrap; font-size: 15px; line-height: 1.5; color: #f9fafb; margin: 0;">{message}</p>
      </div>

      <div style="margin-top: 24px; text-align: center;">
        <a href="mailto:{sender_email}?subject=Re: Portfolio Inquiry" style="display: inline-block; padding: 10px 20px; background-color: #0284c7; color: white; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 14px;">Reply to {name}</a>
      </div>
    </div>
    """

    # If no SMTP password provided, log clear notice
    if not config.SMTP_PASSWORD:
        logger.info(
            f"[INBOX DISPATCH] New message from '{name}' <{sender_email}> stored in DB. "
            f"Set SMTP_PASSWORD in backend/.env to forward to {recipient}."
        )
        return

    try:
        msg = MIMEMultipart("alternative")
        msg["Subject"] = subject
        msg["From"] = f"Portfolio System <{config.SMTP_USER}>"
        msg["To"] = recipient
        msg["Reply-To"] = sender_email

        msg.attach(MIMEText(body_text, "plain"))
        msg.attach(MIMEText(body_html, "html"))

        with smtplib.SMTP(config.SMTP_HOST, config.SMTP_PORT, timeout=10) as server:
            server.ehlo()
            server.starttls()
            server.ehlo()
            server.login(config.SMTP_USER, config.SMTP_PASSWORD)
            server.sendmail(config.SMTP_USER, [recipient], msg.as_string())
        
        logger.info(f"Successfully emailed notification to {recipient}")
    except Exception as e:
        logger.error(f"Failed to dispatch SMTP email notification: {str(e)}")

@router.post("", response_model=ContactResponse)
def submit_contact(
    payload: ContactCreate,
    request: Request,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db)
):
    client_ip = request.client.host if request.client else None
    
    msg = ContactMessage(
        name=payload.name,
        email=str(payload.email),
        message=payload.message,
        ip_address=client_ip
    )
    db.add(msg)
    db.commit()
    db.refresh(msg)

    # Dispatch email notification in background
    background_tasks.add_task(
        send_email_notification,
        name=msg.name,
        sender_email=msg.email,
        message=msg.message,
        ip=client_ip
    )

    return {
        "id": msg.id,
        "name": msg.name,
        "email": msg.email,
        "message": msg.message,
        "isRead": msg.is_read,
        "createdAt": msg.created_at.isoformat() if msg.created_at else None,
        "status": "success"
    }

@router.get("", response_model=List[Dict[str, Any]])
def list_messages(limit: int = 50, db: Session = Depends(get_db)):
    messages = db.query(ContactMessage).order_by(ContactMessage.created_at.desc()).limit(limit).all()
    return [m.to_dict() for m in messages]

@router.patch("/{message_id}/read")
def toggle_message_read(message_id: int, db: Session = Depends(get_db)):
    msg = db.query(ContactMessage).filter(ContactMessage.id == message_id).first()
    if not msg:
        raise HTTPException(status_code=404, detail="Message not found")
    msg.is_read = not msg.is_read
    db.commit()
    return {"id": msg.id, "isRead": msg.is_read}

@router.delete("/{message_id}")
def delete_message(message_id: int, db: Session = Depends(get_db)):
    msg = db.query(ContactMessage).filter(ContactMessage.id == message_id).first()
    if not msg:
        raise HTTPException(status_code=404, detail="Message not found")
    db.delete(msg)
    db.commit()
    return {"status": "deleted", "id": message_id}

