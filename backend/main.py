from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from fastapi import Request
import aiohttp
import json
import os

app = FastAPI()
templates = Jinja2Templates(directory="templates")

# Ruta al directorio que contiene el archivo JSON
data_dir = os.path.join(os.path.dirname(__file__), "data")

# Ruta al archivo JSON dentro del directorio "data"
data_file = os.path.join(data_dir, "precios_medicamentos.json")

# Carga los datos desde el archivo JSON en el nivel superior
with open(data_file, "r") as file:
    data = json.load(file)

# Configuración de CORS para permitir solicitudes desde el dominio de tu aplicación React
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

async def get_medicamentos(patologia: str):
    async with aiohttp.ClientSession() as session:
        url = f'http://localhost:8000/medicamentos/{patologia}'
        async with session.get(url) as resp:
            data = await resp.json()
            return data
    
@app.get("/", response_class=HTMLResponse)
async def search_medicamentos(request: Request, patologia: str = None):
    data = {}
    if patologia:
        data = await get_medicamentos(patologia)
    return templates.TemplateResponse("search.html", {"request": request, "data": data})

# Ruta para mostrar nombres de medicamentos por patología
@app.get("/patologias/{patologia}/medicamentos", response_class=HTMLResponse)
async def get_medicamentos_por_patologia(request: Request, patologia: str):
    if patologia in data["data"]:
        medicamentos = [med["medicamento"] for med in data["data"][patologia]["medicamentos"]]
        return templates.TemplateResponse("medicamentos.html", {"request": request, "medicamentos": medicamentos})
    else:
        return {"error": "Patología no encontrada"}