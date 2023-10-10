import { useEffect, useState } from 'react';

function MedicamentosComponent() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Realiza una solicitud GET al backend de FastAPI
    fetch('http://localhost:3000/medicamentos/enfermedades%20infecciosas%20y%20parasitarias')
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  return (
    <div>
      <h1>Medicamentos</h1>
      <ul>
        {data.map((medicamento) => (
          <li key={medicamento.medicamento}>{medicamento.medicamento}</li>
        ))}
      </ul>
    </div>
  );
}

export default MedicamentosComponent;
