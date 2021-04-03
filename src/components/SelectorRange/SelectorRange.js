import React, { useRef } from "react";
import "./selectorRange.scss";

const SelectorRange = ({
  type,
  position,
  maxValue,
  minValue,
  actualValue,
  mouseDown,
}) => {
  const selector = useRef(null);

  return (
    <div className="selector">
      <div
        onMouseDown={(e) => mouseDown(e, selector.current)}
        style={{ left: `${position}%` }}
        max-value={maxValue}
        min-value={minValue}
        actual-value={actualValue}
        ref={selector}
        className={`selector--range selector--range--${type}`}
        id={`selector-${type}`}
      ></div>
      <input
        className="selector--value"
        value={actualValue}
        style={{ left: `${position}%` }}
      />
    </div>
  );
};

export default SelectorRange;
