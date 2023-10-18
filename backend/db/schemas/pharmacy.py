from pydantic import BaseModel


class PharmacyBase(BaseModel):
    name: str
    img: str | None = None


class PharmacyCreate(PharmacyBase):
    ...


class PharmacySchema(PharmacyBase):
    id: int

    class Config:
        from_attributes = True