from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from db.models import State
from db.schemas.state import StateCreate


class StateUtils:
    @staticmethod
    async def create(db: AsyncSession, state: StateCreate):
        new_state = State(
            name = state.name.lower()
        )
        db.add(new_state)
        await db.commit()
        await db.refresh(new_state)
        return new_state
    

    @staticmethod
    async def get_or_create(db: AsyncSession, state: StateCreate):
        result = await db.execute(select(State).where(State.name == state.name.lower()))
        result = result.scalar_one_or_none()

        if result:
            return result

        new_state = State(
            name = state.name.lower()
        )
        db.add(new_state)
        await db.commit()
        await db.refresh(new_state)
        return new_state