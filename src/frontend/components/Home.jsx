import React from "react";
import { useState } from "react";
import axios from "axios";

import "./style.scss";
import { useEffect } from "react";

export default function Home() {
  const [numbers, setNumbers] = useState([]);
  const [number, setNumber] = useState("");

  const handleClick = async () => {
    if (number !== "") {
      try {
        await axios.post("http://localhost:3000/numbers", number);
        setNumbers([...numbers, number]);
        setNumber("");
      } catch (err) {
        console.log(err);
      }
    }
  };

  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/numbers");
      setNumbers([...response?.data]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
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
        {numbers?.map((el, index) => {
          return <div key={index}>{el}</div>;
        })}
      </div>
    </div>
  );
}
