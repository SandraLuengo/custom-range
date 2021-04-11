import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
Enzyme.configure({ adapter: new Adapter() });

import { Exercise1 } from "../pages";

let component = null;

describe("Exercise1", () => {
  beforeAll(() => {
    component = shallow(<Exercise1 />);
  });

  it("should render Exercise1", () => {
    expect(component).toMatchSnapshot();
  });
  it.skip("should go to home page on link click", () => {
    component.find(".exercises--btn").simulate("click");
    expect(component.find(".exercises")).toHaveLength(0);
  });
});
