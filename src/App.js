import { hot } from "react-hot-loader/root";
import React from "react";
import { Link } from "react-router-dom";
import "./main.scss";

const App = (props) => {
  return (
    <div>
      <h1>Range Component</h1>
      <button className="btn">
        <Link to={"/exercise1"}>Normal Range</Link>
      </button>
      <button disabled className="btn btn--disabled">
        <Link onClick={(e) => e.preventDefault()} to={"/exercise2"}>
          Fixed values range
        </Link>
      </button>
    </div>
  );
};

export default hot(App);
