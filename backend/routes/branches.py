import fastapi
from fastapi import Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from db.db_setup import get_db
from db.schemas.branch import BranchSchema
from .utils.branches import BranchUtils


router = fastapi.APIRouter()


@router.get("/suscursales/{farmacia}", response_model=list[BranchSchema])
async def get_branches_by_pharmacy(farmacia: str | int, db: AsyncSession = Depends(get_db)):
    if farmacia.isdigit():
        branches = await BranchUtils.get_by_pharmacy_id(db, int(farmacia))
    else:
        branches = await BranchUtils.get_by_pharmacy(db, farmacia)
    return branches