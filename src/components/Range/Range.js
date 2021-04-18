import React, { useEffect, useState, useRef, useMemo } from "react";
import { SelectorRange, BarRange } from "../../components";
import initialState from "../../utils/initialState.js";
import {
  canMoveTo,
  moveSelector,
  directionsLimits,
  changePrice,
  getMouseDirection,
  changePosition
} from "../../utils/rangeFunctions.js";
import useDebounce from "../../hooks/useDebounce.js";
import "./range.scss";

const Range = ({ minPrice, maxPrice }) => {
  const [state, setState] = useState(
    useMemo(() => initialState(minPrice, maxPrice), [minPrice, maxPrice])
  );
  const rangeComponent = useRef(null);
  const debouncedSearchTerm = useDebounce(state.actualPosition, 500);
  let xDirection = "";

  useEffect(() => {
    if (debouncedSearchTerm) {
      changePrice(state.actualPosition, setState, state, minPrice, maxPrice)();
    }
  }, [debouncedSearchTerm]);

  useEffect(() => {
    setState({
      ...state,
      extremesValues: {
        left: { min: minPrice, max: maxPrice },
        right: { min: minPrice, max: maxPrice },
      },
      actualPosition: { left: minPrice, right: maxPrice },
    });
  }, [minPrice, maxPrice]);

  let setXDirection = newDirection => xDirection = newDirection;

  let mousedown = (e, selector) => {
    setState({ ...state, selectedComponent: selector, moveAllowed: true });
  };

  let mousemove = (e) => {
    getMouseDirection(e, state, setState, setXDirection);
    if (state.moveAllowed) {
      moveSelector(
        e,
        rangeComponent,
        state,
        getState,
        moveTo,
        xDirection,
        minPrice,
        maxPrice
      )();
    }
  };

  let getState = (modifier) => {
    return {
      getXComponent:
        state.selectedComponent?.id === "selector-right"
          ? state.xRightComponent
          : state.xLeftComponent,
    }[modifier];
  };

  let setStates = (modifier, newState, value) => {
    return {
      setXComponent:
        state.selectedComponent?.id === "selector-right"
          ? () =>
              setState({
                ...state,
                xRightComponent: newState,
                actualPosition: {
                  ...state.actualPosition,
                  right: Math.round(value),
                },
              })
          : () =>
              setState({
                ...state,
                xLeftComponent: newState,
                actualPosition: {
                  ...state.actualPosition,
                  left: Math.round(value),
                },
              }),
    }[modifier];
  };

  let moveTo = (e, barRangeWidth, barLeftPosition, getValue, direction) => {
    if (!canMoveTo(direction, state)) return;
    if (directionsLimits(direction, getState)().canMove) {
      let newState = ((e.clientX - barLeftPosition) * 100) / barRangeWidth;
      setStates("setXComponent", newState, getValue)();
    } else if (directionsLimits(direction, getState)().isLimit) {
      if (state.selectedComponent?.id === "selector-right") {
        setStates("setXComponent", 100, maxPrice)();
      } else {
        setStates("setXComponent", 0, minPrice)();
      }
    }
  };

  let mouseup = (e) => {
    setState({ ...state, moveAllowed: false });
  };

  return (
    <div
      data-testid='range'
      className="range"
      onMouseMove={(e) => mousemove(e)}
      onMouseUp={(e) => mouseup(e)}
    >
      <div ref={rangeComponent} className="range--component">
        <SelectorRange
          position={state.xLeftComponent}
          type={"left"}
          minValue={state.extremesValues.left.min}
          maxValue={state.extremesValues.left.max}
          mouseDown={mousedown}
          setState={setState}
          state={state}
          changePosition={changePosition}
          actualPosition={state.actualPosition}
        />
        <BarRange />
        <SelectorRange
          position={state.xRightComponent}
          type={"right"}
          minValue={state.extremesValues.right.min}
          maxValue={state.extremesValues.right.max}
          mouseDown={mousedown}
          setState={setState}
          state={state}
          changePosition={changePosition}
          actualPosition={state.actualPosition}
        />
      </div>
    </div>
  );
};

export default Range;
