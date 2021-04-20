import React, { useRef } from "react";
import "./selectorRange.scss";

const SelectorRange = ({
  type,
  position,
  maxValue,
  minValue,
  mouseDown,
  setState,
  state,
  actualPosition,
  changePosition
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
          type === "left" ? actualPosition?.left : actualPosition?.right
        }
        ref={selector}
        className={`selector--range selector--range--${type}`}
        id={`selector-${type}`}
      ></div>
      <input
        aria-label={`cost-input-${type}`}
        role="input"
        onChange={(e) => changePosition(e, setState, state, type, maxValue, minValue)}
        onMouseDown={(e) => mouseDown(e, selector.current)}
        id={`input-${type}`}
        className="selector--value"
        value={
          type === "left"
            ? actualPosition?.left || ""
            : actualPosition?.right || ""
        }
        style={{ left: `${position}%` }}
      />
    </div>
  );
};

export default SelectorRange;
