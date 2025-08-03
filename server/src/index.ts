import express from "express";
import cors from "cors";
import { db } from "./db";

const app = express();
app.use(cors());
app.use(express.json());

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

app.delete("/api/cars/:id", async (req, res) => {
  const { id } = req.params;

  try {
    db.query("DELETE FROM cars WHERE id = ?", [id], (err, result: any) => {
      if (err) {
        console.error("Error deleting car:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Car not found" });
      }

      res.json({ message: "Car deleted successfully" });
    });
    return;
  } catch (err) {
    console.error("Error deleting car:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(5000, () => console.log("Backend running on http://localhost:5000"));
