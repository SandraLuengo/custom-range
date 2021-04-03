import React, { useEffect, useState, useRef } from "react";
import { SelectorRange, BarRange } from "../../components";
import "./range.scss";

const Range = ({ minPrice, maxPrice, selectorWidth }) => {
  // Referencias a los selectores
  const [leftSelector, setLeftSelector] = useState(null);
  const [rightSelector, setRightSelector] = useState(null);

  // Left component - ROJO
  const [xLeftComponent, setXLeftComponent] = useState(0);
  const [leftComponentValue, setLeftComponentValue] = useState({
    actual: minPrice,
    min: minPrice,
    max: maxPrice,
  });

  // Right component - AZUL
  const [xRightComponent, setXRightComponent] = useState(100);
  const [rightComponentValue, setRightComponentValue] = useState({
    actual: maxPrice,
    min: minPrice,
    max: maxPrice,
  });

  const rangeComponent = useRef(null);
  let clickX = null;
  let selectedRangeElement = null;
  let moveFlag = false;
  let mouseX = null;
  let oldX = 0;
  let xDirection = "";

  let getLeftSelectorRef = (ref) => {
    setLeftSelector(ref.current);
  };
  let getRightSelectorRef = (ref) => {
    setRightSelector(ref.current);
  };

  useEffect(() => {
    leftSelector?.addEventListener("mousedown", (e) =>
      mousedown(e, leftSelector)
    );
    rightSelector?.addEventListener("mousedown", (e) =>
      mousedown(e, rightSelector)
    );
    document.addEventListener("mousemove", (e) => mousemove(e));
    document.addEventListener("mouseup", (e) => mouseup(e));

    // setRangeXMin(rangeComponent.current.getBoundingClientRect().left);
    // setRangeXMax(rangeComponent.current.getBoundingClientRect().right);
  }, [leftSelector, rightSelector]);

  let mousedown = (e, selector) => {
    clickX = e.clientX;
    selectedRangeElement = selector;
    moveFlag = true;
  };

  let mousemove = (e) => {
    getMouseDirection(e);
    moveSelector();
  };

  let moveSelector = () => {
    if (!moveFlag) return;
    switch (xDirection) {
      case "left":
        console.log(getSelectorValue())
        getSelector()(9);
        return;
      case "right":
        return;
      default:
        return;
    }
  };

  let getSelector = () => selectedRangeElement.id === 'selector-right' ? setXRightComponent : setXLeftComponent;
  let getSelectorValue = () => selectedRangeElement.id === 'selector-right' ? xRightComponent : xLeftComponent;
  let getMouseDirection = (e) => {
    if (e.pageX < oldX) {
      xDirection = "left";
    } else if (e.pageX > oldX) {
      xDirection = "right";
    }
    oldX = e.pageX;
  };

  let mouseup = (e) => (moveFlag = false);

  let getPercentage = () => {};

  return (
    <div className="range">
      <div ref={rangeComponent} className="range--component">
        <SelectorRange
          position={xLeftComponent}
          type={"left"}
          minValue={leftComponentValue.min}
          maxValue={leftComponentValue.max}
          actualValue={leftComponentValue.actual}
          selectorFunction={getLeftSelectorRef}
        />
        <BarRange />
        <SelectorRange
          position={xRightComponent}
          type={"right"}
          minValue={rightComponentValue.min}
          maxValue={rightComponentValue.max}
          actualValue={rightComponentValue.actual}
          selectorFunction={getRightSelectorRef}
        />
      </div>
      {/* <div className="range--prices">
        <input className="range--prices--input" type="text" value={max} />
        <input className="range--prices--input" type="text" value={min} />
      </div> */}
    </div>
  );
};

export default Range;
