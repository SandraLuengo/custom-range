import React, { useEffect, useState, useRef, useMemo } from "react";
import { SelectorRange, BarRange } from "../../components";
import initialState from "../../utils/initialState.js";
import {
  canMoveTo,
  moveSelector,
  directionsLimits,
  changePrice,
  directionsFixedLimits,
} from "../../utils/rangeFunctions.js";
import useDebounce from "../../hooks/useDebounce.js";
import "./range.scss";

const Range = ({ minPrice, maxPrice, fixedType, priceArray }) => {
  const [state, setState] = useState(
   useMemo(() => initialState(minPrice, maxPrice, priceArray),[minPrice, maxPrice, priceArray]) 
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
      positionsArray: priceArray,
      arrayRightState: priceArray?.length - 1,
    });
  }, [minPrice, maxPrice, priceArray]);
 


  let mousedown = (e, selector) => {
    setState({ ...state, selectedComponent: selector, moveAllowed: true });
  };

  let mousemove = (e) => {
    getMouseDirection(e);
    if (state.moveAllowed) {
      moveSelector(
        e,
        rangeComponent,
        state,
        getState,
        fixedType,
        moveTo,
        moveToFixed,
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
      getArrayState:
        state.selectedComponent?.id === "selector-right"
          ? state.arrayRightState
          : state.arrayLeftState,
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
      setArrayState:
        state.selectedComponent?.id === "selector-right"
          ? () => setState({ ...state, arrayRightState: newState })
          : () => setState({ ...state, arrayLeftState: newState }),
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

  let moveToFixed = (
    e,
    barRangeWidth,
    barLeftPosition,
    getValue,
    direction
  ) => {
    if (!canMoveTo(direction, state)) return;
    let newPosition =
      direction === "left"
        ? getState("getArrayState") - 1
        : getState("getArrayState") + 1;
    let newValue = state.positionsArray[newPosition];
    // if (
    //   directionsFixedLimits(
    //     direction,
    //     getValue,
    //     newValue,
    //     newPosition,
    //     priceArray,
    //     getState
    //   )().canMove
    // ) {
    //   return;
    // }

    //console.log(direction, getValue, newValue)

    if (directionsFixedLimits(direction, getValue, newValue)().canMove) {
      if(state.selectedComponent?.id === "selector-right") {
        setState({
          ...state,
          xRightComponent:  ((e.clientX - barLeftPosition) * 100) / barRangeWidth,
        })
      } else {
        setState({
          ...state,
          xLeftComponent:  ((e.clientX - barLeftPosition) * 100) / barRangeWidth,
        })
      }
    } else {
      changeActualPosition(state.positionsArray[newPosition]);
      setStates("setArrayState", newPosition)();
    }
  };

  let changeActualPosition = (value) => {
    console.log(value)
    state.selectedComponent.id === "selector-right"
      ? setState({
          ...state,
          actualPosition: { ...state.actualPosition, right: value },
        })
      : setState({
          ...state,
          actualPosition: { ...state.actualPosition, left: value },
        });
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
    let newPosition = getState("getArrayState");
    fixedType && changeActualPosition(state.positionsArray[newPosition]);
    fixedType && setStates("setArrayState")(newPosition);
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
