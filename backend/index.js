import express from "express";
import mysql from "mysql";

const app = express();

const db = mysql.createConnection({
  host: "local",
  user: "root",
  password: "Davesburgers13!",
  //   database: "test", enter database name here
});

app.get("/", (req, res) => {
  res.json("hello this is the backend");
});

app.listen(8800, () => {
  console.log("Connected to backend!");
});
