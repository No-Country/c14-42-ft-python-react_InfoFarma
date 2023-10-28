from pydantic import BaseModel


class MunicipalityBase(BaseModel):
    name: str


class MunicipalityCreate(MunicipalityBase):
    state_id: int


class MunicipalitySchema(MunicipalityBase):
    id: int

    class Config:
        from_attributes = True