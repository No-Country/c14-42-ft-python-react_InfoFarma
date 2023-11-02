import sys
sys.path.append("backend/")

import asyncio

from sqlalchemy.future import select

from db.models import Product
from db.db_setup import SessionLocal


async def fix_products():
    async with SessionLocal() as db:
        query = select(Product) \
                .where(Product.img.regexp_match("v=[0-9]+$"))
        result = await db.execute(query)
        corrupted_products = result.scalars()
        
        for product in corrupted_products:
            query = select(Product).where(
                (~Product.img.regexp_match("v=[0-9]+$")) & 
                (Product.medicine_id == product.medicine_id)
            ) \
            .limit(1)

            result = await db.execute(query)
            alt_product = result.scalar_one_or_none()
            product.img = alt_product.img if alt_product else None

            await db.commit()
            await db.refresh(product)
    return "Imágenes de productos arregladas..."


if __name__ == "__main__":
    result = asyncio.run(fix_products())
    print(result)