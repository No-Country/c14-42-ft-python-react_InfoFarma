import types

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from db.models import Product
from db.schemas.product import ProductCreate


class ProductUtils:
    @staticmethod
    async def get_product(db: AsyncSession, product_id: int):
        query = select(Product).where(Product.id == product_id)
        result = await db.execute(query)
        return result.scalar_one_or_none()


    @staticmethod
    async def get_all_products(db: AsyncSession, skip: int = 0, limit: int = 100):
        query = select(Product).offset(skip).limit(limit)
        result = await db.execute(query)
        return result.scalars()


    @staticmethod
    async def create_product(db: AsyncSession, product: ProductCreate):
        new_product = Product(
            price = product.price,
            details = product.details,
            img = product.img,
            medicine_id = product.medicine_id, 
            brand_id = product.brand_id 
        )
        db.add(new_product)
        await db.commit()
        await db.refresh(new_product)
        return new_product