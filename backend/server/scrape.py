import requests

url = 'http://localhost:3000/scrape'  # URL del servidor Node.js

response = requests.get(url)

if response.status_code == 200:
    data = response.json()
    # Utiliza los datos en tu aplicación FastAPI
    print(data)
else:
    print("Error al obtener datos desde el servidor Node.js")
