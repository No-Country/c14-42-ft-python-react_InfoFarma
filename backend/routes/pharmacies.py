import fastapi
from fastapi import Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from db.db_setup import get_db
from db.schemas.pharmacy import PharmacySchema
from .utils.pharmacies import PharmacyUtils


router = fastapi.APIRouter()


@router.get("/farmacias", response_model=list[PharmacySchema])
async def get_all_pharmacies(db: AsyncSession = Depends(get_db)):
    products = await PharmacyUtils.get_all(db)
    return products