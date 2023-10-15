import fastapi
from fastapi import Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from db.db_setup import get_db
from db.schemas.product import ProductSchema, ProductCreate
from .utils.products import ProductUtils


router = fastapi.APIRouter()


@router.get("/products/{id}", response_model=ProductSchema)
async def get_product(id: int, db: AsyncSession = Depends(get_db)):
    product = await ProductUtils.get_product(db, id)
    print(type(product))
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product


@router.get("/products", response_model=list[ProductSchema])
async def get_all_products(skip: int = 0, limit: int = 100, db: AsyncSession = Depends(get_db)):
    products = await ProductUtils.get_all_products(db, skip, limit)
    return products


@router.post("/products", response_model=ProductSchema)
async def create_product(product: ProductCreate, db: AsyncSession = Depends(get_db)):
    return await ProductUtils.create_product(db, product)