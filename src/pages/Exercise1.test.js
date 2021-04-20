import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Exercise1 from "./Exercise1.js";

const setup = () => {
  const utils = render(
    <BrowserRouter>
      <Exercise1 />
    </BrowserRouter>
  );
  const button = utils.getByLabelText("button-menu");
  return {
    button,
    ...utils,
  };
};

describe("Exercise1", () => {
  let component = render(
    <BrowserRouter>
      <Exercise1 />
    </BrowserRouter>
  );

  it("should render <Exercise1/>", () => {
    const { getByText } = render();
    let heading = getByText("Normal Range");
    expect(heading).toBeInTheDocument();
  });

//   it("should menu button", () => {
//     const { button } = setup();
//     screen.debug();
//     fireEvent.click(button);
//     // screen.debug();
//     // expect(heading).toBeInTheDocument();
//   });
});
