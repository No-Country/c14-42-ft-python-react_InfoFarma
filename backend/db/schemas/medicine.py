from pydantic import BaseModel


class MedicineBase(BaseModel):
    name: str


class MedicineCreate(MedicineBase):
    ...


class Medicine(MedicineBase):
    id: int

    class Config:
        from_attributes = True