import fastapi
from fastapi import Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from db.db_setup import get_db
from db.models import Municipality
from db.schemas.branch import BranchSchema
from .utils.branches import BranchUtils


router = fastapi.APIRouter()


@router.get("/sucursales", response_model=list[BranchSchema])
async def get_all_branches(skip: int = 0, limit: int = 200, db: AsyncSession = Depends(get_db)):
    products = await BranchUtils.get_all(db, skip, limit)
    return products


@router.get("/suscursales/{farmacia}", response_model=list[BranchSchema])
async def get_branches_by_pharmacy(farmacia: str | int, municipio: str = Municipality.name, db: AsyncSession = Depends(get_db)):
    if farmacia.isdigit():
        branches = await BranchUtils.get_by_pharmacy_id(db, int(farmacia), municipio)
    else:
        branches = await BranchUtils.get_by_pharmacy(db, farmacia, municipio)
    return branches