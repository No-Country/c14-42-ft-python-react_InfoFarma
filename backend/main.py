from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import create_routes, products, newsletters, branches
from routes.routes import router as routes_router


app = FastAPI()
# app.include_router(routes_router)
app.include_router(products.router)
app.include_router(newsletters.router)
app.include_router(branches.router)

# create_routes(app)

# Configuración de CORS para permitir solicitudes desde el dominio de tu aplicación React
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)