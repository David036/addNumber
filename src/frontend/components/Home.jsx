import React from "react";
import { useState } from "react";
import axios from "axios";

import "./style.scss";

export default function Home() {
  const [numbers, setNumbers] = useState();
  const [number, setNumber] = useState("");

  const handleClick = async () => {
    if (number !== "") {
      try {
        await axios
          .post("http://localhost:3000/numbers", {
            id: number,
          })
          .then(setNumbers(numbers, { id: number }))
          .then(setNumber(""));
      } catch (err) {
        console.log(err);
      }
    }
  };

  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/numbers");
      setNumbers(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  getData();

  return (
    <div className="home">
      <input
        type="number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      ></input>
      <button onClick={handleClick}>Add</button>
      <div className="numbers">
        {numbers?.map((el) => {
          return <span>{el.id}</span>;
        })}
      </div>
    </div>
  );
}
