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
  moveTo,
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
        moveTo(e, barRangeWidth, barLeftPosition, getValue, "left");
      },
      right: () => {
        moveTo(e, barRangeWidth, barLeftPosition, getValue, "right");
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


let getMouseDirection = (e, state, setState, setXDirection) => {
  if (e.pageX < state.oldXMousePosition) {
    setXDirection("left")
  } else if (e.pageX > state.oldXMousePosition) {
    setXDirection("right")
  }
  setState({ ...state, oldXMousePosition: e.pageX });
};

const changePosition = (e, setState, state, type, maxPrice, minPrice) => {
  let newValue = parseInt(e.target.value);
  if (e.target.value === "") {
    newValue = 0;
  }
  setState({
    ...state,
    actualPosition: {
      ...state.actualPosition,
      [type]: newValue,
    },
  });
};

export {
  canMoveTo,
  moveSelector,
  directionsLimits,
  changePrice,
  getMouseDirection,
  changePosition
};
