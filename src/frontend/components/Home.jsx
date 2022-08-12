import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import "./style.scss";

export default function Home() {
  const [numbers, setNumbers] = useState();
  const [number, setNumber] = useState("");

  const handleClick = () => {
    if (number !== "") {
      axios
        .post("http://localhost:3000/numbers", {
          id: number,
        })
        .then(setNumbers(numbers, { id: number }))
        .then(setNumber(""))
        .then(setNumbers([...numbers, { id: number }]));
    }
  };

  useEffect(() => {
    axios("http://localhost:3000/numbers", {
      method: "GET",
    }).then((response) => {
      setNumbers(response.data);
    });
  }, []);

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
          return <div>{el.id}</div>;
        })}
      </div>
    </div>
  );
}
