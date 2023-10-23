from sqlalchemy.ext.asyncio import AsyncSession

from db.models import Municipality
from db.schemas.municipality import MunicipalityCreate


class StateUtils:
    @staticmethod
    async def create(db: AsyncSession, state: MunicipalityCreate):
        new_state = Municipality(
            name = state.name.lower(),
            state_id = state.state_id
        )
        db.add(new_state)
        await db.commit()
        await db.refresh(new_state)
        return new_state