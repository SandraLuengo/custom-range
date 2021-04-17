import React, { useRef } from "react";
import "./selectorRange.scss";

const SelectorRange = ({
  type,
  position,
  maxValue,
  minValue,
  mouseDown,
  fixedType,
  setState,
  state,
  actualPosition,
}) => {
  const selector = useRef(null);
  const canChangePosition = (e) => {
    if (e.target.value === "") {
      console.log(1)
      setState({...state, actualPosition: {...state.actualPosition,[type]: 0}});
      return;
    }
    if (parseInt(e.target.value) < 0 || parseInt(e.target.value) > 100) {
      console.log(2)
      setState({...state, actualPosition: {...state.actualPosition,[type]: actualPosition[type]}});
    } else {
      setState({...state, actualPosition: {...state.actualPosition,[type]: parseInt(e.target.value)}});
    }
  };
  return (
    <div className="selector">
      <div
        onMouseDown={(e) => mouseDown(e, selector.current)}
        style={{ left: `${position}%` }}
        max-value={maxValue}
        min-value={minValue}
        actual-value={
          type === "left" ? actualPosition.left : actualPosition.right
        }
        ref={selector}
        className={`selector--range selector--range--${type}`}
        id={`selector-${type}`}
      ></div>
      {fixedType ? (
        <label className="selector--value" style={{ left: `${position}%` }}>
          {type === "left" ? actualPosition.left : actualPosition.right}
        </label>
      ) : (
        <input
          onChange={(e) => canChangePosition(e)}
          onMouseDown={(e) => mouseDown(e, selector.current)}
          id={`input-${type}`}
          className="selector--value"
          value={
            type === "left"
              ? actualPosition.left || ""
              : actualPosition.right || ""
          }
          style={{ left: `${position}%` }}
        />
      )}
    </div>
  );
};

export default SelectorRange;
