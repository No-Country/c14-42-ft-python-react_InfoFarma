# from fastapi import Depends
# from sqlalchemy.ext.asyncio import AsyncSession

from routes.utils.products import ProductUtils
from routes.utils.medicines import MedicineUtils
from routes.utils.brands import BrandUtils
from routes.utils.pharmacies import PharmacyUtils

from db.db_setup import SessionLocal
from db.schemas.medicine import MedicineCreate
from db.schemas.pharmacy import PharmacyCreate
from db.schemas.brand import BrandCreate
from db.schemas.product import ProductCreate


class DBMapper:
    @staticmethod
    async def map_products(products: list[dict]):
        async with SessionLocal() as db:
            for product in products:
                medicine = await MedicineUtils.get_or_create(db, MedicineCreate(name=product["medicamento"]))
                pharmacy = await PharmacyUtils.get_or_create(db, PharmacyCreate(
                    name=product["farmacia"],
                    img=product.get("img-farmacia")
                ))

                brand = await BrandUtils.get_or_create(db, BrandCreate(name=product.get("brand"))) \
                    if product.get("brand") \
                    else None

                await ProductUtils.update_or_create(db, ProductCreate(
                    price=product["price"],
                    details=product.get("details"),
                    img=product.get("img-medicamento"),
                    medicine_id=medicine.id,
                    pharmacy_id=pharmacy.id,
                    brand_id=brand.id if product.get("brand") else brand
                ))
        return "Productos registrados correctamente en la DB!"
