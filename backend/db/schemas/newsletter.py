from pydantic import BaseModel


class NewsletterCreate(BaseModel):
    email: str


class NewsletterSchema(NewsletterCreate):
    id: int

    class Config:
        from_attributes = True