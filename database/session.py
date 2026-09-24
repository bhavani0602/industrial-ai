import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise ValueError("DATABASE_URL environment variable is not set. Please check your .env file.")

# SQLAlchemy engine
engine = create_engine(DATABASE_URL)

# Sessionmaker bound to this engine
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    """
    Dependency generator that yields a database session.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
