from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from db.models import Branch, Pharmacy, Municipality
from db.schemas.branch import BranchCreate


class BranchUtils:
    @staticmethod
    async def get_by_pharmacy_id(db: AsyncSession, pharmacy_id: int, municipality_name: str = Municipality.name):
        municipality_name = municipality_name.lower() if isinstance(municipality_name, str) else municipality_name

        query = select(Branch) \
        .join(Municipality, Municipality.id == Branch.municipality_id) \
        .where((Branch.pharmacy_id == pharmacy_id) & (Municipality.name == municipality_name))

        result = await db.execute(query)
        return result.scalars()


    @staticmethod
    async def get_by_pharmacy(db: AsyncSession, pharmacy_name: str, municipality_name: str = Municipality.name):
        municipality_name = municipality_name.lower() if isinstance(municipality_name, str) else municipality_name

        query = select(Branch) \
        .join(Pharmacy, Pharmacy.id == Branch.pharmacy_id) \
        .join(Municipality, Municipality.id == Branch.municipality_id) \
        .where((Pharmacy.name == pharmacy_name.lower()) & (Municipality.name == municipality_name))

        result = await db.execute(query)
        return result.scalars()
    

    @staticmethod
    async def get_all(db: AsyncSession, skip: int = 0, limit: int = 200):
        query = select(Branch) \
        .order_by(Branch.id) \
        .offset(skip) \
        .limit(limit)

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