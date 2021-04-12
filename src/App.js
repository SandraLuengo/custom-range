import { hot } from "react-hot-loader/root";
import React from "react";
import { Link } from "react-router-dom";
import "./main.scss";

const App = () => {
  return (
    <div className="home">
      <h1>Range Component</h1>
      <div data-testid='app'>
        <button className="btn">
          <Link to={"/exercise1"}>Normal Range</Link>
        </button>
      </div>
      <div>
        <button className="btn">
          <Link to={"/exercise2"}>Fixed values range</Link>
        </button>
      </div>
    </div>
  );
};

export default hot(App);
