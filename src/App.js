import { hot } from "react-hot-loader/root";
import React from "react";
import { Link } from "react-router-dom";
import "./main.scss";

const App = () => {
  return (
    <div className="home">
      <div className="home--content">
        <h1>Range Component</h1>
        <div data-testid="app">
          <Link to={"/exercise1"}>Normal Range</Link>
        </div>
      </div>
      {/* <div>
        <button className="btn">
          <Link to={"/exercise2"}>Fixed values range 🛠️</Link>
        </button>
      </div> */}
    </div>
  );
};

export default hot(App);
