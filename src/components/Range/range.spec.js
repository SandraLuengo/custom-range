import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
Enzyme.configure({ adapter: new Adapter() });

import { Range } from "../../components";

let component = null;

describe("Range", () => {
  beforeAll(() => {
    component = mount(<Range minPrice={1} maxPrice={100} fixedType={false} />);
  });

  it("should render Exercise1", () => {
    expect(component).toMatchSnapshot();
  });

  it("it should has minPrice as prop", () => {
    expect(component.props().minPrice).toEqual(1);
  });

  it("it should has maxPrice as prop", () => {
    expect(component.props().maxPrice).toEqual(100);
  });

  it("it should has fixedType as prop", () => {
    expect(component.props().fixedType).toEqual(false);
  });

  it.skip("it should change min value", () => {

    const input = component.find("#input-left");

    input.simulate("change", { target: { value: 34 } });

    console.log(input.get(0));

    expect(component.find("#selector-left").prop("style").left).toBe("33.3333%");
  });

  it.only("it should change max value", () => {

    const input = component.find("#input-right");

    input.simulate("change", { target: { value: '50' } });

    expect(component.find("#selector-right").prop("style").left).toBe("49.4949%");
  });
});
