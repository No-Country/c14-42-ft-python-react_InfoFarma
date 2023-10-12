import os
import json
from fastapi import FastAPI
from typing import Dict
from fastapi.responses import JSONResponse

app = FastAPI()

# Obtén la ruta completa al archivo JSON
json_file_path = os.path.join(os.path.dirname(__file__), "data", "precios_medicamentos.json")

# Carga el contenido del archivo JSON
with open(json_file_path, 'r') as file:
    medicamentos_data = json.load(file)

# Ruta para obtener los datos de medicamentos
@app.get("/medicamentos/{patologia}")
async def get_medicamentos(patologia: str):
    if patologia in medicamentos_data:
        return JSONResponse(content=medicamentos_data[patologia])
    else:
        return JSONResponse(content={"error": "Patología no encontrada"}, status_code=404)