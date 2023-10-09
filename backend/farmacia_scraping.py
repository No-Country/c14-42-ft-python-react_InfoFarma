import requests
import json

# Obtener el token de acceso
url = "https://api.walmart.com.mx/oauth/token"
headers = {
    "Authorization": "Basic YOUR_CLIENT_ID:YOUR_CLIENT_SECRET"
}
data = {
    "grant_type": "client_credentials"
}

response = requests.post(url, headers=headers, data=data)

token = response.json()["access_token"]

# Obtener una lista de medicamentos
url = "https://api.walmart.com.mx/items"
headers = {
    "Authorization": f"Bearer {token}"
}
params = {
    "query": "paracetamol"
}

response = requests.get(url, headers=headers, params=params)

medicamentos = response.json()["results"]

# Imprimir los datos de los medicamentos
for medicamento in medicamentos:
    print(medicamento["nombre"], medicamento["precio"])
