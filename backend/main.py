from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from fastapi import Request
import aiohttp

app = FastAPI()
templates = Jinja2Templates(directory="templates")

# Configuración de CORS para permitir solicitudes desde el dominio de tu aplicación React
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

async def get_medicamentos(patologia: str):
    async with aiohttp.ClientSession() as session:
        url = f'http://localhost:3000/medicamentos/{patologia}'
        async with session.get(url) as resp:
            data = await resp.json()
            return data
    
@app.get("/", response_class=HTMLResponse)
async def search_medicamentos(request: Request, patologia: str = None):
    data = {}
    if patologia:
        data = await get_medicamentos(patologia)
    return templates.TemplateResponse("search.html", {"request": request, "data": data})
