import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../redux/actions';

function MedicamentosComponent() {
  const [data, setData] = useState([]);
  const dispatch = useDispatch()

  const allProducts = useSelector(state => state.allProducts);

  useEffect(() => {
    // Realiza una solicitud GET al backend de FastAPI
    // fetch('http://localhost:3000/medicamentos/enfermedades%20infecciosas%20y%20parasitarias')
    //   .then((response) => response.json())
    //   .then((data) => setData(data));
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <div>
      <h1>Medicamentos</h1>
      {/* {console.log({allProducts})} */}
      <ul>
        {allProducts.map((medicamento) => (
          <li key={medicamento.id}>{medicamento.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default MedicamentosComponent;
