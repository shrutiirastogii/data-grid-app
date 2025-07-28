import { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ColDef } from 'ag-grid-community';
import axios from 'axios';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import { ModuleRegistry } from 'ag-grid-community';
import { AllCommunityModule } from 'ag-grid-community';
ModuleRegistry.registerModules([AllCommunityModule]);

interface Car {
  id: number;
  Make: string;
  Model: string;
  Range_km: number;
  Battery_kWh: number;
  Efficiency_WhPerKm: number;
  Price_EUR: number;
}

export default function DataGridComponent() {
  const [rowData, setRowData] = useState<Car[]>([]);

  const columnDefs: ColDef[] = [
    { field: 'Make' }, { field: 'Model' }, { field: 'Range_km' },
    { field: 'Battery_kWh' }, { field: 'Efficiency_WhPerKm' }, { field: 'Price_EUR' }
  ];

  useEffect(() => {
    axios.get('http://localhost:5000/api/cars').then(res => setRowData(res.data));
    console.log('Data fetched from server:', rowData);
  }, []);

  return (
    <div className="ag-theme-alpine" style={{ height: 600 }}>
      <AgGridReact rowData={rowData} columnDefs={columnDefs} pagination />
    </div>
  );
}
