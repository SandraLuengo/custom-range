import React from "react";
import { Link } from "react-router-dom";
import { Range, Loading } from "../components";
import useApi from "../hooks/useApi.js";
import "./exercises.scss";

const Exercise2 = () => {
  const { data, error } = useApi("http://demo0922089.mockable.io/exercise2");
  return (
    <div className="exercises">
      {error && <Redirect to="/error" />}
      <h1>Fixed values range</h1>
      <p>Working in progress... 🛠️🔧</p>
      {/* {data ?  <Range
        minPrice={data.min}
        maxPrice={data.max}
        priceArray={data.prices}
        fixedType={true}
      /> : <Loading/> } */}

      <Link className="exercises--btn" to={"/"}>
        Menu
      </Link>
    </div>
  );
};

export default Exercise2;
