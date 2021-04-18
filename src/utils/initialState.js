const initialState = (minPrice, maxPrice) => ({
 
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
  }
});



export default initialState;