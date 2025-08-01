import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import axios from "axios";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import ActionsRenderer from "./ActionRenderer";
ModuleRegistry.registerModules([AllCommunityModule]);

interface DataGridComponentProps {
  searchTerm: string;
}

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

const DataGridComponent: React.FC<DataGridComponentProps> = () => {
  const [rowData, setRowData] = useState<Car[]>([]);

  const columnDefs: ColDef[] = [
    {
      headerName: "Car",
      field: "carName",
      headerTooltip: "Car Name",
      valueGetter: (params) =>
        `${params.data.Brand?.trim()} ${params.data.Model}`,
      headerStyle: { textAlign: "center" },
      cellStyle: {
        padding: "12px 8px",
        alignItems: "center",
        display: "flex",
        fontWeight: "bold",
        width: "100%",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        textAlign: "left",
      },
      pinned: true,
      width: 250,
      tooltipField: "Model",
    },
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
      cellStyle: {
        padding: "12px 8px",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        fontWeight: "bold",
      },
    },
  ];

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/cars")
      .then((res) => setRowData(res.data));
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.gridWrapper} className="ag-theme-alpine">
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          pagination
          paginationPageSize={15}
          rowHeight={40}
          headerHeight={50}
        />
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: "0 2rem",
    fontFamily: "sans-serif",
  },
  gridWrapper: {
    backgroundColor: "#ffffff",
    padding: "1rem",
    borderRadius: "15%",
    boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
    minHeight: "600px",
  },
};

export default DataGridComponent;
