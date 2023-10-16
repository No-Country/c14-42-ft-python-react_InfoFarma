from pydantic import BaseModel


class MedicineBase(BaseModel):
    name: str


class MedicineCreate(MedicineBase):
    ...


class MedicineSchema(MedicineBase):
    id: int

    class Config:
        from_attributes = True