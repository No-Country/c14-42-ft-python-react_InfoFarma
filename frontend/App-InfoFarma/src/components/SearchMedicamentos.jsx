import React, { useState, useEffect } from "react";

const SearchComponent = () => {
  const [patologiaId, setPatologiaId] = useState(""); // El ID de la patología ingresado por el usuario
  const [medicamentos, setMedicamentos] = useState([]); // Almacenar los medicamentos recuperados

  useEffect(() => {
    // Función para obtener medicamentos por ID de patología
    const fetchMedicamentos = async () => {
      try {
        const response = await fetch(`/api/medicamentos/${patologiaId}`); // Reemplaza con la URL correcta de tu API
        if (!response.ok) {
          throw new Error("No se pudo obtener los medicamentos");
        }
        const data = await response.json();
        setMedicamentos(data);
      } catch (error) {
        console.error(error);
        setMedicamentos([]);
      }
    };

    if (patologiaId) {
      fetchMedicamentos();
    } else {
      setMedicamentos([]); // Reiniciar los medicamentos si no hay ID de patología
    }
  }, [patologiaId]);

  return (
    <div>
      <h1>Buscador de Medicamentos</h1>
      <form>
        <label htmlFor="patologia">ID de la patología:</label>
        <input
          type="text"
          id="patologia"
          value={patologiaId}
          onChange={(e) => setPatologiaId(e.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>
      {medicamentos.length > 0 && (
        <div>
          <h2>Resultados:</h2>
          <ul>
            {medicamentos.map((medicamento, index) => (
              <li key={index}>
                {medicamento.nombre}: {medicamento.descripcion}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchComponent;

