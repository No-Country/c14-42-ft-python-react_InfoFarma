from sqlalchemy.ext.asyncio import AsyncSession

from db.models import Suggestion
from db.schemas.suggestion import SuggestionCreate


class SuggestionUtils:
    @staticmethod
    async def create(db: AsyncSession, suggestion: SuggestionCreate):
        new_suggestion = Suggestion(
            price = suggestion.price,
            details = suggestion.details,
            img = suggestion.img,
            medicine_name = suggestion.medicine_name.lower().replace("-", " "),
            pharmacy_name = suggestion.pharmacy_name.lower().replace("-", " "),
        )
        db.add(new_suggestion)
        await db.commit()
        await db.refresh(new_suggestion)
        return new_suggestion