import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import axios from "axios";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import { ModuleRegistry } from "ag-grid-community";
import { AllCommunityModule } from "ag-grid-community";
import ActionsRenderer from "./ActionRenderer";
import { Car } from "../types/car";
import { COLORS } from "../styles/colors";
ModuleRegistry.registerModules([AllCommunityModule]);

interface DataGridComponentProps {
  searchTerm: string;
  searchedRowData?: Car[];
  filteredData?: Car[];
}

const DataGridComponent: React.FC<DataGridComponentProps> = ({
  searchTerm,
  searchedRowData,
  filteredData,
}) => {
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
        fontWeight: "500",
        width: "100%",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        textAlign: "left",
        flex: "1 1 0",
        minWidth: 0,
      },
      pinned: true,
      width: 250,
      tooltipField: "Car",
      flex: 1,
      minWidth: 100,
    },
    {
      field: "AccelSec",
      headerName: "Acceleration (sec)",
      cellStyle: { ...styles.cellStyle },
    },
    {
      field: "TopSpeed_KmH",
      headerName: "Top Speed (Km/h)",
      cellStyle: { ...styles.cellStyle },
    },
    {
      field: "Range_Km",
      headerName: "Range (Km)",
      cellStyle: { ...styles.cellStyle },
    },
    {
      field: "Efficiency_WhKm",
      headerName: "Efficiency (Wh/Km)",
      cellStyle: { ...styles.cellStyle },
    },
    {
      field: "FastCharge_KmH",
      headerName: "Fast Charge (Km/h)",
      cellStyle: { ...styles.cellStyle },
    },
    {
      field: "RapidCharge",
      headerName: "Rapid Charge",
      cellStyle: { ...styles.cellStyle },
    },
    {
      field: "PowerTrain",
      headerName: "Power Train",
      cellStyle: { ...styles.cellStyle },
    },
    {
      field: "PlugType",
      headerName: "Plug Type",
      cellStyle: { ...styles.cellStyle },
    },
    {
      field: "BodyStyle",
      headerName: "Body Style",
      cellStyle: { ...styles.cellStyle },
    },
    {
      field: "Segment",
      headerName: "Segment",
      cellStyle: { ...styles.cellStyle },
    },
    { field: "Seats", headerName: "Seats", cellStyle: { ...styles.cellStyle } },
    {
      field: "PriceEuro",
      headerName: "Price (Euro)",
      cellStyle: { ...styles.cellStyle },
    },
    { field: "Date", headerName: "Date", cellStyle: { ...styles.cellStyle } },
    {
      field: "Actions",
      headerName: "Actions",
      width: 150,
      pinned: "right",
      cellRenderer: (params: any) => (
        <ActionsRenderer data={params.data} refreshData={fetchData} />
      ),
      cellStyle: {
        padding: "12px 8px",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        fontWeight: "bold",
      },
    },
  ];

  const fetchData = () => {
    axios
      .get("http://localhost:5000/api/cars")
      .then((res) => setRowData(res.data));
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setRowData(searchedRowData || []);
  }, [searchedRowData]);

  useEffect(() => {
    if (filteredData) {
      setRowData(filteredData);
    }
  }, [filteredData]);

  return (
    <div style={styles.container}>
      <div style={styles.gridWrapper} className="ag-theme-alpine">
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          pagination
          paginationPageSize={20}
          domLayout="autoHeight"
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
    backgroundColor: COLORS.white,
    padding: "1rem",
    borderRadius: "15%",
    boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
    minHeight: "600px",
  },
  cellStyle: {
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
  },
};

export default DataGridComponent;
