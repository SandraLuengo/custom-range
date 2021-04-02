import { hot } from "react-hot-loader/root";
import React from "react";
import { Link } from "react-router-dom";
import "./main.css";

const App = (props) => {
  return (
    <div>
      <p>Mango Outlet - Sngular</p>
      <button>
        <Link to={"/exercise1"}>Exercise 1</Link>
      </button>
      <button>
        <Link to={"/exercise2"}>Exercise 2</Link>
      </button>
    </div>
  );
};

export default hot(App);
