const initialState = (minPrice, maxPrice, priceArray) => ({
  selectedComponent: "selector-right",
  oldXMousePosition: 0,
  xLeftComponent: 0,
  xRightComponent: 100,
  extremesValues: {
    left: {
      min: minPrice,
      max: maxPrice,
    },
    right: {
      min: minPrice,
      max: maxPrice,
    },
  },
  moveAllowed: false,
  actualPosition: {
    left: minPrice,
    right: maxPrice,
  },
  positionsArray: priceArray,
  arrayLeftState: 0,
  arrayRightState: priceArray?.length - 1,
});



export default initialState;