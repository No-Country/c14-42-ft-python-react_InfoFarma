import fastapi
from fastapi import Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from db.db_setup import get_db
from db.schemas.newsletter import NewsletterCreate, NewsletterSchema
from .utils.newsletters import NewsletterUtils


router = fastapi.APIRouter()


@router.post("/suscripciones", response_model=NewsletterSchema)
async def create_product(suscription: NewsletterCreate, db: AsyncSession = Depends(get_db)):
    return await NewsletterUtils.create(db, suscription)