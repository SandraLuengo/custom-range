import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import SelectorRange from "./SelectorRange.js";

let props = {
    type:'left',
    position:0,
    maxValue:50,
    minValue:10,
    actualPosition:0,
};

describe("SelectorRange", () => {
  let component = render(
    <BrowserRouter>
      <SelectorRange {...props} />
    </BrowserRouter>
  );

  it("should render <SelectorRange/>", () => {
    expect(component).toBeTruthy();
  });
});
