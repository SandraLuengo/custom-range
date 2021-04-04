import React, { useEffect, useState, useRef } from "react";
import { SelectorRange, BarRange } from "../../components";
import "./range.scss";

const Range = ({ minPrice, maxPrice }) => {
  // Selection seleccionado
  const [selectedComponent, setSelectedComponent] = useState(null);
  //Prev mouse x Position
  const [oldXMousePosition, setOldXMousePosition] = useState(0);
  // Left component - ROJO
  const [xLeftComponent, setXLeftComponent] = useState(0);
  const [leftComponentValue, setLeftComponentValue] = useState({
    actual: minPrice,
    min: minPrice,
    max: maxPrice,
  });
  // Right component - AZUL
  const [xRightComponent, setXRightComponent] = useState(100);
  const [rightComponentValue, setRightComponentValue] = useState({
    actual: maxPrice,
    min: minPrice,
    max: maxPrice,
  });
  //mouse State
  const [moveAllowed, setMoveAllowed] = useState(false);

  const rangeComponent = useRef(null);
  let xDirection = "";

  let mousedown = (e, selector) => {
    setSelectedComponent(selector);
    setMoveAllowed(true);
  };

  let mousemove = (e) => {
    getMouseDirection(e);
    moveSelector(e);
  };
  let moveSelector = (e) => {
    if (moveAllowed) {
      switch (xDirection) {
        case "left":
          moveLeft(e);
          return;
        case "right":
          moveRight(e);
          return;
        default:
          return;
      }
    }
  };

  // let move = (e,  direction) => {
  //   if(!canMove(direction)) return
  //   let getValue = minPrice + (maxPrice - minPrice) * (getXComponent()/100);
  //   if(selectedComponent?.id === "selector-left") {
  //     console.log(getValue,  getXComponent() )
  //     getXComponent() > 0  && setXComponent()((e.clientX - 300 - 10)*100/300);
  //     if ( getXComponent() > 0 ) {
  //       setComponentValue()({...getComponentValue(), actual:Math.round(getValue)})
  //     } else if(getXComponent() === 0) {
  //       setComponentValue()({...getComponentValue(), actual:minPrice})
  //     }
  //   } else {
  //     getXComponent() < 100 && setXComponent()((e.clientX - 300 - 10)*100/300);
  //     if ( getXComponent() < 100 ) {
  //       setComponentValue()({...getComponentValue(), actual:Math.round(getValue)})
  //     } else if(getXComponent() ===  100) {
  //       setComponentValue()({...getComponentValue(), actual:maxPrice})
  //     }  
  //   }
   
  // }

  
  // let canMove = (direction) => {
  //   switch(direction) {
  //     case 'right':
  //       if( selectedComponent.id==='selector-left' ) {
  //         return leftComponentValue.actual < rightComponentValue.actual -1 ? true : false;
  //       } else {
  //         return true;
  //       }
  //     case 'left':
  //       if( selectedComponent.id==='selector-right' ) {
  //         return rightComponentValue.actual > leftComponentValue.actual +1 ? true : false
  //       } else {
  //         return true;
  //       }
  //   }
  // };

  let canMoveLeft = () => {
    if( selectedComponent.id==='selector-right' ) {
      return rightComponentValue.actual > leftComponentValue.actual +1;
    } 
    return true;
  };
  let canMoveRight = () => {
    if( selectedComponent.id==='selector-left' ) {
      return leftComponentValue.actual < rightComponentValue.actual -1;
    }
    return true;
  };

  let moveLeft = (e) => {
    if(!canMoveLeft()) return
    let getValue = minPrice + (maxPrice - minPrice) * (getXComponent()/100);
    getXComponent() > 0 && setXComponent()((e.clientX - 300 - 10)*100/300);
    if ( getXComponent() > 0 ) {
      setComponentValue()({...getComponentValue(), actual:Math.round(getValue)})
    } else if(getXComponent() === 0) {
      setComponentValue()({...getComponentValue(), actual:minPrice})
    }
  };

  let moveRight = (e) => {
    if(!canMoveRight()) return
    let getValue = minPrice + (maxPrice - minPrice) * (getXComponent()/100);
    getXComponent() < 100 && setXComponent()((e.clientX - 300 - 10)*100/300);
    if ( getXComponent() < 100 ) {
      setComponentValue()({...getComponentValue(), actual:Math.round(getValue)})
    } else if(getXComponent() ===  100) {
      setComponentValue()({...getComponentValue(), actual:maxPrice})
    }       
  };

  let setXComponent = () => {
    return selectedComponent?.id === "selector-right"
      ? setXRightComponent
      : setXLeftComponent;
  };
  let getXComponent = () => {
    return selectedComponent?.id === "selector-right"
      ? xRightComponent
      : xLeftComponent;
  };
  let setComponentValue = () =>
    selectedComponent.id === "selector-right"
      ? setRightComponentValue
      : setLeftComponentValue;

  let getComponentValue = () =>
    selectedComponent.id === "selector-right"
      ? rightComponentValue
      : leftComponentValue;

  let getMouseDirection = (e) => {
    if (e.pageX < oldXMousePosition) {
      xDirection = "left";
    } else if (e.pageX > oldXMousePosition) {
      xDirection = "right";
    }
    setOldXMousePosition(e.pageX);
  };

  let mouseup = (e) => {
    setMoveAllowed(false);
  };

  let changePrice = (e) => {
    let newValue =  parseInt(e.target.value);
    switch(selectedComponent.id) {
      case "selector-left":
        if(newValue <= 0) { 
          newValue = minPrice;
        } else if(newValue >= rightComponentValue.actual) {
          newValue = rightComponentValue.actual - 1; 
        } 
        setLeftComponentValue({...getComponentValue(), actual:newValue});
        if(newValue < minPrice) {
          setXLeftComponent(((minPrice - minPrice) * 100) / (maxPrice - minPrice));
        } else {
          setXLeftComponent(((newValue - minPrice) * 100) / (maxPrice - minPrice));
        }
        return;
      case "selector-right":
        if(newValue >= 100) { 
          newValue = maxPrice;
        } else if(newValue <= leftComponentValue.actual) {
          newValue = leftComponentValue.actual + 1;
        } 
        setRightComponentValue({...getComponentValue(), actual:newValue});
        setXRightComponent(((newValue - minPrice) * 100) / (maxPrice - minPrice));
        return;
    }
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
          minValue={leftComponentValue.min}
          maxValue={leftComponentValue.max}
          actualValue={leftComponentValue.actual}
          mouseDown={mousedown}
          changePrice={changePrice}
        />
        <BarRange />
        <SelectorRange
          position={xRightComponent}
          type={"right"}
          minValue={rightComponentValue.min}
          maxValue={rightComponentValue.max}
          actualValue={rightComponentValue.actual}
          mouseDown={mousedown}
          changePrice={changePrice}
        />
      </div>
    </div>
  );
};

export default Range;
