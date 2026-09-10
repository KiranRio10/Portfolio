# Medishetty Kiran Kumar — Full-Stack Portfolio Launcher
# Runs React frontend + FastAPI Python Backend + PostgreSQL

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "  MEDISHETTY KIRAN KUMAR — FULL-STACK PORTFOLIO" -ForegroundColor White
Write-Host "  Tech Stack: React.js | Python FastAPI | PostgreSQL" -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan

$CurrentDir = Split-Path -Parent $MyInvocation.MyCommand.Path

# 1. Start Python FastAPI Backend
Write-Host "`n[*] Launching FastAPI Backend on http://localhost:8000..." -ForegroundColor Yellow
$BackendProcess = Start-Process -FilePath "python" -ArgumentList "run.py" -WorkingDirectory "$CurrentDir\backend" -PassThru

# 2. Wait for backend startup
Start-Sleep -Seconds 2

# 3. Start React Frontend
Write-Host "[*] Launching React Development Server on http://localhost:5173..." -ForegroundColor Green
$FrontendProcess = Start-Process -FilePath "npm.cmd" -ArgumentList "run dev -- --host 0.0.0.0 --port 5173" -WorkingDirectory "$CurrentDir" -PassThru

# 4. Open default browser
Start-Sleep -Seconds 2
Write-Host "[*] Opening portfolio in your default browser..." -ForegroundColor Cyan
Start-Process "http://localhost:5173/"

Write-Host "`n[✓] Services are live and running!" -ForegroundColor Green
Write-Host "  • Frontend UI:    http://localhost:5173/" -ForegroundColor White
Write-Host "  • FastAPI Docs:   http://localhost:8000/docs" -ForegroundColor White
Write-Host "  • API Health:     http://localhost:8000/api/health" -ForegroundColor White
Write-Host "Press Ctrl+C or close the terminal to terminate." -ForegroundColor Gray
