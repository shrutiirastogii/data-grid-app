import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import axios from "axios";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import { ModuleRegistry } from "ag-grid-community";
import { AllCommunityModule } from "ag-grid-community";
import ActionsRenderer from "./ActionRenderer";
ModuleRegistry.registerModules([AllCommunityModule]);

interface Car {
  id: number;
  Brand: string;
  Model: string;
  AccelSec: number;
  TopSpeed_KmH: number;
  Range_Km: number;
  Efficiency_WhKm: number;
  FastCharge_KmH: number;
  RapidCharge: string;
  PowerTrain: string;
  PlugType: string;
  BodyStyle: string;
  Segment: string;
  Seats: number;
  PriceEuro: number;
  Date: string;
}

export default function DataGridComponent() {
  const [rowData, setRowData] = useState<Car[]>([]);

  const columnDefs: ColDef[] = [
    { field: "Brand", headerName: "Brand", width: 150, pinned: "left" },
    { field: "Model", headerName: "Model", width: 150, pinned: "left" },
    { field: "AccelSec", headerName: "Acceleration (sec)" },
    { field: "TopSpeed_KmH", headerName: "Top Speed (Km/h)" },
    { field: "Range_Km", headerName: "Range (Km)" },
    { field: "Efficiency_WhKm", headerName: "Efficiency (Wh/Km)" },
    { field: "FastCharge_KmH", headerName: "Fast Charge (Km/h)" },
    { field: "RapidCharge", headerName: "Rapid Charge" },
    { field: "PowerTrain", headerName: "Power Train" },
    { field: "PlugType", headerName: "Plug Type" },
    { field: "BodyStyle", headerName: "Body Style" },
    { field: "Segment", headerName: "Segment" },
    { field: "Seats", headerName: "Seats" },
    { field: "PriceEuro", headerName: "Price (Euro)" },
    { field: "Date", headerName: "Date" },
    {
      field: "Actions",
      headerName: "Actions",
      width: 150,
      pinned: "right",
      cellRenderer: ActionsRenderer,
    },
  ];

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/cars")
      .then((res) => setRowData(res.data));
    console.log("Data fetched from server:", rowData);
  }, []);

  return (
    <div className="ag-theme-alpine" style={{ height: 600 }}>
      <AgGridReact rowData={rowData} columnDefs={columnDefs} pagination />
    </div>
  );
}
