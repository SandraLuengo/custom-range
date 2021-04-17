import React, { useEffect, useState, useRef } from "react";
import { SelectorRange, BarRange } from "../../components";
import useDebounce from "../../hooks/useDebounce.js";
import "./range.scss";

const initialState = () => ({
  selectedComponent: '',
  oldXMousePosition: '',
  xLeftComponent: '', 
  xRightComponent: '',
  extremesValues: '',
  moveAllowed: '',
  rangeComponent: '',
  actualPosition: '',
  positionsArray:'',
  arrayLeftState: '',
  arrayRightState: '',
});

const Range = ({ minPrice, maxPrice, fixedType, priceArray }) => {
  const [selectedComponent, setSelectedComponent] = useState("selector-right");
  const [oldXMousePosition, setOldXMousePosition] = useState(0);
  const [xLeftComponent, setXLeftComponent] = useState(0);
  const [xRightComponent, setXRightComponent] = useState(100);
  const [extremesValues, setExtremesValues] = useState({
    left: {
      min: minPrice,
      max: maxPrice,
    },
    right: {
      min: minPrice,
      max: maxPrice,
    },
  });
  const [moveAllowed, setMoveAllowed] = useState(false);
  const rangeComponent = useRef(null);
  const [actualPosition, setActualPosition] = useState({
    left: minPrice,
    right: maxPrice,
  });
  const [positionsArray, setPositionArray] = useState(priceArray);
  const [arrayLeftState, setArrayLeftState] = useState(0);
  const [arrayRightState, setArrayRightState] = useState(
    priceArray?.length - 1
  );
  const debouncedSearchTerm = useDebounce(actualPosition, 500);



  let xDirection = "";

  useEffect(() => {
    if (debouncedSearchTerm) {
      changePrice(actualPosition)();
    }
  }, [debouncedSearchTerm]);

  useEffect(() => {
    setExtremesValues({
      left: { min: minPrice, max: maxPrice },
      right: { min: minPrice, max: maxPrice },
    });
    setActualPosition({ ...actualPosition, left: minPrice, right: maxPrice });
    fixedType && setPositionArray(priceArray);
  }, [minPrice, maxPrice, priceArray]);

  let mousedown = (e, selector) => {
    setSelectedComponent(selector);
    setMoveAllowed(true);
  };

  let mousemove = (e) => {
    getMouseDirection(e);
    if (moveAllowed) {
      moveSelector(e)();
    }
  };

  let moveSelector = (e) => {
    let barRangeWidth = rangeComponent.current.offsetWidth;
    let barLeftPosition = rangeComponent.current.offsetLeft;
    let getValue =
      minPrice +
      (maxPrice - minPrice) * (modifyStates("getXComponent")() / 100);

    if (moveAllowed) {
      return {
        left: () => {
          fixedType
            ? moveToLeftFixed(
                e,
                barRangeWidth,
                barLeftPosition,
                getValue,
                "left"
              )
            : moveTo(e, barRangeWidth, barLeftPosition, getValue, "left");
        },
        right: () => {
          fixedType
            ? moveToRightFixed(
                e,
                barRangeWidth,
                barLeftPosition,
                getValue,
                "right"
              )
            : moveTo(e, barRangeWidth, barLeftPosition, getValue, "right");
        },
        "": () => {},
      }[xDirection];
    }
  };

  let canMoveTo = (direction) => {
    if (direction === "right") {
      if (selectedComponent.id === "selector-left") {
        return actualPosition.left < actualPosition.right - 1;
      }
      return true;
    } else if (direction === "left") {
      if (selectedComponent.id === "selector-right") {
        return actualPosition.right > actualPosition.left + 1;
      }
      return true;
    }
  };

  let directionsLimits = (direction) => {
    return {
      right: () => ({
        canMove: modifyStates("getXComponent")() < 100,
        isLimit: modifyStates("getXComponent")() === 100,
      }),
      left: () => ({
        canMove: modifyStates("getXComponent")() > 0,
        isLimit: modifyStates("getXComponent")() === 0,
      }),
    }[direction];
  };

  let moveToLeftFixed = (
    e,
    barRangeWidth,
    barLeftPosition,
    getValue,
    direction
  ) => {
    if (!canMoveTo(direction)) return;
    let newPosition = modifyStates("getArrayState")() - 1;
    if (newPosition + 1 === 0) return;
    let newValue = positionsArray[newPosition];
    if (
      modifyStates("getXComponent")() > 0 &&
      getValue >= Math.round(newValue)
    ) {
      modifyStates("setXComponent")()(
        ((e.clientX - barLeftPosition) * 100) / barRangeWidth
      );
    } else {
      changeActualPosition(positionsArray[newPosition]);
      modifyStates("setArrayState")()(newPosition);
    }
  };

  let moveToRightFixed = (
    e,
    barRangeWidth,
    barLeftPosition,
    getValue,
    direction
  ) => {
    if (!canMoveTo(direction)) return;
    let newPosition = modifyStates("getArrayState") + 1;
    if (newPosition === priceArray.length) return;
    let newValue = positionsArray[newPosition];
    if (
      modifyStates("getXComponent")() < 100 &&
      getValue <= Math.round(newValue)
    ) {
      modifyStates("setXComponent")()(
        ((e.clientX - barLeftPosition) * 100) / barRangeWidth
      );
    } else {
      changeActualPosition(positionsArray[newPosition]);
      modifyStates("setArrayState")()(newPosition);
    }
  };

  let moveTo = (e, barRangeWidth, barLeftPosition, getValue, direction) => {
    if (!canMoveTo(direction)) return;
    if (directionsLimits(direction)().canMove) {
      modifyStates("setXComponent")()(
        ((e.clientX - barLeftPosition) * 100) / barRangeWidth
      );
      changeActualPosition(Math.round(getValue));
    } else if (directionsLimits(direction)().isLimit) {
      if (selectedComponent?.id === "selector-right") {
        changeActualPosition(Math.round(maxPrice));
      } else {
        changeActualPosition(Math.round(minPrice));
      }
    }
  };

  let modifyStates = (modifier) => {
    return {
      setXComponent: () =>
        selectedComponent?.id === "selector-right"
          ? setXRightComponent
          : setXLeftComponent,
      getXComponent: () =>
        selectedComponent?.id === "selector-right"
          ? xRightComponent
          : xLeftComponent,
      setArrayState: () =>
        selectedComponent?.id === "selector-right"
          ? setArrayRightState
          : setArrayLeftState,
      getArrayState: () =>
        selectedComponent?.id === "selector-right"
          ? arrayRightState
          : arrayLeftState,
    }[modifier];
  };

  let changeActualPosition = (value) => {
    selectedComponent.id === "selector-right"
      ? setActualPosition({ ...actualPosition, right: value })
      : setActualPosition({ ...actualPosition, left: value });
  };

  let getMouseDirection = (e) => {
    if (e.pageX < oldXMousePosition) {
      xDirection = "left";
    } else if (e.pageX > oldXMousePosition) {
      xDirection = "right";
    }
    setOldXMousePosition(e.pageX);
  };

  let mouseup = (e) => {
    let newPosition = modifyStates("getArrayState")();
    fixedType && changeActualPosition(positionsArray[newPosition]);
    fixedType && modifyStates("setArrayState")()(newPosition);
    setMoveAllowed(false);
  };

  let changePrice = (newValue) => {
    const { left, right } = newValue;
    return {
      "selector-left": () => {
        if (left <= 0) {
          setActualPosition({ ...actualPosition, left: minPrice });
        } else if (left >= right) {
          setActualPosition({ ...actualPosition, left: right - 1 });
        }
        setXLeftComponent(((left - minPrice) * 100) / (maxPrice - minPrice));
      },
      "selector-right": () => {
        if (right >= 100) {
          setActualPosition({ ...actualPosition, right: maxPrice });
        } else if (right <= left) {
          setActualPosition({ ...actualPosition, right: left + 1 });
        }
        setXRightComponent(((right - minPrice) * 100) / (maxPrice - minPrice));
      },
      undefined: () => {},
    }[selectedComponent.id];
  };

  return (
    <div
      className="range"
      onMouseMove={(e) => mousemove(e)}
      onMouseUp={(e) => mouseup(e)}
    >
      <div ref={rangeComponent} className="range--component">
        <SelectorRange
          position={xLeftComponent}
          type={"left"}
          minValue={extremesValues.left.min}
          maxValue={extremesValues.left.max}
          mouseDown={mousedown}
          fixedType={fixedType}
          setActualPosition={setActualPosition}
          actualPosition={actualPosition}
        />
        <BarRange />
        <SelectorRange
          position={xRightComponent}
          type={"right"}
          minValue={extremesValues.right.min}
          maxValue={extremesValues.right.max}
          mouseDown={mousedown}
          fixedType={fixedType}
          setActualPosition={setActualPosition}
          actualPosition={actualPosition}
        />
      </div>
    </div>
  );
};

export default Range;
