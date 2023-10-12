from pydantic import BaseModel


class BrandBase(BaseModel):
    name: str


class BrandCreate(BrandBase):
    ...


class Brand(BrandBase):
    id: int

    class Config:
        from_attributes = True