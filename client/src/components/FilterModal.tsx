import * as React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { Car } from "../types/car";
import axios from "axios";
import Header from "./Header";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: Record<string, string>) => void;
  setFilteredData: (term: Car[]) => void;
}

type NumOp = "equals" | "gt" | "lt";
type StrOp = "equals" | "contains" | "startsWith" | "endsWith" | "isEmpty";

const columnTypes: Record<keyof Car, "number" | "string"> = {
  id: "number",
  Brand: "string",
  Model: "string",
  AccelSec: "number",
  TopSpeed_KmH: "number",
  Range_Km: "number",
  Efficiency_WhKm: "number",
  FastCharge_KmH: "number",
  RapidCharge: "string",
  PowerTrain: "string",
  PlugType: "string",
  BodyStyle: "string",
  Segment: "string",
  Seats: "number",
  PriceEuro: "number",
  Date: "string",
};

const numericOps: { label: string; value: NumOp }[] = [
  { label: "=", value: "equals" },
  { label: ">", value: "gt" },
  { label: "<", value: "lt" },
];

const stringOps: { label: string; value: StrOp }[] = [
  { label: "contains", value: "contains" },
  { label: "equals", value: "equals" },
  { label: "is empty", value: "isEmpty" },
];

const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onClose,
  onApply,
  setFilteredData,
}) => {
  const fields = React.useMemo(
    () =>
      (Object.keys(columnTypes) as (keyof Car)[]).filter(
        (field) =>
          field !== "id" &&
          field !== "Date" &&
          field !== "Model" &&
          field !== "Brand"
      ),
    []
  );

  const initialFilters = React.useMemo(() => {
    const obj: Record<keyof Car, { op: NumOp | StrOp; value: string }> =
      {} as any;
    fields.forEach((key) => {
      obj[key] = {
        op: columnTypes[key] === "number" ? "equals" : "contains",
        value: "",
      };
    });
    return obj;
  }, [fields]);

  const [filters, setFilters] = React.useState(initialFilters);

  const handleFieldChange = (
    field: keyof Car,
    op: NumOp | StrOp,
    value: string
  ) => {
    setFilters((prev) => ({
      ...prev,
      [field]: { op, value },
    }));
  };

  const handleApply = () => {
    const params: Record<string, string> = {};
    (
      Object.entries(filters) as [keyof Car, { op: string; value: string }][]
    ).forEach(([field, { op, value }]) => {
      if (op === "isEmpty" || value.trim() !== "") {
        params[`${field}_${op}`] = value;
      }
    });

    const queryString = new URLSearchParams(params).toString();

    const url = `http://localhost:5000/api/filtercars/filter?${queryString}`;
    axios
      .get(url)
      .then((response) => {
        console.log("Filter results:", response.data);
        setFilteredData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching filtered data:", error);
      });
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={onClose} aria-labelledby="filter-modal-title">
      <Box sx={styles.container}>
        <Box sx={styles.headerContainer}>
          <Typography style={styles.header}>Filter Cars</Typography>
          <Button onClick={onClose}>
            <span style={styles.closeButton}>&times;</span>
          </Button>
        </Box>
        <Grid container spacing={2}>
          {fields
            .filter((field) => columnTypes[field] === "string")
            .map((field) => (
              <Box
                sx={{
                  flex: "1 1 calc(50% - 16px)",
                  minWidth: 0,
                }}
              >
                <FormControl fullWidth size="small">
                  <InputLabel>{field}</InputLabel>
                  <Select
                    label={field}
                    value={filters[field].op}
                    onChange={(e) =>
                      handleFieldChange(
                        field,
                        e.target.value as StrOp,
                        filters[field].value
                      )
                    }
                  >
                    {stringOps.map((op) => (
                      <MenuItem key={op.value} value={op.value}>
                        {op.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {filters[field].op !== "isEmpty" && (
                  <TextField
                    type="text"
                    variant="outlined"
                    size="small"
                    placeholder="Value"
                    value={filters[field].value}
                    onChange={(e) =>
                      handleFieldChange(
                        field,
                        filters[field].op,
                        e.target.value
                      )
                    }
                    sx={styles.filterValue}
                  />
                )}
              </Box>
            ))}
          {fields
            .filter((field) => columnTypes[field] === "number")
            .map((field) => (
              <Box
                sx={{
                  flex: "1 1 calc(50% - 16px)",
                  minWidth: 0,
                }}
              >
                <FormControl fullWidth size="small">
                  <InputLabel>{field}</InputLabel>
                  <Select
                    label={field}
                    value={filters[field].op}
                    onChange={(e) =>
                      handleFieldChange(
                        field,
                        e.target.value as NumOp,
                        filters[field].value
                      )
                    }
                  >
                    {numericOps.map((op) => (
                      <MenuItem key={op.value} value={op.value}>
                        {op.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  fullWidth
                  type="number"
                  variant="outlined"
                  size="small"
                  placeholder="Value"
                  value={filters[field].value}
                  onChange={(e) =>
                    handleFieldChange(field, filters[field].op, e.target.value)
                  }
                  sx={styles.filterValue}
                />
              </Box>
            ))}
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
          <Button onClick={onClose} sx={{ mr: 1 }}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleApply}>
            Apply
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    backgroundColor: "background.paper",
    padding: "1rem",
    maxHeight: "40rem",
    overflowY: "auto",
  },
  headerContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: "1rem",
    borderBottom: "1px solid #e0e0e0",
  },
  header: {
    fontSize: "1.25rem",
    fontWeight: "bold",
  },
  closeButton: {
    fontSize: 24,
    fontWeight: "bold",
  },
  filterValue: {
    marginTop: 1,
    width: "100%",
  },
};

export default FilterModal;
