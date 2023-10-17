import sys
sys.path.append("backend/")

import json
import asyncio
from mapper import DBMapper


if __name__ == "__main__":
    file = open("scraper/data/prueba_medicamentos.json", encoding="utf-8")
    products = json.load(file)["data"]
    result = asyncio.run(DBMapper.map_products(products))
    print(result)