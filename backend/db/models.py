from datetime import datetime

from sqlalchemy import Column, Integer, String, ForeignKey, Numeric, Text, DateTime, UnicodeText, Boolean
from sqlalchemy_utils  import EmailType
from sqlalchemy.orm import relationship

from .db_setup import Base


class State(Base):
    __tablename__ = "states"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50), unique=True, index=True, nullable=False)

    municipality = relationship("Municipality", back_populates="state")


class Municipality(Base):
    __tablename__ = "municipalities"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50), unique=True, index=True, nullable=False)
    state_id = Column(Integer, ForeignKey("states.id"), nullable=False)

    state = relationship(State, back_populates="municipality")
    branch = relationship("Branch", back_populates="municipality")


class Branch(Base):
    __tablename__ = "branches"

    id = Column(Integer, primary_key=True, index=True)
    address = Column(String(300), unique=True, index=True, nullable=False)
    municipality_id = Column(Integer, ForeignKey("municipalities.id"), nullable=False)
    pharmacy_id = Column(Integer, ForeignKey("pharmacies.id"), nullable=False)

    municipality = relationship(Municipality, back_populates="branch")
    pharmacy = relationship("Pharmacy", back_populates="branch")


class Pharmacy(Base):
    __tablename__ = "pharmacies"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), unique=True, index=True, nullable=False)
    img = Column(Text, nullable=True)

    product = relationship("Product", back_populates="pharmacy")
    branch = relationship(Branch, back_populates="pharmacy")


class Disease(Base):
    __tablename__ = "diseases"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50), unique=True, index=True, nullable=False)

    disease_product = relationship("DiseaseProduct", back_populates="disease")


class DiseaseProduct(Base):
    __tablename__ = "diseases_products"

    id = Column(Integer, primary_key=True, index=True)
    disease_id = Column(Integer, ForeignKey("diseases.id"), nullable=False)
    product_id = Column(Integer, ForeignKey("products.id"), nullable=False)

    disease = relationship(Disease, back_populates="disease_product")
    product = relationship("Product", back_populates="disease_product")


class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    price = Column(Numeric(12,2), nullable=False)
    details = Column(UnicodeText, nullable=True)
    img = Column(Text, nullable=True)
    updated_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    medicine_id = Column(Integer, ForeignKey("medicines.id"), nullable=False)
    pharmacy_id = Column(Integer, ForeignKey("pharmacies.id"), nullable=False)
    brand_id = Column(Integer, ForeignKey("brands.id"), nullable=True)

    disease_product = relationship(DiseaseProduct, back_populates="product")
    pharmacy = relationship(Pharmacy, back_populates="product")
    medicine = relationship("Medicine", back_populates="product")
    brand = relationship("Brand", back_populates="product")


class Medicine(Base):
    __tablename__ = "medicines"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(250), unique=True, index=True, nullable=False)

    product = relationship(Product, back_populates="medicine")


class Brand(Base):
    __tablename__ = "brands"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50), unique=True, index=True, nullable=False)

    product = relationship(Product, back_populates="brand")


class Suggestion(Base):
    __tablename__ = "suggestions"

    id = Column(Integer, primary_key=True, index=True)
    price = Column(Numeric(12,2), nullable=False)
    details = Column(UnicodeText, nullable=True)
    img = Column(Text, nullable=True)
    medicine_name = Column(String(50), nullable=False)
    pharmacy_name = Column(String(50), nullable=False) # TODO Consider to put a Foreign Key
    verified = Column(Boolean, default=False, nullable=False)


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50), index=True, nullable=False)
    last_name = Column(String(50), nullable=True)
    username = Column(String(20), unique=True, index=True, nullable=False)
    password = Column(String(20), nullable=False)
    role_id = Column(Integer, ForeignKey("roles.id"), nullable=False)

    role = relationship("Role", back_populates="user")


class Role(Base):
    __tablename__ = "roles"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50), index=True, nullable=False)

    user = relationship(User, back_populates="role")


class Newsletter(Base):
    __tablename__ = "newsletters"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(EmailType, index=True, nullable=False, unique=True)