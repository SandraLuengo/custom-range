import React, { useRef } from "react";
import changePosition from "../../utils/selectorFunctions.js";
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
          onChange={(e) => changePosition(e, setState, state, type)}
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
