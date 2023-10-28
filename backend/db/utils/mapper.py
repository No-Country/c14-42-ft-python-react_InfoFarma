from routes.utils.products import ProductUtils
from routes.utils.medicines import MedicineUtils
from routes.utils.brands import BrandUtils
from routes.utils.pharmacies import PharmacyUtils
from routes.utils.states import StateUtils
from routes.utils.municipalities import MunicipalityUtils
from routes.utils.branches import BranchUtils

from db.db_setup import SessionLocal
from db.schemas.medicine import MedicineCreate
from db.schemas.pharmacy import PharmacyCreate
from db.schemas.brand import BrandCreate
from db.schemas.product import ProductCreate
from db.schemas.state import StateCreate
from db.schemas.municipality import MunicipalityCreate
from db.schemas.branch import BranchCreate


class DBMapper:
    @staticmethod
    async def map_products(products: list[dict]):
        async with SessionLocal() as db:
            for product in products:
                medicine = await MedicineUtils.get_or_create(db, MedicineCreate(name=product["medicamento"]))
                pharmacy = await PharmacyUtils.get_or_create(db, PharmacyCreate(
                    name=product["farmacia"],
                    img=product.get("img_farmacia")
                ))

                brand = await BrandUtils.get_or_create(db, BrandCreate(name=product.get("brand"))) \
                    if product.get("brand") \
                    else None

                await ProductUtils.update_or_create(db, ProductCreate(
                    price=product["price"],
                    details=product.get("details"),
                    img=product.get("img_medicamento"),
                    medicine_id=medicine.id,
                    pharmacy_id=pharmacy.id,
                    brand_id=brand.id if product.get("brand") else brand
                ))
        return "Productos registrados correctamente en la DB!"
    

    @staticmethod
    async def map_medicines(medicines: list[dict]):
        async with SessionLocal() as db:
            for medicine in medicines:
                await MedicineUtils.get_or_create(db, MedicineCreate(name=medicine["name"]))
        return "Medicamentos registrados correctamente en la DB!"
    

    @staticmethod
    async def map_states_municipalities(states: dict):
        async with SessionLocal() as db:
            for state_name, municipalities in states.items():
                for municipality_dict in municipalities:
                    state = await StateUtils.get_or_create(db, StateCreate(name=state_name))
                    await MunicipalityUtils.get_or_create(db, MunicipalityCreate(
                        name=municipality_dict["municipality_name"],
                        state_id=state.id
                    ))
        return "Estados y municipios registrados correctamente en la DB!"


    @staticmethod
    async def map_branches(branches: list[dict]):
        async with SessionLocal() as db:
            for branch_dict in branches:
                municipality = await MunicipalityUtils.get_by_name(db, branch_dict["municipality"])
                pharmacy = await PharmacyUtils.get_by_name(db, branch_dict["pharmacy"])
                await BranchUtils.get_or_create(db, BranchCreate(
                    address=branch_dict["branch"],
                    municipality_id=municipality.id,
                    pharmacy_id=pharmacy.id
                ))
        return "Sucursales registradas correctamente en la DB!"