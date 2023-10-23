from sqlalchemy.ext.asyncio import AsyncSession

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