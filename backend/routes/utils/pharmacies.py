from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from db.models import Pharmacy
from db.schemas.pharmacy import PharmacyCreate


class PharmacyUtils:
    @staticmethod
    async def create(db: AsyncSession, pharmacy: PharmacyCreate):
        new_pharmacy = Pharmacy(
            name = pharmacy.name
        )
        db.add(new_pharmacy)
        await db.commit()
        await db.refresh(new_pharmacy)
        return new_pharmacy
    
    @staticmethod
    async def get_or_create(db: AsyncSession, pharmacy: PharmacyCreate):
        result = await db.execute(select(Pharmacy).where(Pharmacy.name == pharmacy.name))
        result = result.scalar_one_or_none()

        if result:
            return result

        new_pharmacy = Pharmacy(
            name = pharmacy.name,
            img = pharmacy.img
        )
        db.add(new_pharmacy)
        await db.commit()
        await db.refresh(new_pharmacy)
        return new_pharmacy
