from pydantic import BaseModel


class BranchBase(BaseModel):
    address: str


class BranchCreate(BranchBase):
    municipality_id: int
    pharmacy_id: int


class BranchSchema(BranchBase):
    id: int

    class Config:
        from_attributes = True