import React from "react";
import { Link } from "react-router-dom";
import { Range } from "../components";

const Exercise2 = () => {
  let prices = [1.99, 5.99, 10.99, 30.99, 50.99, 70.99];
  let min = prices[0];
  let max = prices[prices.length-1];
  return (
    <div className="exercises">
      Exercise1 - Min price 1
      <Range minPrice={min} maxPrice={max} fixedType={true} />
      <button>
        <Link to={"/"}>Home</Link>
      </button>
    </div>
  );
};

export default Exercise2;
