import React, { useState } from "react";
import { Route, Redirect } from "react-router-dom";

const SearchRoute = ({ match }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.searchTerm.value);
  };

  return (
    <Route
      path={match.url}
      render={(props) => (
        <div className="container">
          <h1>Buscar medicamentos</h1>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              name="searchTerm"
              placeholder="Nombre del medicamento"
              value={searchTerm}
            />
            <button type="submit">Buscar</button>
          </form>
        </div>
      )}
    />
  );
};

export default SearchRoute;
