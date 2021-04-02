import React, { useEffect, useState, useRef } from "react";
import { SelectorRange, BarRange } from "../../components";
import "./range.scss";

const Range = ({ min, max, selectorWidth }) => {
  const [leftSelector, setLeftSelector] = useState(null);
  const [rightSelector, setRightSelector] = useState(null);
  const [rangeXMin, setRangeXMin] = useState(null);
  const [rangeXMax, setRangeXMax] = useState(null);
  const rangeComponent = useRef(null);
  let previousX = null;
  let selectedRangeElement = null;
  let selectedRangeClass = "";
  let moveFlag = false;
  let mouseX = null;
  let barWidth = 300;
  let leftSelectorRight = null;
  let rightSelectorLeft = null;
  let leftSelectorLeft = null;

  let getLeftSelectorRef = (ref) => {
    setLeftSelector(ref.current);
  };
  let getRightSelectorRef = (ref) => {
    setRightSelector(ref.current);
  };

  useEffect(() => {
    leftSelector?.addEventListener("mousedown", (e) =>
      mousedown(e, leftSelector)
    );
    rightSelector?.addEventListener("mousedown", (e) =>
      mousedown(e, rightSelector)
    );
    document.addEventListener("mousemove", (e) => mousemove(e));
    document.addEventListener("mouseup", (e) => mouseup(e));

    setRangeXMin(rangeComponent.current.getBoundingClientRect().left);
    setRangeXMax(rangeComponent.current.getBoundingClientRect().right);
  }, [leftSelector, rightSelector]);

  let mousedown = (e, selector) => {
    previousX = e.clientX;
    selectedRangeElement = selector;
    selectedRangeClass = selectedRangeElement.className
      .replace("selector-range", "")
      .trim();
    moveFlag = true;
  };

  let mousemove = (e) => {
    if (moveFlag) {
      leftSelectorRight = leftSelector.getBoundingClientRect().right;
      rightSelectorLeft = rightSelector.getBoundingClientRect().left;
      leftSelectorLeft = leftSelector.getBoundingClientRect().left;

      mouseX = e.clientX;
     
      if (selectedRangeClass === "selector-range--left") {

        if (leftSelectorRight < rightSelectorLeft  && mouseX >= rangeXMin - selectorWidth  ) {        
          selectedRangeElement.style.left = `${getPercentage()}`;  
          console.log(leftSelectorRight, rightSelectorLeft)

        } else if (leftSelectorRight <= rightSelectorLeft && mouseX < leftSelectorRight) {
          //selectedRangeElement.style.left = `${getPercentage()}`;
        }
      } else if (selectedRangeClass === "selector-range--right") {
        if (mouseX <= rangeXMax + selectorWidth && rightSelectorLeft > leftSelectorRight) {
          selectedRangeElement.style.left = `${getPercentage()}`;
          
        }
      }

    }
  };
  let mouseup = (e) => (moveFlag = false);

  let getPercentage = () => {
    let percentage = ((mouseX - rangeXMin) * 100) / (rangeXMax - rangeXMin);
    if (percentage > 100) {
      return 100 + "%";
    } else if (percentage <= 0) {
      return `calc(${0}% - ${selectorWidth}px)`;
    } else {
      return percentage + "%";
    }
  };

  let getPrice = () => {
    let percentage = ((mouseX - rangeXMin) * 100) / (rangeXMax - rangeXMin);
    if(percentage > 100) {
        percentage =  100;
    } else if ( percentage < 0) {
      percentage =  0;
    } 

    return `${Math.round((percentage * max) / 100)}€`;
  };

  return (
    <div className="range">
      <div ref={rangeComponent} className="range--component">
        <SelectorRange
          type={"left"}
          value={min}
          selectorFunction={getLeftSelectorRef}
        />
        <BarRange />
        <SelectorRange
          type={"right"}
          value={max}
          selectorFunction={getRightSelectorRef}
        />
      </div>
      {/* <div className="range--prices">
        <input className="range--prices--input" type="text" value={max} />
        <input className="range--prices--input" type="text" value={min} />
      </div> */}
    </div>
  );
};

export default Range;
