const changePosition = (e, setState, state, type) => {
  let newValue = parseInt(e.target.value);
  if (e.target.value === "") {
    newValue = 0;
  } else if (parseInt(e.target.value) < 0 || parseInt(e.target.value) > 100) {
    newValue = state.actualPosition[type];
  }
  setState({
    ...state,
    actualPosition: {
      ...state.actualPosition,
      [type]: newValue,
    },
  });
};

export default changePosition;
