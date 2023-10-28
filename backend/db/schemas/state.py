from pydantic import BaseModel


class StateBase(BaseModel):
    name: str


class StateCreate(StateBase):
    ...


class StateSchema(StateBase):
    id: int

    class Config:
        from_attributes = True