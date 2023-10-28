import sys
sys.path.append("backend/")

import json
import asyncio
from mapper import DBMapper

async def register_municipalities(states_file):
    for states in states_file.values():
        result = await DBMapper.map_states_municipalities(states)
        print(result)

if __name__ == "__main__":
    file = open("scraper/data/states.json", encoding="utf-8")
    states_file = json.load(file)

    asyncio.run(register_municipalities(states_file))