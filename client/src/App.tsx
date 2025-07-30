import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import DataGridComponent from './components/DataGridComponent';
import CarDetailsPage from './pages/CarDetailPage';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <main style={{ paddingTop: '80px' }}>
        <Routes>
          <Route path="/" element={<DataGridComponent />} />
          <Route path="/cars/:id" element={<CarDetailsPage />} />
        </Routes>
        </main>
    </BrowserRouter>
  );
}
