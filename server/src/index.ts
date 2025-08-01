import express from "express";
import cors from "cors";
import { db } from "./db";

const app = express();
app.use(cors());

app.get("/api/cars", (req, res) => {
  db.query("SELECT * FROM cars", (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result);
  });
});

app.get("/api/cars/:id", (req, res) => {
  const id = req.params.id;

  db.query("SELECT * FROM cars WHERE id = ?", [id], (err, results: any) => {
    if (err) return res.status(500).json({ error: err.message });

    if (!Array.isArray(results) || results.length === 0) {
      return res.status(404).json({ error: "Car not found" });
    }

    res.json(results[0]);
  });
});

app.listen(5000, () => console.log("Backend running on http://localhost:5000"));
