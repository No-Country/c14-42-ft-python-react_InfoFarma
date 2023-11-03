import fastapi
from fastapi import Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from db.db_setup import get_db
from db.schemas.product import ProductSchema, ProductCreate, ProductGeneral
from .utils.products import ProductUtils


router = fastapi.APIRouter()


@router.get("/productos/{id}", response_model=ProductSchema)
async def get_product(id: int, db: AsyncSession = Depends(get_db)):
    product = await ProductUtils.get_one(db, id)
    print(product)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product


@router.get("/productos", response_model=list[ProductSchema])
async def get_all_products(skip: int = 0, db: AsyncSession = Depends(get_db)):
    products = await ProductUtils.get_all(db, skip)
    return products


@router.get("/productos-generales", response_model=list[ProductGeneral])
async def get_general_products(db: AsyncSession = Depends(get_db)):
    products = await ProductUtils.get_general_products(db)
    return products


@router.post("/productos", response_model=ProductSchema)
async def create_product(product: ProductCreate, db: AsyncSession = Depends(get_db)):
    return await ProductUtils.create(db, product)


@router.get("/productos-generales/{medicine_id}", response_model=list[ProductSchema])
async def get_by_id(medicine_id: int, db: AsyncSession = Depends(get_db)):
    product = await ProductUtils.get_by_id(db, medicine_id)
    return product
