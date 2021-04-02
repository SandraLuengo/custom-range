import React, { useRef, useEffect } from "react";
import "./selectorRange.scss";

const SelectorRange = ({ type, value, selectorFunction }) => {
  const selector = useRef(null);
  useEffect(() => {
    selectorFunction(selector);
  })
  return <div ref={selector} className={`selector-range selector-range--${type}`}></div>;
};

export default SelectorRange;
