#from fastapi import Depends
#from sqlalchemy.ext.asyncio import AsyncSession

from routes.utils.products import ProductUtils
from routes.utils.medicines import MedicineUtils
from routes.utils.brands import BrandUtils

from db.db_setup import SessionLocal
from db.schemas.medicine import MedicineCreate
from db.schemas.brand import BrandCreate
from db.schemas.product import ProductCreate


class DBMapper:
    @staticmethod
    async def map_products(products: list[dict]):
        async with SessionLocal() as db:
            for product in products:
                medicine = await MedicineUtils.get_or_create(db, MedicineCreate(name=product["medicamento"]))
                brand = await BrandUtils.get_or_create(db, BrandCreate(name=product["farmacia"]))
                await ProductUtils.create(db, ProductCreate(
                    price=product["price"],
                    details=product.get("details"),
                    img=product.get("img"),
                    medicine_id=medicine.id,
                    brand_id=brand.id
                ))
        return "Productos registrados correctamente!"