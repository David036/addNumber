const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const data = require("./data.json");
const numbers = data.data;

app.get("/numbers", (req, res) => res.json(numbers));

app.post("/numbers", (req, res) => {
  numbers.push(req.body);
  res.json(req.body);
});

app.listen(3000, () => console.log("Listening on port 3000..."));
