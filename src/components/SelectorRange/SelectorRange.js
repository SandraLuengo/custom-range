import React, { useRef, useEffect } from "react";
import "./selectorRange.scss";

const SelectorRange = ({
  type,
  selectorFunction,
  position,
  maxValue,
  minValue,
  actualValue,
}) => {
  const selector = useRef(null);
  useEffect(() => {
    selectorFunction(selector);
  });
  return (
    <div
      style={{ left: `${position}%` }}
      max-value={maxValue}
      min-value={minValue}
      actual-value={actualValue}
      ref={selector}
      className={`selector-range selector-range--${type}`}
      id={`selector-${type}`}
    ></div>
  );
};

export default SelectorRange;
