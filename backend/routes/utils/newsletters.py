from sqlalchemy.ext.asyncio import AsyncSession

from db.models import Newsletter
from db.schemas.newsletter import NewsletterCreate


class NewsletterUtils:
    @staticmethod
    async def create(db: AsyncSession, suscription: NewsletterCreate):
        new_suscrption = Newsletter(email=suscription.email)
        try:
            db.add(new_suscrption)
        except:
            return None
        await db.commit()
        await db.refresh(new_suscrption)
        return new_suscrption