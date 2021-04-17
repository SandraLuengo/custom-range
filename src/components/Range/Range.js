import React, { useEffect, useState, useRef } from "react";
import { SelectorRange, BarRange } from "../../components";
import initialState from "../../utils/initialState.js";
import { canMoveTo } from "../../utils/rangeFunctions.js";
import useDebounce from "../../hooks/useDebounce.js";
import "./range.scss";

const Range = ({ minPrice, maxPrice, fixedType, priceArray }) => {
  const [state, setState] = useState(
    initialState(minPrice, maxPrice, priceArray)
  );

  const rangeComponent = useRef(null);
  const debouncedSearchTerm = useDebounce(state.actualPosition, 500);
  let xDirection = "";
 console.log(state.actualPosition)
  useEffect(() => {
    console.log('DEBOUNCE')
    if (debouncedSearchTerm) {
      changePrice(state.actualPosition, state, setState)();
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
      positionsArray: priceArray,
    });
  }, [minPrice, maxPrice, priceArray]);

  let mousedown = (e, selector) => {
    setState({ ...state, selectedComponent: selector, moveAllowed: true });
  };

  let mousemove = (e) => {
    getMouseDirection(e);
    if (state.moveAllowed) {
      moveSelector(e)();
    }
  };

  let moveSelector = (e) => {
    let barRangeWidth = rangeComponent.current.offsetWidth;
    let barLeftPosition = rangeComponent.current.offsetLeft;
    let getValue =
      minPrice + (maxPrice - minPrice) * (getSetStates("getXComponent") / 100);
    if (state.moveAllowed) {
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

  // let canMoveTo = (direction) => {
  //   if (direction === "right") {
  //     if (state.selectedComponent.id === "selector-left") {
  //       return state.actualPosition.left < state.actualPosition.right - 1;
  //     }
  //     return true;
  //   } else if (direction === "left") {
  //     if (state.selectedComponent.id === "selector-right") {
  //       return state.actualPosition.right > state.actualPosition.left + 1;
  //     }
  //     return true;
  //   }
  // };

  let directionsLimits = (direction) => {
    return {
      right: () => ({
        canMove: getSetStates("getXComponent") < 100,
        isLimit: getSetStates("getXComponent") >= 100,
      }),
      left: () => ({
        canMove: getSetStates("getXComponent") > 0,
        isLimit: getSetStates("getXComponent") <= 0,
      }),
    }[direction];
  };

  let getSetStates = (modifier, newState, value) => {
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
      setArrayState:
        state.selectedComponent?.id === "selector-right"
          ? (newState) => setState({ ...state, arrayRightState: newState })
          : (newState) => setState({ ...state, arrayLeftState: newState }),
      getXComponent:
        state.selectedComponent?.id === "selector-right"
          ? state.xRightComponent
          : state.xLeftComponent,
      getArrayState:
        state.selectedComponent?.id === "selector-right"
          ? state.arrayRightState
          : state.arrayLeftState,
    }[modifier];
  };

  let moveTo = (e, barRangeWidth, barLeftPosition, getValue, direction) => {
    if (!canMoveTo(direction, state)) return;
    if (directionsLimits(direction)().canMove) {
      let newState = ((e.clientX - barLeftPosition) * 100) / barRangeWidth;
      getSetStates("setXComponent", newState, getValue)();
    } else if (directionsLimits(direction)().isLimit) {
      if (state.selectedComponent?.id === "selector-right") {
        getSetStates("setXComponent", 100, maxPrice)();
      } else {
        getSetStates("setXComponent", 0, minPrice)();
      }
    }
  };

  let changePrice = (newValue) => {
    const { left, right } = newValue;
    return {
      "selector-left": () => {
        if (left <= 0) {
          setState({
            ...state,
            actualPosition: { ...state.actualPosition, left: minPrice },
          });
        } else if (left >= right) {
          setState({
            ...state,
            actualPosition: { ...state.actualPosition, left: right - 1 },
          });
        }
        setState({
          ...state,
          xLeftComponent: ((left - minPrice) * 100) / (maxPrice - minPrice),
        });
      },
      "selector-right": () => {
        if (right >= 100) {
          setState({
            ...state,
            actualPosition: { ...state.actualPosition, right: maxPrice },
          });
        } else if (right <= left) {
          setState({
            ...state,
            actualPosition: { ...state.actualPosition, right: left + 1 },
          });
        }
        setState({
          ...state,
          xRightComponent: ((right - minPrice) * 100) / (maxPrice - minPrice),
        });
      },
      undefined: () => {},
    }[state.selectedComponent.id];
  };

  let getMouseDirection = (e) => {
    if (e.pageX < state.oldXMousePosition) {
      xDirection = "left";
    } else if (e.pageX > state.oldXMousePosition) {
      xDirection = "right";
    }
    setState({ ...state, oldXMousePosition: e.pageX });
  };

  let mouseup = (e) => {
    let newPosition = getSetStates("getArrayState");
    fixedType && changeActualPosition(positionsArray[newPosition]);
    fixedType && getSetStates("setArrayState")(newPosition);
    setState({ ...state, moveAllowed: false });
  };

  return (
    <div
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
          fixedType={fixedType}
          setState={setState}
          state={state}
          actualPosition={state.actualPosition}
        />
        <BarRange />
        <SelectorRange
          position={state.xRightComponent}
          type={"right"}
          minValue={state.extremesValues.right.min}
          maxValue={state.extremesValues.right.max}
          mouseDown={mousedown}
          fixedType={fixedType}
          setState={setState}
          state={state}
          actualPosition={state.actualPosition}
        />
      </div>
    </div>
  );
};

export default Range;
