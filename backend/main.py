from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import create_routes
from routes.routes import router as routes_router


app = FastAPI()
app.include_router(routes_router)

create_routes(app)

# Configuración de CORS para permitir solicitudes desde el dominio de tu aplicación React
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)