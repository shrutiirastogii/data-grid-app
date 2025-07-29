import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import { db } from './db';

const filePath = path.join(__dirname, '../data/BMW_Aptitude_Test_Test_Data_ElectricCarData.csv');

fs.createReadStream(filePath)
  .pipe(csv())
  .on('data', (row) => {
    const Brand = row['Brand']?.trim() || null;
    const Model = row['Model']?.trim() || null;
    const AccelSec = parseFloat(row['AccelSec']) || null;
    const TopSpeed_KmH = parseInt(row['TopSpeed_KmH']) || null;
    const Range_Km = parseInt(row['Range_Km']) || null;
    const Efficiency_WhKm = parseInt(row['Efficiency_WhKm']) || null;
    const FastCharge_KmH = parseInt(row['FastCharge_KmH']) || null;
    const RapidCharge = row['RapidCharge']?.trim() || null;
    const PowerTrain = row['PowerTrain']?.trim() || null;
    const PlugType = row['PlugType']?.trim() || null;
    const BodyStyle = row['BodyStyle']?.trim() || null;
    const Segment = row['Segment']?.trim() || null;
    const Seats = parseInt(row['Seats']) || null;
    const PriceEuro = parseInt(row['PriceEuro']) || null;
    const Date = row['Date']?.trim() || null;

    if (Brand && Model) {
      db.query(
        `INSERT INTO cars (
          Brand, Model, AccelSec, TopSpeed_KmH, Range_Km, Efficiency_WhKm,
          FastCharge_KmH, RapidCharge, PowerTrain, PlugType,
          BodyStyle, Segment, Seats, PriceEuro, Date
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          Brand, Model, AccelSec, TopSpeed_KmH, Range_Km, Efficiency_WhKm,
          FastCharge_KmH, RapidCharge, PowerTrain, PlugType,
          BodyStyle, Segment, Seats, PriceEuro, Date
        ]
      );
    }
  })
  .on('end', () => {
    console.log('✅ CSV import complete!');
    db.end();
  });
