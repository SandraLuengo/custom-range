import React from "react";
import { Link } from "react-router-dom";
import { Range } from "../components";

const Exercise1 = () => {
  return (
    <div>
      Exercise1
      <Range/>
      <button>
        <Link to={"/"}>Home</Link>
      </button>
    </div>
  );
};

export default Exercise1;
