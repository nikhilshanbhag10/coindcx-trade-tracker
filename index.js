const express = require("express");
const { Pool } = require("pg");

const app = express();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

app.get("/", async (req, res) => {
  try {
    await pool.query("SELECT 1");
    res.send("DB OK");
  } catch (err) {
    console.error("DB ERROR:", err);
    res.status(500).send(err.message);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
