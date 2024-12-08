import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Davesburgers13!",
  database: "casino",
});

app.use(express.json());

app.get("/", (req, res) => {
  res.json("hello this is the backend");
});

app.get("/player", (req, res) => {
  const q = "SELECT * FROM player";
  db.query(q, (err, data) => {
    if (err) {
      console.error("Query Error:", err); // Log detailed error
      return res
        .status(500)
        .json({ error: "Database query failed", details: err });
    }
    return res.json(data);
  });
});

app.post("/player", (req, res) => {
  const q =
    "INSERT INTO player (`Player_ID`,`Phone`,`Birth_Date`,`Total_Winnings`,`Machine_Winnings`) VALUES (?)";
  const values = [
    req.body.Player_ID,
    req.body.Phone,
    req.body.Birth_Date,
    req.body.Total_Winnings,
    req.body.Machine_Winnings,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("inserted player");
  });
});

app.get("/hand_info", (req, res) => {
  const q = `
    SELECT 
      casino, 
      table_id, 
      game, 
      amount_bet, 
      amount_won_loss, 
      dealer_id, 
      DATE_FORMAT(date, '%Y-%m-%d') AS date
    FROM hand_info
  `;
  db.query(q, (err, data) => {
    if (err) {
      console.error("Query Error:", err); // Log detailed error
      return res
        .status(500)
        .json({ error: "Database query failed", details: err });
    }
    return res.json(data);
  });
});

app.post("/hand_info", (req, res) => {
  const q =
    "INSERT INTO hand_info (`casino`,`table_id`,`game`,`amount_bet`,`amount_won_loss`,`dealer_id`,`date`) VALUES (?)";
  const values = [
    req.body.casino,
    req.body.table_id,
    req.body.game,
    req.body.amount_bet,
    req.body.amount_won_loss,
    req.body.dealer_id,
    req.body.date,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("inserted hand info");
  });
});

// Pagination logic for fetching transactions
app.get("/tracker", (req, res) => {
  const page = parseInt(req.query.page) || 1; // Default to page 1
  const limit = 4; // Set the limit to 4 entries per page
  const offset = (page - 1) * limit; // Calculate the offset based on the current page

  const query = `
    SELECT 
      Id, 
      Casino_name, 
      Description, 
      Amount, 
      DATE_FORMAT(Date, '%Y-%m-%d') AS Date 
    FROM tracker 
    ORDER BY Date DESC 
    LIMIT ${limit} OFFSET ${offset}
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching transactions:", err);
      res.status(500).send("Error fetching transactions");
    } else {
      // Get the total number of transactions for pagination
      const countQuery = "SELECT COUNT(*) AS total FROM tracker";
      db.query(countQuery, (err, countResult) => {
        if (err) {
          console.error("Error fetching total transactions count:", err);
          res.status(500).send("Error fetching total transactions count");
        } else {
          const totalTransactions = countResult[0].total;
          const totalPages = Math.ceil(totalTransactions / limit);

          res.json({
            data: results,
            currentPage: page,
            totalPages,
            totalTransactions,
          });
        }
      });
    }
  });
});

app.post("/tracker", (req, res) => {
  const { Casino_name, Description, Amount, Date } = req.body;
  const query =
    "INSERT INTO tracker (Casino_name, Description, Amount, Date) VALUES (?, ?, ?, ?)";
  db.query(query, [Casino_name, Description, Amount, Date], (err, results) => {
    if (err) {
      console.error("Error inserting transaction:", err);
      res.status(500).send("Error saving transaction");
    } else {
      res.status(201).json({
        message: "Transaction saved successfully",
        id: results.insertId,
      });
    }
  });
});

// Summary data for tracker
app.get("/tracker/summary", (req, res) => {
  const q = `
    SELECT
      (SELECT Casino_name FROM tracker GROUP BY Casino_name ORDER BY COUNT(*) DESC LIMIT 1) AS most_visited_casino,
      (SELECT Description FROM tracker GROUP BY Description ORDER BY COUNT(*) DESC LIMIT 1) AS most_played_game,
      COALESCE(SUM(CASE WHEN Amount > 0 THEN Amount ELSE 0 END), 0) AS total_won,
      COALESCE(SUM(CASE WHEN Amount < 0 THEN Amount ELSE 0 END), 0) AS total_lost
    FROM tracker
  `;

  db.query(q, (err, data) => {
    if (err) {
      console.error("Error fetching summary data:", err);
      return res
        .status(500)
        .json({ error: "Database query failed", details: err });
    }
    res.json(data[0]);
  });
});

app.listen(8800, () => {
  console.log("Connected to backend!");
});
