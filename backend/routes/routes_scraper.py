from fastapi import FastAPI, HTTPException
from fastapi.templating import Jinja2Templates
from fastapi import Request
import httpx

app = FastAPI()
templates = Jinja2Templates(directory="templates")

# Ruta para mostrar los datos en la plantilla "search.html"
@app.get("/search/")
async def search_medicamentos(request: Request):
    # Realiza una solicitud al servicio Node.js con Cheerio
    scraper_url = "http://localhost:3000/scrape"  # Reemplaza con la URL de tu servicio Node.js
    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(scraper_url)
            response_data = response.json()
            medicamentos_data = response_data.get("medicamentos", [])
        except Exception as e:
            raise HTTPException(status_code=500, detail="Error al obtener datos del servicio Node.js")

    return templates.TemplateResponse("search.html", {"request": request, "medicamentos": medicamentos_data})
