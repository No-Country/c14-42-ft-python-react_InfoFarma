import os
import json


#direccion del archivo json
data_json = 'data/precios_medicamentos.json'

#carga los datos del archivo json
def cargar_data(data_json):
    with open(data_json, 'r') as file:
        medicamentos_data = json.load(file)
        print(medicamentos_data.get("medicamento"))

#ejecuta la funcion
cargar_data(data_json)



#filtrado por busqueda
# def filtrado_data(string):
#     if string in 



