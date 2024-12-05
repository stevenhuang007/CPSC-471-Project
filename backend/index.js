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

app.listen(8800, () => {
  console.log("Connected to backend!");
});
