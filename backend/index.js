import express from "express";
import mysql from "mysql2";
import cors from "cors"

const app = express();
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Davesburgers13!",
  database: "casino"
  //   database: "test", enter database name here
});

app.get("/", (req, res) => {
  res.json("hello this is the backend");
});

app.get("/player", (req, res) => {
  const q = "SELECT * FROM player";
  db.query(q, (err, data) => {
    if (err) {
      console.error("Query Error:", err); // Log detailed error
      return res.status(500).json({ error: "Database query failed", details: err });
    }
    return res.json(data);
  });
});

app.post("/player", (req,res)=>{
  const q = "INSERT INTO player ('Player_ID','Phone','Birth_Date','Total_Winnings','Machine_Winnings') VALUES (?)"
  const values = ["2","5874360788","20030721","10000.69","0.69",]

  db.query(q, [values], (err,data)=>{
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.listen(8800, () => {
  console.log("Connected to backend!");
});
