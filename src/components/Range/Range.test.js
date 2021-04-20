import React from "react";
import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
} from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Range from "./Range.js";

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
   // screen.debug();
    expect(inputRight.value).toBe("23");
  });

  
  // it("left selector can´t be bigger than right selector", async () => {
  //   const { inputLeft, inputRight } = setup();
  //   fireEvent.change(inputRight, { target: { value: "40" } });
  //   fireEvent.change(inputLeft, { target: { value: "45" } });
  //   await new Promise((r) => setTimeout(r, 2000));
  //   expect(parseInt(inputLeft.value)).(parseInt(inputRight.value));
  // });

  // it("right selector can´t be smaller than left selector", async () => {
  //   const { inputLeft, inputRight } = setup();
  //   fireEvent.change(inputRight, { target: { value: "40" } });
  //   fireEvent.change(inputLeft, { target: { value: "45" } });
  //   await new Promise((r) => setTimeout(r, 2000));
  //   expect(parseInt(inputRight.value)).toBeGreaterThan(
  //     parseInt(inputLeft.value)
  //   );
  // });
});
