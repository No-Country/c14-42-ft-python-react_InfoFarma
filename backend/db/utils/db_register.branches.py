import sys
sys.path.append("backend/")

import json
import asyncio
from mapper import DBMapper


if __name__ == "__main__":
    file = open("scraper/data/branches.json", encoding="utf-8")
    branches = json.load(file)

    result = asyncio.run(DBMapper.map_branches(branches))
    print(result)