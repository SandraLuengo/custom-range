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

let changePrice = (newValue, state, setState) => {
  const { left, right } = newValue;
  return {
    "selector-left": () => {
      if (left <= 0) {
        setState({
          ...state,
          actualPosition: { ...state.actualPosition, left: state.minPrice },
        });
      } else if (left >= right) {
        setState({
          ...state,
          actualPosition: { ...state.actualPosition, left: right - 1 },
        });
      }
      setState({
        ...state,
        xLeftComponent:
          ((left - state.minPrice) * 100) / (state.maxPrice - state.minPrice),
      });
    },
    "selector-right": () => {
      if (right >= 100) {
        setState({
          ...state,
          actualPosition: { ...state.actualPosition, right: state.maxPrice },
        });
      } else if (right <= left) {
        setState({
          ...state,
          actualPosition: { ...state.actualPosition, right: left + 1 },
        });
      }
      setState({
        ...state,
        xRightComponent:
          ((right - state.minPrice) * 100) / (state.maxPrice - state.minPrice),
      });
    },
    undefined: () => {},
  }[state.selectedComponent.id];
};

export { canMoveTo, changePrice };
