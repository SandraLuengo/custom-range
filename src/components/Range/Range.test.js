import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { changePosition } from "../../utils/rangeFunctions.js";
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
    4. Comprobar que el valor de los selectores nunca se salga del rango
        - escribir un valor menor que 0 y comprobar que el selector izquierdo no se sale del range
        - escribir un valor mayor que 100 y comprobar que el selector derecho no se sale del range
 */

// describe("Range", () => {
//   const component = render(
//     <BrowserRouter>
//       <Range />
//     </BrowserRouter>
//   );
//   it("should contain data-id ranger on render", () => {
//     expect(screen.getByTestId("range")).toBeInTheDocument();
//   });
//   it("should can change input selector values", () => {
//     const someElement = component.container.querySelector('#input-left');
//   });
// });

let props = {
  maxValue: 100,
  minValue: 0,
};

const setup = () => {
  const utils = render(
    <BrowserRouter>
      <Range {...props} />
    </BrowserRouter>
  );
  const inputLeft = utils.getByLabelText("cost-input-left");
  const inputRight = utils.getByLabelText("cost-input-right");
  return {
    inputLeft,
    inputRight,
    ...utils,
  };
};

describe("Range", () => {
  let component = render(
    <BrowserRouter>
      <Range {...props} />
    </BrowserRouter>
  );
  it("should render <Range/>", () => {
    expect(component).toBeTruthy();
  });
});

describe("Range Functionality", () => {
  it("should change left selector value", () => {
    const { inputLeft } = setup();
    fireEvent.change(inputLeft, { target: { value: "23" } });
    expect(inputLeft.value).toBe("23");
  });

  it("should change right selector value", () => {
    const { inputRight } = setup();
    fireEvent.change(inputRight, { target: { value: "23" } });
    expect(inputRight.value).toBe("23");
  });

  it("left selector can´t be bigger than right selector", () => {
    const { inputLeft, inputRight } = setup();
    fireEvent.change(inputRight, { target: { value: "40" } });
    fireEvent.change(inputLeft, { target: { value: "45" } });
    
  //  console.log(inputLeft.value, inputRight.value)
    expect(parseInt(inputLeft.value)).toBeLessThan(parseInt(inputRight.value));
  });
});
