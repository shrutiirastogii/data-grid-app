import axios from "axios";
import React from "react";
import { FaEye, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface ActionRendererProps {
  data: {
    id: number;
    Brand: string;
    Model: string;
    [key: string]: any;
  };
  refreshData: () => void;
}

const ActionsRenderer: React.FC<ActionRendererProps> = ({ data, refreshData }) => {
  const ViewIcon = FaEye as unknown as React.FC;
  const DeleteIcon = FaTrash as unknown as React.FC;

 const navigate = useNavigate();

  const handleView = () => {
    navigate(`/cars/${data.id}`, {
      state: { car: data }
    });
  };

  const handleDelete = async () => {
    if (window.confirm(`Delete ${data.Brand.trim()} ${data.Model}?`)) {
      try {
        await axios.delete(`http://localhost:5000/api/cars/${data.id}`);
        refreshData();
      } catch (error) {
        console.error("Delete failed", error);
        alert("Failed to delete car.");
      }
    }
  };

  return (
    <div style={{ display: "flex", gap: "8px" }}>
      <span style={{ cursor: "pointer" }} onClick={handleView}>
        <ViewIcon />
      </span>
      <span style={{ cursor: "pointer" }} onClick={handleDelete}>
        <DeleteIcon />
      </span>
    </div>
  );
};

export default ActionsRenderer;
