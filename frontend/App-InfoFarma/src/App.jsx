import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SearchMedicamentos from '../src/components/SearchMedicamentos'; 

function App() {
  return (
    <Router>
      <Route path="/" exact component={SearchMedicamentos} />
    </Router>
  );
}

export default App;
