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
import { Car } from "../types/car";
import axios from "axios";
import { COLORS } from "../styles/colors";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: Record<string, string>) => void;
  setFilteredData: (data: Car[]) => void;
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

const STORAGE_KEY = "carFilters";

const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onClose,
  onApply,
  setFilteredData,
}) => {
  const fields = React.useMemo(
    () =>
      (Object.keys(columnTypes) as (keyof Car)[]).filter(
        (f) => !["id", "Date", "Brand", "Model"].includes(f)
      ),
    []
  );

  const initialFilters = React.useMemo(() => {
    const obj = {} as Record<keyof Car, { op: NumOp | StrOp; value: string }>;
    fields.forEach((f) => {
      obj[f] = {
        op: columnTypes[f] === "number" ? "equals" : "contains",
        value: "",
      };
    });
    return obj;
  }, [fields]);

  const [filters, setFilters] = React.useState<
    Record<keyof Car, { op: NumOp | StrOp; value: string }>
  >(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch {
        console.error(
          "Failed to parse filters from localStorage, using defaults."
        );
        return initialFilters;
      }
    }
    return initialFilters;
  });

  React.useEffect(() => {
    if (isOpen) {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        try {
          setFilters(JSON.parse(raw));
        } catch {
          setFilters(initialFilters);
        }
      }
    }
  }, [initialFilters, isOpen]);

  const handleFieldChange = (
    field: keyof Car,
    op: NumOp | StrOp,
    value: string
  ) => {
    setFilters((prev) => ({ ...prev, [field]: { op, value } }));
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

    localStorage.setItem(STORAGE_KEY, JSON.stringify(filters));

    const queryString = new URLSearchParams(params).toString();
    const url = `http://localhost:5000/api/filtercars/filter?${queryString}`;
    axios
      .get<Car[]>(url)
      .then((response) => {
        setFilteredData(response.data);
        onApply(params);
      })
      .catch((error) => console.error(error));

    onClose();
  };

  return (
    <Modal open={isOpen} onClose={onClose} aria-labelledby="filter-modal-title">
      <Box sx={styles.container}>
        <Box sx={styles.headerContainer}>
          <Typography sx={styles.header}>Filter Cars</Typography>
          <Button onClick={onClose}>
            <span style={styles.closeButton}>&times;</span>
          </Button>
        </Box>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 2,
            mb: 2,
          }}
        >
          {fields.map((field) => {
            const isNum = columnTypes[field] === "number";
            const ops = isNum ? numericOps : stringOps;
            const { op, value } = filters[field];

            return (
              <Box key={field}>
                <FormControl fullWidth size="small">
                  <InputLabel>{field}</InputLabel>
                  <Select
                    label={field}
                    value={op}
                    onChange={(e) =>
                      handleFieldChange(field, e.target.value as any, value)
                    }
                  >
                    {ops.map((o) => (
                      <MenuItem key={o.value} value={o.value}>
                        {o.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {op !== "isEmpty" && (
                  <TextField
                    fullWidth
                    type={isNum ? "number" : "text"}
                    variant="outlined"
                    size="small"
                    placeholder="Value"
                    value={value}
                    onChange={(e) =>
                      handleFieldChange(field, op, e.target.value)
                    }
                    sx={styles.filterValue}
                  />
                )}
              </Box>
            );
          })}
        </Box>

        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
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
    marginBottom: "1rem",
    borderBottom: `1px solid ${COLORS.lightGrey}`,
  },
  header: {
    fontSize: "1.25rem",
    fontWeight: "bold",
  },
  closeButton: {
    fontSize: 34,
    fontWeight: "bold",
    color: COLORS.red,
  },
  filterValue: {
    marginTop: "0.5rem",
  },
};

export default FilterModal;
