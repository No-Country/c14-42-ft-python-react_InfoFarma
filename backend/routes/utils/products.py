from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from db.models import Product, Medicine, Pharmacy
from db.views import ProductView
from db.schemas.product import ProductCreate


class ProductUtils:
    @staticmethod
    async def get_one(db: AsyncSession, product_id: int):
        query = select(
            Medicine.name,
            Product.id,
            Product.price,
            Product.updated_at,
            Product.details,
            Product.img,
            Pharmacy.name.label("pharmacy_name"),
            Pharmacy.img.label("pharmacy_img")
        ) \
        .join(Medicine, Medicine.id == Product.medicine_id) \
        .join(Pharmacy, Pharmacy.id == Product.pharmacy_id) \
        .where(Product.id == product_id)

        result = await db.execute(query)
        return result._allrows()[0]
    

    @staticmethod
    async def get_all(db: AsyncSession, skip: int = 0, limit: int = 100):
        query = select(
            Medicine.name,
            Product.id,
            Product.price,
            Product.updated_at,
            Product.details,
            Product.img,
            Pharmacy.name.label("pharmacy_name"),
            Pharmacy.img.label("pharmacy_img")
        ) \
        .join(Medicine, Medicine.id == Product.medicine_id) \
        .join(Pharmacy, Pharmacy.id == Product.pharmacy_id) \
        .order_by(Product.id) \
        .offset(skip) \
        .limit(limit)

        result = await db.execute(query)
        return result._allrows()
    

    @staticmethod
    async def get_general_products(db: AsyncSession):
        query = select(
            ProductView.id,
            ProductView.name,
            ProductView.max_price,
            ProductView.min_price,
            Product.img, Product.details
        ) \
        .distinct(ProductView.name) \
        .join(Product, Product.medicine_id == ProductView.id) \
        .order_by(ProductView.name) \
        .where(Product.price == ProductView.min_price)

        result = await db.execute(query)
        return result._allrows()


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


    @staticmethod
    async def get_by_id(db: AsyncSession, medicine_id: int):
        query = select(
            Medicine.name,
            Product.id,
            Product.price,
            Product.updated_at,
            Product.details,
            Product.img,
            Pharmacy.name.label("pharmacy_name"),
            Pharmacy.img.label("pharmacy_img")
        ) \
        .join(Medicine, Medicine.id == Product.medicine_id) \
        .join(Pharmacy, Pharmacy.id == Product.pharmacy_id) \
        .order_by(Product.id) \
        .where(Product.medicine_id == medicine_id)

        result = await db.execute(query)
        return result._allrows()