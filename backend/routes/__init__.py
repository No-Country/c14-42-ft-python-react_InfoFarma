from fastapi import FastAPI
from .routes import router as routes_router

def create_routes(app: FastAPI):
    app.include_router(routes_router)
