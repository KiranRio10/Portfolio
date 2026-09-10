import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import CORS_ORIGINS
from app.database import engine, Base, SessionLocal, get_db_info
from app.seed import seed_database
from app.routers import health, projects, skills, contact, analytics, terminal

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("portfolio_main")

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Create tables & seed
    logger.info("Initializing database tables...")
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    try:
        seed_database(db)
    except Exception as e:
        logger.error(f"Seeding error: {e}")
    finally:
        db.close()

    db_info = get_db_info()
    logger.info(f"Database ready: Engine={db_info['engine']} | Target={db_info['url_masked']}")
    yield
    # Shutdown
    logger.info("Shutting down portfolio API...")

app = FastAPI(
    title="Medishetty Kiran Kumar Portfolio API",
    description="Full-Stack Backend powered by Python, FastAPI, and PostgreSQL / SQLAlchemy ORM.",
    version="2.0.0",
    lifespan=lifespan
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows local dev from any port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount Routers
app.include_router(health.router)
app.include_router(projects.router)
app.include_router(skills.router)
app.include_router(contact.router)
app.include_router(analytics.router)
app.include_router(terminal.router)

@app.get("/")
def root():
    return {
        "message": "Welcome to Medishetty Kiran Kumar Portfolio API",
        "docs": "/docs",
        "openapi": "/openapi.json",
        "tech_stack": "React 19 + Python 3.14 + FastAPI + PostgreSQL (SQLAlchemy)"
    }
