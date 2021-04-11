import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Range } from "../components";

const Exercise2 = () => {
  const [priceData, setPriceData] = useState({
    min: 1,
    max: 70.99,
    prices: [1.99, 5.99, 10.99, 30.99, 50.99, 70.99],
  });

  const fetchData = async () => {
    const apiCall = await fetch("http://demo0922089.mockable.io/exercise2");
    const prices = await apiCall.json();
    setPriceData(prices);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="exercises">
      Exercise1 - Min price 1
      <Range
        minPrice={priceData.min}
        maxPrice={priceData.max}
        priceArray={priceData.prices}
        fixedType={true}
      />
      <button className="exercises--btn">
        <Link to={"/"}>Menu</Link>
      </button>
    </div>
  );
};

export default Exercise2;
