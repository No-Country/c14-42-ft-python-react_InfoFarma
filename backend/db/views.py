from sqlalchemy import Column, Integer, String, Numeric

from .db_setup import Base


class ProductView(Base):
    __table_args__ = {"schema": "public", "extend_existing": True}
    __tablename__ = "max_min_products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50), unique=True, index=True, nullable=False)
    max_price = Column(Numeric(12,2), nullable=False)
    min_price = Column(Numeric(12,2), nullable=False)