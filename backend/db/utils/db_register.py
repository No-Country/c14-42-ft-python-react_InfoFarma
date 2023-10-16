import sys
sys.path.append("backend/")

import asyncio
from mapper import DBMapper


products = [
    {
        "price": "480.00",
        "medicamento": "Plavix",
        "farmacia": "Soriana",
    },
    {
        "price": "480.00",
        "medicamento": "Ibuprofeno",
        "farmacia": "Benavides",
    }
]

if __name__ == "__main__":
    result = asyncio.run(DBMapper.map_products(products))
    print(result)