import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Range } from "../components";
import "./exercises.scss";

const Exercise1 = () => {

  const [priceData, setPriceData] = useState({ min: 1, max: 1 });

  const fetchData = async () => {
    const apiCall = await fetch("http://demo0922089.mockable.io/exercise1");
    const prices = await apiCall.json();
    setPriceData(prices.price);
  };

  useEffect(() => {
    fetchData();
  }, []);
 
  return (
    <div className="exercises">
      <h1>Normal Range</h1>
      <Range
        minPrice={priceData.min}
        maxPrice={priceData.max}
        fixedType={false}
      />
      <button className="exercises--btn">
        <Link to={"/"}>Menu</Link>
      </button>
    </div>
  );
};

export default Exercise1;
