from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from db.models import Medicine
from db.schemas.medicine import MedicineCreate


class MedicineUtils:
    @staticmethod
    async def create(db: AsyncSession, medicine: MedicineCreate):
        new_medicine = Medicine(
            name = medicine.name
        )
        db.add(new_medicine)
        await db.commit()
        await db.refresh(new_medicine)
        return new_medicine
    

    @staticmethod
    async def get_or_create(db: AsyncSession, medicine: MedicineCreate):
        result = await db.execute(select(Medicine).where(Medicine.name == medicine.name))

        if result.scalar_one_or_none():
            return result.scalar_one()

        new_medicine = Medicine(
            name = medicine.name
        )
        db.add(new_medicine)
        await db.commit()
        await db.refresh(new_medicine)
        return new_medicine