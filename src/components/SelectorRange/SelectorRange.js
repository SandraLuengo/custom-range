import React, { useRef } from "react";
import "./selectorRange.scss";

const SelectorRange = ({
  type,
  position,
  maxValue,
  minValue,
  actualValue,
  mouseDown,
  changePrice,
  fixedType,
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
      {fixedType ? (
        <label className="selector--value" style={{ left: `${position}%` }}>
          {actualValue || ""}
        </label>
      ) : (
        <input
          onChange={changePrice}
          onMouseDown={(e) => mouseDown(e, selector.current)}
          id={`input-${type}`}
          className="selector--value"
          value={actualValue || ""}
          style={{ left: `${position}%` }}
        />
      )}
    </div>
  );
};

export default SelectorRange;
