import React from "react";
import { Link } from "react-router-dom";
import { Range } from "../components";
import "./exercises.scss";

const Exercise1 = () => {
  return (
    <div className="exercises">
      Exercise1 - Min price 1
      <Range minPrice={1} maxPrice={30}  fixedType={false}  />
      <button>
        <Link to={"/"}>Home</Link>
      </button>
    </div>
  );
};

export default Exercise1;
