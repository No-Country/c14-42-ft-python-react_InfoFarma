import fastapi
from fastapi import Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from db.db_setup import get_db
from db.schemas.suggestion import SuggestionSchema, SuggestionCreate
from .utils.suggestions import SuggestionUtils


router = fastapi.APIRouter()


@router.post("/sugerencias", response_model=SuggestionSchema)
async def create_suggestion(suggestion: SuggestionCreate, db: AsyncSession = Depends(get_db)):
    return await SuggestionUtils.create(db, suggestion)