import React, { useState, useEffect } from "react";
import { Button, Container, Input, Table } from "tailwindcss";
import { medicamentosService } from "./servicios/medicamentos.service";

const App = ({ medicamentos, onMedicamentosChange, busquedas, onBusquedasChange }) => {
  const [precioAnterior, setPrecioAnterior] = useState(0);
  const [precioActual, setPrecioActual] = useState(0);

  useEffect(() => {
    medicamentosService.getMedicamentos().then((res) => {
      onMedicamentosChange(res.data);
    });
  }, []);

  useEffect(() => {
    if (medicamentos.length > 0) {
      setPrecioAnterior(medicamentos[0].precio);
    }
  }, [medicamentos]);

  const onPrecioCambio = (medicamento) => {
    setPrecioActual(medicamento.precio);

    if (precioActual < precioAnterior) {
      // Enviar notificación push
    }
  };

  return (
    <Container>
      <h1>Dashboard de medicamentos</h1>
      <Table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>
          {medicamentos.map((medicamento) => (
            <tr key={medicamento.id}>
              <td>{medicamento.nombre}</td>
              <td>{medicamento.precio}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Input
        placeholder="Buscar medicamento"
        onChange={(e) => onBusquedasChange([...busquedas, e.target.value])}
      />
      <Button onClick={() => onMedicamentosChange([])}>Limpiar búsquedas</Button>
    </Container>
  );
};

export default App;
