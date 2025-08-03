import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import DataGridComponent from "./components/DataGridComponent";
import CarDetailsPage from "./pages/CarDetailPage";
import { useState } from "react";
import { Car } from "./types/car";
import FilterModal from "./components/FilterModal";

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchedRowData, setSearchedRowData] = useState<Car[]>([]);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filteredData, setFilteredData] = useState<Car[]>([]);

  return (
    <BrowserRouter>
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setSearchedRowData={setSearchedRowData}
        setIsFilterModalOpen={setIsFilterModalOpen}
      />
      <main style={{ paddingTop: "80px" }}>
        <Routes>
          <Route
            path="/"
            element={
              <DataGridComponent
                searchTerm={searchTerm}
                searchedRowData={searchedRowData}
                filteredData={filteredData}
              />
            }
          />
          <Route path="/cars/:id" element={<CarDetailsPage />} />
        </Routes>
        {isFilterModalOpen && (
          <FilterModal
            isOpen={isFilterModalOpen}
            onClose={() => setIsFilterModalOpen(false)}
            setFilteredData={setFilteredData}
            onApply={() => {
              setIsFilterModalOpen(false);
            }}
          />
        )}
      </main>
    </BrowserRouter>
  );
}
