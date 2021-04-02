import React from "react";
import { Link } from "react-router-dom";
import { Range } from "../components";
import "./exercises.scss";

const Exercise1 = () => {
  return (
    <div className="exercises">
      Exercise1
      <Range min={0} max={200} selectorWidth={10}/>
      <button>
        <Link to={"/"}>Home</Link>
      </button>
    </div>
  );
};

export default Exercise1;
