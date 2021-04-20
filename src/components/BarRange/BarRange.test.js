import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import BarRange from "./BarRange.js";

let props = {
    type:'left',
    position:0,
    maxValue:50,
    minValue:10,
    actualPosition:0,
};

describe("BarRange", () => {
  let component = render(
    <BrowserRouter>
      <BarRange {...props} />
    </BrowserRouter>
  );

  it("should render <BarRange/>", () => {
    expect(component).toBeTruthy();
  });
});
