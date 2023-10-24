import sys
sys.path.append("backend/")

import json
import asyncio
from mapper import DBMapper


if __name__ == "__main__":
    file = open("scraper/data/medicines.json", encoding="utf-8")
    medicines = json.load(file)

    result = asyncio.run(DBMapper.map_medicines(medicines))
    print(result)