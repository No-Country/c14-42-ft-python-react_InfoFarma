from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from db.models import Branch, Pharmacy
from db.schemas.branch import BranchCreate


class BranchUtils:
    @staticmethod
    async def get_by_pharmacy_id(db: AsyncSession, pharmacy_id: int):
        query = select(Branch).where(Branch.pharmacy_id == pharmacy_id)
        result = await db.execute(query)
        return result.scalars()


    @staticmethod
    async def get_by_pharmacy(db: AsyncSession, pharmacy_name: str):
        query = select(Branch) \
        .join(Pharmacy, Pharmacy.id == Branch.pharmacy_id) \
        .where(Pharmacy.name == pharmacy_name.lower())

        result = await db.execute(query)
        return result.scalars()


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