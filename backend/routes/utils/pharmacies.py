from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from db.models import Pharmacy
from db.schemas.pharmacy import PharmacyCreate


class PharmacyUtils:
    @staticmethod
    async def create(db: AsyncSession, pharmacy: PharmacyCreate):
        new_pharmacy = Pharmacy(
            name = pharmacy.name.lower()
        )
        db.add(new_pharmacy)
        await db.commit()
        await db.refresh(new_pharmacy)
        return new_pharmacy
    
    @staticmethod
    async def get_or_create(db: AsyncSession, pharmacy: PharmacyCreate):
        result = await db.execute(select(Pharmacy).where(Pharmacy.name == pharmacy.name.lower()))
        result = result.scalar_one_or_none()

        if result:
            return result

        new_pharmacy = Pharmacy(
            name = pharmacy.name.lower(),
            img = pharmacy.img
        )
        db.add(new_pharmacy)
        await db.commit()
        await db.refresh(new_pharmacy)
        return new_pharmacy


    @staticmethod
    async def get_by_name(db: AsyncSession, pharmacy_name: str):
        query = select(Pharmacy).where(Pharmacy.name == pharmacy_name.lower().replace("-", " "))
        result = await db.execute(query)
        return result.scalar_one_or_none()
    

    @staticmethod
    async def get_all(db: AsyncSession):
        query = select(Pharmacy)
        result = await db.execute(query)
        return result.scalars()