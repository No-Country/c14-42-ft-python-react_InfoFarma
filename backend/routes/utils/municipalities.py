from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from db.models import Municipality
from db.schemas.municipality import MunicipalityCreate


class MunicipalityUtils:
    @staticmethod
    async def create(db: AsyncSession, municipality: MunicipalityCreate):
        new_state = Municipality(
            name = municipality.name.lower().replace("-", " "),
            state_id = municipality.state_id
        )
        db.add(new_state)
        await db.commit()
        await db.refresh(new_state)
        return new_state
    

    @staticmethod
    async def get_or_create(db: AsyncSession, municipality: MunicipalityCreate):
        format_name = municipality.name.lower().replace("-", " ")
        result = await db.execute(select(Municipality).where(Municipality.name == format_name))
        result = result.scalar_one_or_none()

        if result:
            return result

        new_municipality = Municipality(
            name = format_name,
            state_id = municipality.state_id
        )
        db.add(new_municipality)
        await db.commit()
        await db.refresh(new_municipality)
        return new_municipality
    

    @staticmethod
    async def get_by_name(db: AsyncSession, municipality_name: str):
        query = select(Municipality).where(Municipality.name == municipality_name.lower().replace("-", " "))
        result = await db.execute(query)
        return result.scalar_one_or_none()