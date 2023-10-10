#routes

from fastapi import FastAPI
from typing import List

# Carga los datos desde el archivo JSON
import json

with open("precios_medicamentos.json", "r") as file:
    data = json.load(file)

# Crea una instancia de FastAPI
app = FastAPI()

# Ruta para obtener todas las patologías
@app.get("/patologias", response_model=List[str])
async def get_patologias():
    patologias = list(data["data"].keys())
    return patologias

# Ruta para obtener medicamentos por patología
@app.get("/patologias/{patologia}", response_model=List[dict])
async def get_medicamentos_por_patologia(patologia: str):
    if patologia in data["data"]:
        medicamentos = data["data"][patologia]["medicamentos"]
        return medicamentos
    else:
        return {"error": "Patología no encontrada"}

# Ruta para obtener detalles de un medicamento por patología y nombre de medicamento
@app.get("/patologias/{patologia}/{medicamento}", response_model=dict)
async def get_detalle_medicamento(patologia: str, medicamento: str):
    if patologia in data["data"] and "medicamentos" in data["data"][patologia]:
        for med in data["data"][patologia]["medicamentos"]:
            if med["medicamento"] == medicamento:
                return med
    return {"error": "Medicamento no encontrado"}
