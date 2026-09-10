@echo off
title Kiran Kumar Portfolio - Full-Stack Launcher (React + FastAPI + PostgreSQL)
color 0b

echo ==========================================================
echo   MEDISHETTY KIRAN KUMAR - FULL-STACK PORTFOLIO
echo   Tech Stack: React.js ^| Python FastAPI ^| PostgreSQL
echo ==========================================================
echo.

echo [*] Starting Python FastAPI backend on port 8000...
start "FastAPI Backend" cmd /k "cd /d %~dp0backend && python run.py"

timeout /t 2 /nobreak >nul

echo [*] Starting React frontend development server on port 5173...
start "React Frontend" cmd /k "cd /d %~dp0 && npm run dev -- --host 0.0.0.0 --port 5173"

timeout /t 2 /nobreak >nul

echo [*] Opening browser to http://localhost:5173/ ...
start http://localhost:5173/

echo.
echo [✓] All services initialized!
echo   • Frontend:     http://localhost:5173/
echo   • FastAPI Docs: http://localhost:8000/docs
echo.
pause
