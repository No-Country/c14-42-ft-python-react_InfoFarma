from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from db.models import Product
from db.schemas.product import ProductCreate


class ProductUtils:
    @staticmethod
    async def get_one(db: AsyncSession, product_id: int):
        query = select(Product).where(Product.id == product_id)
        result = await db.execute(query)
        return result.scalar_one_or_none()


    @staticmethod
    async def get_all(db: AsyncSession, skip: int = 0, limit: int = 100):
        query = select(Product).offset(skip).limit(limit)
        result = await db.execute(query)
        return result.scalars()


    @staticmethod
    async def create(db: AsyncSession, product: ProductCreate):
        new_product = Product(
            price = product.price,
            details = product.details,
            img = product.img,
            medicine_id = product.medicine_id, 
            pharmacy_id = product.pharmacy_id,
            brand_id = product.brand_id 
        )
        db.add(new_product)
        await db.commit()
        await db.refresh(new_product)
        return new_product
    

    @staticmethod
    async def update_or_create(db: AsyncSession, product: ProductCreate):
        result = await db.execute(
            select(Product)
            .where(
                (Product.medicine_id == product.medicine_id) 
                & (Product.pharmacy_id == product.pharmacy_id) 
                & (Product.details == product.details)
            )
        )
        result = result.scalar_one_or_none()

        if result:
            if result.price != product.price \
                or result.img != product.img \
                or result.brand_id != product.brand_id:
                result.price = product.price
                result.img = product.img
                result.brand_id = product.brand_id
                await db.commit()
                await db.refresh(result)
            return result

        new_product = Product(
            price = product.price,
            details = product.details,
            img = product.img,
            medicine_id = product.medicine_id, 
            pharmacy_id = product.pharmacy_id,
            brand_id = product.brand_id 
        )
        db.add(new_product)
        await db.commit()
        await db.refresh(new_product)
        return new_product