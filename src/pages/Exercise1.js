import React from "react";
import { Link, Redirect } from "react-router-dom";
import { Range, Loading } from "../components";
import useApi from "../hooks/useApi.js"
import "./exercises.scss";

const Exercise1 = () => {

  const { data, error } = useApi("http://demo0922089.mockable.io/exercise1");
 
  return (
    <div className="exercises">
      {error && <Redirect to="/error"/>}
      <h1>Normal Range</h1>
      {data.price ?  <Range
        minPrice={data.price.min}
        maxPrice={data.price.max}
        fixedType={false}
      /> : <Loading/>} 
      <button className="exercises--btn">
        <Link to={"/"}>Menu</Link>
      </button>
    </div>
  );
};

export default Exercise1;
