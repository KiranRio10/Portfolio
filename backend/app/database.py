import logging
from sqlalchemy import create_engine, text
from sqlalchemy.orm import declarative_base, sessionmaker
from app.config import DATABASE_URL, SQLITE_FALLBACK_URL

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("portfolio_db")

Base = declarative_base()

ACTIVE_DB_TYPE = "postgresql"
ACTIVE_DB_URL = DATABASE_URL
engine = None
SessionLocal = None

def init_engine():
    global engine, SessionLocal, ACTIVE_DB_TYPE, ACTIVE_DB_URL
    try:
        # Try primary PostgreSQL connection
        logger.info(f"Attempting connection to PostgreSQL database at: {DATABASE_URL.split('@')[-1] if '@' in DATABASE_URL else 'local'}")
        test_engine = create_engine(
            DATABASE_URL,
            pool_pre_ping=True,
            pool_size=10,
            max_overflow=20,
            connect_args={"connect_timeout": 3} if "postgresql" in DATABASE_URL else {}
        )
        with test_engine.connect() as conn:
            conn.execute(text("SELECT 1"))
        
        engine = test_engine
        ACTIVE_DB_TYPE = "postgresql"
        ACTIVE_DB_URL = DATABASE_URL
        logger.info("Successfully connected to PostgreSQL database!")
    except Exception as e:
        logger.warning(f"PostgreSQL connection not reachable: {e}")
        logger.info(f"Falling back to local development database: {SQLITE_FALLBACK_URL}")
        engine = create_engine(
            SQLITE_FALLBACK_URL,
            connect_args={"check_same_thread": False}
        )
        ACTIVE_DB_TYPE = "sqlite"
        ACTIVE_DB_URL = SQLITE_FALLBACK_URL

    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

init_engine()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_db_info():
    return {
        "engine": ACTIVE_DB_TYPE,
        "url_masked": ACTIVE_DB_URL.split('@')[-1] if '@' in ACTIVE_DB_URL else ACTIVE_DB_URL,
        "is_postgres": ACTIVE_DB_TYPE == "postgresql",
        "status": "connected"
    }
