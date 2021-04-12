import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "./App.js";

/*
 *  Quiero comprobar que App se renderiza correctamente
 */

it("renders App", () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  expect(screen.getByTestId("app")).toBeInTheDocument();
});
