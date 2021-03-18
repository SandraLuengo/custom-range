import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "./App";
import { Exercise1, Exercise2 } from "./pages";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/exercise1" component={Exercise1} />
      <Route path="/exercise2" component={Exercise2} />
    </Switch>
  </BrowserRouter>
);

export default Router;
