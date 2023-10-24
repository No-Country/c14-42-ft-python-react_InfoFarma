from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from db.models import Branch
from db.schemas.branch import BranchCreate


class BranchUtils:
    @staticmethod
    async def create(db: AsyncSession, branch: BranchCreate):
        new_branch = Branch(
            address = branch.address,
            municipality_id = branch.municipality_id,
            pharmacy_id = branch.pharmacy_id,
        )
        db.add(new_branch)
        await db.commit()
        await db.refresh(new_branch)
        return new_branch
    

    @staticmethod
    async def get_or_create(db: AsyncSession, branch: BranchCreate):
        result = await db.execute(select(Branch).where(Branch.address == branch.address))
        result = result.scalar_one_or_none()

        if result:
            return result

        new_branch = Branch(
            address = branch.address,
            municipality_id = branch.municipality_id,
            pharmacy_id = branch.pharmacy_id,
        )
        db.add(new_branch)
        await db.commit()
        await db.refresh(new_branch)
        return new_branch