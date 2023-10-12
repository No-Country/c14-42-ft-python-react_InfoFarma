import fastapi
from fastapi import Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from db.db_setup import get_db
from db.schemas.product import Product
from .utils.products import *


router = fastapi.APIRouter()


@router.get("/products/{id}")
async def get_product_route(id: int, db: AsyncSession = Depends(get_db)):
    product = await get_product(db, id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product


@router.get("/products")
async def get_all_users_route(skip: int = 0, limit: int = 100, db: AsyncSession = Depends(get_db)):
    users = await get_all_products(db, skip, limit)
    return users