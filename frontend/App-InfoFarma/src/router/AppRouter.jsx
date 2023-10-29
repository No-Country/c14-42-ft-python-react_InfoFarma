import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../components/Dashboard";
import Login from "../components/Login";

function AppRouter({ isAuthenticated }) {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <PrivateRoute
          path="/dashboard"
          component={Dashboard}
          isAuthenticated={isAuthenticated}
        />
        <Redirect from="/" to="/login" />
      </Switch>
    </Router>
  );
}

export default AppRouter;
