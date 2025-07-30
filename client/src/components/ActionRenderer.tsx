import React from "react";
import { FaEye, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ActionsRenderer = (props: any) => {
  const ViewIcon = FaEye as unknown as React.FC;
  const DeleteIcon = FaTrash as unknown as React.FC;

 const navigate = useNavigate();

  const handleView = () => {
    navigate(`/cars/${props.data.id}`, {
      state: { car: props.data }
    });
  };

  const handleDelete = () => {
    console.log("Delete action for car ID:", props.data.id);
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
