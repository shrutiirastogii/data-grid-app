import express from 'express';
import cors from 'cors';
import { db } from './db';

const app = express();
app.use(cors());

app.get('/api/cars', (req, res) => {
  db.query('SELECT * FROM cars', (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result);
  });
});

app.listen(5000, () => console.log('Backend running on http://localhost:5000'));
