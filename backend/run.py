import os
import sys
import uvicorn
from pathlib import Path

# Add backend directory to sys.path so app can be imported
current_dir = Path(__file__).resolve().parent
if str(current_dir) not in sys.path:
    sys.path.insert(0, str(current_dir))

if __name__ == "__main__":
    from app.config import HOST, PORT
    print(f"[*] Starting Kiran Kumar Portfolio API on http://{HOST}:{PORT}")
    print(f"[*] Swagger OpenAPI Documentation: http://localhost:{PORT}/docs")
    uvicorn.run("app.main:app", host=HOST, port=PORT, reload=True)
