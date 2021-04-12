import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Range from "./Range.js";

/*
 *  1. Comprobar que se renderiza correctamente
    2. Comprobar que al cambiar el valor de un value lo aplica correctamente
        - cambiar el target.value de uno de los input
        - luego comprobar que su valor actual es el que hemos metido
    3. Comprobar que nunca se cruzan los dos selectores
        - seleccionar el selector derecho y meterle un valor, ej:44
        - seleccionar el selector izquierdo y meterle el mismo valor, ej:44
        - comprobar que los valores actuales no son iguales y que el input izquierdo tiene un valor menor
 */

it("Range", () => {
  render(
    <BrowserRouter>
      <Range />
    </BrowserRouter>
  );
});
