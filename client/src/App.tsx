import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import DataGridComponent from "./components/DataGridComponent";
import CarDetailsPage from "./pages/CarDetailPage";
import { useState } from "react";
import { Car } from "./types/car";

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchedRowData, setSearchedRowData] = useState<Car[]>([]);

  return (
    <BrowserRouter>
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setSearchedRowData={setSearchedRowData}
      />
      <main style={{ paddingTop: "80px" }}>
        <Routes>
          <Route
            path="/"
            element={
              <DataGridComponent
                searchTerm={searchTerm}
                searchedRowData={searchedRowData}
              />
            }
          />
          <Route path="/cars/:id" element={<CarDetailsPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
