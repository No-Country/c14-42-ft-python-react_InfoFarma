from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from db.models import Brand
from db.schemas.brand import BrandCreate


class BrandUtils:
    @staticmethod
    async def create(db: AsyncSession, brand: BrandCreate):
        new_brand = Brand(
            name = brand.name
        )
        db.add(new_brand)
        await db.commit()
        await db.refresh(new_brand)
        return new_brand
    

    @staticmethod
    async def get_or_create(db: AsyncSession, brand: BrandCreate):
        result = await db.execute(select(Brand).where(Brand.name == brand.name))
        result = result.scalar_one_or_none()

        if result:
            return result

        new_brand = Brand(
            name = brand.name
        )
        db.add(new_brand)
        await db.commit()
        await db.refresh(new_brand)
        return new_brand