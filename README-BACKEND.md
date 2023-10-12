Para inicializar su proyecto de manera local primero les explico,

se creó el archivo .gitignore para ignorar las carpetas "venv" y sus derivados ya que cada programador en su local debe crearlas para poder inicializar su proyecto, aca debajo dejare recursos de como se inicializa un proyecto local de FASTAPI usando uvicorn:

https://fastapi.tiangolo.com/#create-it (Explicacion desde la documentacion)

Primero debemos crear nuestra variable de entorno (venv). Desde la terminal (para windows ejecutar powershell o cmd):
-$ python -m venv [nombre_variable]

para que todos mantengamos la parejidad y evitar tener problemas internos de compilacion el nombre de la variable deberia ser venv. Es decir, debemos crear la variable de entorno con este nombre:
-$ python -m venv venv


una vez creada la variable de entorno, procedemos a ejecutarla desde la terminal (en algunos casos se ejecuta sola)
nos paramos en la carpeta raiz del proyecto y ejecutamos
-$ venv/Scripts/activate

ahora de esta manera deberia salirnos el nombre de la variable entre parentesis, eso significa que ya se activó correctamente la variable de entorno de cada quien, el gitignore, protege nuestro repositorio de no subirnos estas carpetas que son para la ejecucion local de cada persona.

Ejemplo de mi terminal local (terminal powershell, cada terminal lo muestra de manera similares):
-$ (venv) PS C:\Users\pauloriveiro\Desktop\nocountry\c14-42-ft-python-react_InfoFarma\backend>

Para ejecutar el servidor:
-$ uvicorn main:app --reload

la flag de --reload permite que el server se actualice automaticamente cada vez que guardamos los archivos .py



PARA INSTALAR LIBRERIAS DEL REQUIREMTS.TXT
-$ pip install -r requirements.txt