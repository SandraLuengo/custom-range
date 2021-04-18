let canMoveTo = (direction, state) => {
  if (direction === "right") {
    if (state.selectedComponent.id === "selector-left") {
      return state.actualPosition.left < state.actualPosition.right - 1;
    }
    return true;
  } else if (direction === "left") {
    if (state.selectedComponent.id === "selector-right") {
      return state.actualPosition.right > state.actualPosition.left + 1;
    }
    return true;
  }
};

let moveSelector = (
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
) => {
  let barRangeWidth = rangeComponent.current.offsetWidth;
  let barLeftPosition = rangeComponent.current.offsetLeft;
  let getValue =
    minPrice + (maxPrice - minPrice) * (getState("getXComponent") / 100);
  if (state.moveAllowed) {
    return {
      left: () => {
        fixedType
          ? moveToFixed(e, barRangeWidth, barLeftPosition, getValue, "left")
          : moveTo(e, barRangeWidth, barLeftPosition, getValue, "left");
      },
      right: () => {
        fixedType
          ? moveToFixed(e, barRangeWidth, barLeftPosition, getValue, "right")
          : moveTo(e, barRangeWidth, barLeftPosition, getValue, "right");
      },
      "": () => {},
    }[xDirection];
  }
};

let directionsLimits = (direction, getState) => {
  return {
    right: () => ({
      canMove: getState("getXComponent") < 100,
      isLimit: getState("getXComponent") >= 100,
    }),
    left: () => ({
      canMove: getState("getXComponent") > 0,
      isLimit: getState("getXComponent") <= 0,
    }),
  }[direction];
};

let directionsFixedLimits = (direction, getValue, newValue, newPosition, priceArray, getState) => {
  return {
    right: () => ({
      canMove:
        getState?.("getXComponent") < 100 && getValue <= Math.round(newValue),
      isLimit: newPosition + 1 === 0,
    }),
    left: () => ({
      canMove:
        getState?.("getXComponent") > 0 && getValue >= Math.round(newValue),
      isLimit: newPosition === priceArray?.length,
    }),
  }[direction];
};

let changePrice = (newValue, setState, state, minPrice, maxPrice) => {
  const { left, right } = newValue;
  return {
    "selector-left": () => {
      let newPosition = left;
      if (left <= 0) {
        newPosition = minPrice;
      } else if (left >= right) {
        newPosition = right - 1;
      }
      setState({
        ...state,
        actualPosition: { ...state.actualPosition, left: newPosition },
        xLeftComponent:
          ((newPosition - minPrice) * 100) / (maxPrice - minPrice),
      });
    },
    "selector-right": () => {
      let newPosition = right;
      if (right >= 100) {
        newPosition = maxPrice;
      } else if (right <= left) {
        newPosition = left + 1;
      }
      setState({
        ...state,
        actualPosition: { ...state.actualPosition, right: newPosition },
        xRightComponent:
          ((newPosition - minPrice) * 100) / (maxPrice - minPrice),
      });
    },
    undefined: () => {},
  }[state.selectedComponent.id];
};

export {
  canMoveTo,
  moveSelector,
  directionsLimits,
  changePrice,
  directionsFixedLimits,
};
