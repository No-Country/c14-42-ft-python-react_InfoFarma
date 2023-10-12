from pydantic import BaseModel

from decimal import Decimal
from datetime import datetime


class ProductBase(BaseModel):
    price: Decimal
    details: str | None = None
    img: str | None = None


class ProductCreate(ProductBase):
    medicine_id: int
    brand_id: int


class Product(ProductBase):
    id: int
    updated_at: datetime

    class Config:
        from_attributes = True