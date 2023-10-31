from pydantic import BaseModel

from decimal import Decimal
from datetime import datetime


class SuggestionBase(BaseModel):
    price: Decimal
    details: str | None = None
    img: str | None = None
    medicine_name: str
    pharmacy_name: str


class SuggestionCreate(SuggestionBase):
    ...


class SuggestionSchema(SuggestionBase):
    id: int

    class Config:
        from_attributes = True