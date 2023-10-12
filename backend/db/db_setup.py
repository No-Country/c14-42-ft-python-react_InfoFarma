from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker


SQLALCHEMY_DATABASE_URL = "postgresql+asyncpg://infofarma_user:ttjgB25Pn5XsOlRMxac6kW2xPuyeX7qF@dpg-ckj98ia12bvs738p6v5g-a.ohio-postgres.render.com/infofarma"

engine = create_async_engine(SQLALCHEMY_DATABASE_URL)

SessionLocal = sessionmaker(
    engine, class_=AsyncSession, expire_on_commit=False
)

Base = declarative_base()

# DB Utilities
async def get_db():
    async with SessionLocal() as db:
        yield db
        await db.commit()