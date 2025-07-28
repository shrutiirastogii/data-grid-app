# React DataGrid App with Express API and MySQL

A full-stack web application that displays tabular data using AG Grid in React. The backend is built with Express (TypeScript), and data is stored in a MySQL database. The app supports search, filtering, and a detail view per entry.

---

## 🚀 Tech Stack

- **Frontend**: React (TypeScript), AG Grid, Material UI
- **Backend**: Express.js (TypeScript)
- **Database**: MySQL

---

## 📁 Project Structure

```bash
data-grid-app/
├── client/                # React frontend
├── server/                # Express backend
├── database/              # SQL schema and CSV import
└── README.md              # This file
```

---

## ✅ Features

- 📊 Generic AG Grid to display any tabular data
- 🔍 Server-side search and filtering
- 👁️ Row-based detail view
- 🧱 MySQL database integration
- 💅 MUI for clean styling

---

## 🧠 Setup Instructions

Follow these steps to get the project running locally:

---

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/shrutiirastogii/data-grid-app.git
cd data-grid-app
```

---

### 2️⃣ Setup MySQL Database

#### 📄 Step 1: Create the schema

Open `database/schema.sql` in MySQL Workbench or terminal and run:

```sql
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
```

#### 📄 Step 2: Import CSV data (optional)

You can import the CSV file manually into the `cars` table using:
- MySQL Workbench's **Table Data Import Wizard**
- Or a custom script in `/server/src/importCsv.ts`

---

### 3️⃣ Setup the Backend (Express + TypeScript)

```bash
cd server
npm install
npx tsc          
node dist/index.js
```

#### 🔑 Environment Variables

Create a `.env` file in `/server`:

```
DB_HOST=localhost
DB_USER=root
DB_PASS=your_mysql_password
DB_NAME=electric_car_data
```

> Make sure the MySQL credentials match your local installation.

---

### 4️⃣ Setup the Frontend (React + TypeScript)

```bash
cd ../client
npm install
npm start
```

The frontend will start at:  
➡️ `http://localhost:3000`

---

## 📷 Screenshots

---

## 🛠️ Optional Enhancements

- Add CSV import from UI
- Add column filtering in frontend
- Add pagination on backend
- Dockerize the project for deployment

---

## 📬 Contact

**Author**: Shruti Rastogi
**Email**: shruti.rastogi2501@gmail.com
**GitHub**: [@shrutiirastogii](https://github.com/shrutiirastogii)  
**LinkedIn**: [Shruti Rastogi](https://www.linkedin.com/in/shruti-rastogii/)

---

## 🏁 Status

✅ MVP functional | 🚧 Enhancements in progress | 📦 Preparing for deployment
