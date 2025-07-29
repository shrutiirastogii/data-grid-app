import React from "react";
import { FaEye } from "react-icons/fa";

const ActionsRenderer = (props: any) => {
  const ViewIcon = FaEye as unknown as React.FC;

  const handleView = () => {
    console.log("View", props.data);
  };

  return (
    <div style={{ display: "flex", gap: "8px" }}>
      <span style={{ cursor: "pointer" }} onClick={handleView}>
        <ViewIcon />
      </span>
    </div>
  );
};

export default ActionsRenderer;
