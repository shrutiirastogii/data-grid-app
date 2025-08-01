import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import DataGridComponent from './components/DataGridComponent';
import CarDetailsPage from './pages/CarDetailPage';
import { useState } from 'react';

export default function App() {

  const [searchTerm,setSearchTerm] = useState('');

  return (
    <BrowserRouter>
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <main style={{ paddingTop: '80px' }}>
        <Routes>
          <Route path="/" element={<DataGridComponent searchTerm={searchTerm} />} />
          <Route path="/cars/:id" element={<CarDetailsPage />} />
        </Routes>
        </main>
    </BrowserRouter>
  );
}
