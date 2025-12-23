const express = require("express");
const { Pool } = require("pg");

const app = express();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.send("Backend + DB connected at " + result.rows[0].now);
  } catch (err) {
    console.error(err);
    res.status(500).send("DB connection failed");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
