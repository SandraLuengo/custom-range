import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Exercise1 from "./Exercise1.js";

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
});
