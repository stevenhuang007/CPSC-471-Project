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

app.use(express.json())

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
  const q = "INSERT INTO player (`Player_ID`,`Phone`,`Birth_Date`,`Total_Winnings`,`Machine_Winnings`) VALUES (?)"
  const values = [
    req.body.Player_ID,
    req.body.Phone,
    req.body.Birth_Date,
    req.body.Total_Winnings,
    req.body.Machine_Winnings,
  ]

  db.query(q, [values], (err,data)=>{
    if (err) return res.json(err);
    return res.json("inserted player");
  });
});

app.get("/hand_info", (req, res) => {
  const q = "SELECT * FROM hand_info";
  db.query(q, (err, data) => {
    if (err) {
      console.error("Query Error:", err); // Log detailed error
      return res.status(500).json({ error: "Database query failed", details: err });
    }
    return res.json(data);
  });
});

app.get("/hand_info", (req, res) => {
  const q = "SELECT * FROM hand_info";
  db.query(q, (err, data) => {
    if (err) {
      console.error("Query Error:", err); // Log detailed error
      return res.status(500).json({ error: "Database query failed", details: err });
    }
    return res.json(data);
  });
});

app.post("/hand_info", (req,res)=>{
  const q = "INSERT INTO hand_info (`casino`,`table_id`,`game`,`amount_bet`,`amount_won_loss`,`dealer_id`,`date`) VALUES (?)"
  const values = [
    req.body.casino,
    req.body.table_id,
    req.body.game,
    req.body.amount_bet,
    req.body.amount_won_loss,
    req.body.dealer_id,
    req.body.date,
  ]

  db.query(q, [values], (err,data)=>{
    if (err) return res.json(err);
    return res.json("inserted hand info");
  });
});

app.listen(8800, () => {
  console.log("Connected to backend!");
});
