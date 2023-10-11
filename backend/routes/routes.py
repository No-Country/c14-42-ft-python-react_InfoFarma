from fastapi import FastAPI, APIRouter, Depends, HTTPException, Request, Response
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel
from starlette.responses import HTMLResponse
from typing import List
import aiohttp
import requests
import json
import os

router = APIRouter()

# Configura la carpeta de plantillas Jinja2
templates = Jinja2Templates(directory="templates")

# Modelo para los medicamentos
class Medicamento(BaseModel):
    medicamento: str
    presentacion: str
    farmacia: str
    imagen: str
    precio_minimo: float
    precio_maximo: float
    diferencia: float
    porcentaje: float

# Ruta al archivo JSON dentro del directorio "data"
data_file = os.path.join(os.path.dirname(os.path.dirname(__file__)), "data", "precios_medicamentos.json")


# Carga los datos desde el archivo JSON en el nivel superior
with open(data_file, "r") as file:
    data = json.load(file)

# Ruta de API REST para obtener los datos de los medicamentos
@router.get("/api/medicamentos/", response_model=List[Medicamento])
def get_medicamentos():
    return data  # Usamos los datos cargados desde el archivo JSON

# Ruta para mostrar los datos de medicamentos en una página HTML
@router.get("/", response_class=HTMLResponse)
async def show_medicamentos(request: Request):
    return templates.TemplateResponse("search.html", {"request": request, "data": data})

# Ruta para realizar búsquedas de medicamentos
@router.get("/search", response_class=HTMLResponse)
async def search_medicamentos(request: Request, patologia: str = None):
    data_to_display = data
    if patologia:
        # Filtramos los datos por patología si se proporciona
        if patologia in data["data"]:
            data_to_display = data["data"][patologia]
    return templates.TemplateResponse("search.html", {"request": request, "data": data_to_display})

# Ruta para mostrar nombres de medicamentos por patología
@router.get("/patologias/{patologia}/medicamentos", response_class=HTMLResponse)
async def get_medicamentos_por_patologia(request: Request, patologia: str):
    if patologia in data["data"]:
        medicamentos = [med["medicamento"] for med in data["data"][patologia]["medicamentos"]]
        return templates.TemplateResponse("medicamentos.html", {"request": request, "medicamentos": medicamentos})
    else:
        raise HTTPException(status_code=404, detail="Patología no encontrada")

# Crea una instancia de la aplicación FastAPI
app = FastAPI()

# Agrega el router a la aplicación
app.include_router(router)
