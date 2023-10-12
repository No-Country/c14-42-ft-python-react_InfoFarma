from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from db.models import Product
from db.schemas.product import ProductCreate


async def get_product(db: AsyncSession, product_id: int):
    query = select(Product).where(Product.id == product_id)
    result = await db.execute(query)
    return result.scalar_one_or_none()


async def get_all_products(db: AsyncSession, skip: int = 0, limit: int = 100):
    query = select(Product).offset(skip).limit(limit)
    result = await db.execute(query)
    return result.scalars()._allrows()


# TODO Crear los métodos para la creacion de productos