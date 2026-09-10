# Medishetty Kiran Kumar — Interactive Full-Stack 3D Portfolio

A personal portfolio web application designed to break away from conventional static templates by turning the interface itself into an interactive living canvas, backed by a production-ready **Python (FastAPI)** and **PostgreSQL** relational backend.

---

## 🌟 Architecture & Highlights

### 🎨 Frontend (React 19 + Three.js + Tailwind CSS)
- **Living 3D WebGL Canvas**: Built using **Three.js** with interactive particle gravitational physics, orbiting cyber-geometry, and mouse velocity tracking.
- **Global Command Palette (`⌘K` / `Ctrl+K`)**: Instant fuzzy search across projects, technical competencies, contact channels, and actions.
- **Multi-Perspective View System**:
  - **3D Constellation Canvas**: Spatial interactive node graph with real-time category filters.
  - **Narrative Story Timeline**: Cinematic journey through Kiran's engineering milestones.
  - **Cyber Hacker Terminal**: Interactive CLI shell with ASCII banner, custom commands (`help`, `projects`, `open <id>`, `skills`, `contact`, `clear`), and keystroke audio feedback.
- **In-Depth Case Studies with Live Sandboxes**:
  - **FitZone Pro**: Live workout set tracker & rest countdown timer with audio chime cues.
  - **Weather-Outfit-Advisor (SkyWear)**: Real-time temperature & condition slider with situational clothing recommendation matrix.
  - **Khaata Book**: Interactive double-entry credit ledger calculator with overdue debt tagging.
- **📬 Inbound Transmissions Hub (Messages Modal)**:
  - Live in-app inbox to view all recruiter inquiries and contact messages.
  - 1-click **Reply in Gmail** and **Default Mail Client**.
  - Message management: mark read/unread, copy sender email, delete.
- **Built-in Web Audio Procedural Synthesizer**: Zero external audio files; synthesized UI ticks, chimes, and celebrations directly in-browser.
- **Interactive Magnetic Physics Cursor**: Velocity-reactive cursor with trailing glow ring and click shockwave ripples.

### ⚙️ Backend (Python FastAPI + PostgreSQL / SQLite)
- **FastAPI REST API**: High-performance asynchronous endpoints for projects, skills, contact inquiries, and telemetry.
- **Relational Storage (PostgreSQL & SQLAlchemy)**:
  - Robust relational schema for `projects`, `skills`, `contact_messages`, and `analytics_events`.
  - Automatic fallback to `portfolio_dev.db` SQLite if no local PostgreSQL server is running.
- **Interactive Swagger Docs**: Available at [http://localhost:8000/docs](http://localhost:8000/docs).
- **Automated Email Forwarding**: Asynchronous background SMTP forwarder to `mkirankumar4050@gmail.com`.

---

## 🚀 Quick Start Instructions

### 1-Click Launchers (Windows)
Double-click `start.bat` or run:
```powershell
./start.ps1
```
This automatically boots both the FastAPI backend (`:8000`) and the Vite React frontend (`:5173`).

### Manual Start

#### 1. Backend (FastAPI + PostgreSQL)
```bash
cd backend
pip install -r requirements.txt
python run.py
```
Backend runs at: `http://localhost:8000`  
Swagger API Docs: `http://localhost:8000/docs`

#### 2. Frontend (React + Vite)
```bash
npm install
npm run dev
```
Frontend runs at: `http://localhost:5173`

---

## 📬 Contact & Identity
- **Developer**: Medishetty Kiran Kumar
- **Email**: `mkirankumar4050@gmail.com`
- **Mobile**: `+91 9381911081`
- **LinkedIn**: [https://www.linkedin.com/in/kiranmedishetty/](https://www.linkedin.com/in/kiranmedishetty/)
- **GitHub**: [https://github.com/KiranRio10](https://github.com/KiranRio10)

