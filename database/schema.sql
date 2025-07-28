CREATE DATABASE IF NOT EXISTS electric_car_data;
USE electric_car_data;

CREATE TABLE cars (
  id INT AUTO_INCREMENT PRIMARY KEY,
  Make VARCHAR(100),
  Model VARCHAR(100),
  Range_km INT,
  Battery_kWh FLOAT,
  Efficiency_WhPerKm FLOAT,
  Price_EUR INT
);
