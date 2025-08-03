import express from "express";
import cors from "cors";
import { db } from "./db";
import { Request, Response } from "express";
import { ParsedQs } from "qs";

const app = express();
app.use(cors());
app.use(express.json());

// get all cars
app.get("/api/cars", (req, res) => {
  db.query("SELECT * FROM cars", (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result);
  });
});

// get car by id
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

// search cars by keyword
app.get("/api/cars/search/:keyword", (req, res) => {
  const keyword = req.params.keyword.trim().toLowerCase();

  const sql = `
    SELECT * 
    FROM cars 
    WHERE LOWER(CONCAT(Brand, ' ', Model)) LIKE ?
  `;

  const searchPattern = keyword + "%";

  db.query(sql, [searchPattern], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    if (!Array.isArray(results) || results.length === 0) {
      return res.status(404).json({ error: "Car not found" });
    }

    res.json(results);
  });
});

// delete car by id
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

//filter based on multiple criteria
app.get(
  "/api/filtercars/filter",
  (
    req: Request<{}, any, any, Record<string, ParsedQs | string | string[]>>,
    res: Response
  ) => {
    const columnTypes: Record<string, "number" | "string"> = {
      Range_Km: "number",
      TopSpeed_KmH: "number",
      AccelSec: "number",
      FastCharge_KmH: "number",
      Efficiency_WhKm: "number",
      RapidCharge: "string",
      PowerTrain: "string",
      PlugType: "string",
      BodyStyle: "string",
      Segment: "string",
      Seats: "number",
      PriceEuro: "number",
    };

    const sqlOps = {
      equals: (col: string) => `${col} = ?`,
      contains: (col: string) => `${col} LIKE ?`,
      startsWith: (col: string) => `${col} LIKE ?`,
      endsWith: (col: string) => `${col} LIKE ?`,
      isEmpty: (col: string) => `(${col} IS NULL OR ${col} = '')`,
      gt: (col: string) => `${col} > ?`,
      lt: (col: string) => `${col} < ?`,
    } as const;

    type Operator = keyof typeof sqlOps;

    const whereClauses: string[] = [];
    const params: (string | number)[] = [];

    for (const [key, rawValue] of Object.entries(req.query)) {
      const idx = key.lastIndexOf("_");
      if (idx === -1) {
        return res.status(400).json({ error: `Invalid filter: ${key}` });
      }

      const column = key.slice(0, idx);
      const operator = key.slice(idx + 1) as Operator;

      // 3) validate column & operator
      const colType = columnTypes[column];
      if (!colType || !sqlOps[operator]) {
        return res.status(400).json({ error: `Invalid filter: ${key}` });
      }

      // 4) ban gt/lt on strings
      if (colType === "string" && (operator === "gt" || operator === "lt")) {
        return res
          .status(400)
          .json({ error: `Operator "${operator}" not allowed on "${column}"` });
      }

      // normalize to a single string
      if (rawValue === undefined) {
        return res
          .status(400)
          .json({ error: `Missing value for filter: ${key}` });
      }
      const maybeArr = Array.isArray(rawValue) ? rawValue[0] : rawValue;
      if (typeof maybeArr !== "string") {
        return res
          .status(400)
          .json({ error: `Invalid value for filter: ${key}` });
      }
      const value = maybeArr;

      // build clause + param
      whereClauses.push(sqlOps[operator](column));
      if (operator === "isEmpty") continue;

      switch (operator) {
        case "contains":
          params.push(`%${value}%`);
          break;
        case "startsWith":
          params.push(`${value}%`);
          break;
        case "endsWith":
          params.push(`%${value}`);
          break;
        case "equals":
          if (colType === "number") {
            const n = Number(value);
            if (isNaN(n)) {
              return res
                .status(400)
                .json({ error: `Filter ${key} expects a numeric value` });
            }
            params.push(n);
          } else {
            params.push(value);
          }
          break;
        case "gt":
        case "lt":
          const n = Number(value);
          if (isNaN(n)) {
            return res
              .status(400)
              .json({ error: `Filter ${key} expects a numeric value` });
          }
          params.push(n);
          break;
      }
    }

    let sql = "SELECT * FROM cars";
    if (whereClauses.length) {
      sql += " WHERE " + whereClauses.join(" AND ");
    }

    console.log("Final SQL:", sql);
    console.log("With params:", params);

    db.query(sql, params, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    });
  }
);

app.listen(5000, () => console.log("Backend running on http://localhost:5000"));
