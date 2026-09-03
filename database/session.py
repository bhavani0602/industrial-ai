import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise ValueError("DATABASE_URL environment variable is not set. Please check your .env file.")

# Create the SQLAlchemy engine
engine = create_engine(DATABASE_URL)

# Create a sessionmaker bound to this engine
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    """
    Dependency generator that yields a database session.
    This will be used by FastAPI endpoints and CRUD operations.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
