import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { COLORS } from "../styles/colors";

const CarDetailsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const car = (location.state as any)?.car;

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!car) return <p>Car not found</p>;

  return (
    <div style={styles.container}>
      <div style={styles.headerContainer}>
        <h1 style={styles.header}>
          Details for {car.Brand} {car.Model}
        </h1>
        <button onClick={() => navigate(-1)} style={styles.backButton}>
          Back
        </button>
      </div>
      <img
        src={require("../assets/carImage.png")}
        alt="Car"
        style={styles.carImage}
      />
      <section>
        <h2
          style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: "1rem" }}
        >
          Performance
        </h2>
        <div style={styles.row}>
          <div style={{ flex: isMobile ? "1 1 100%" : "1 1 45%" }}>
            <p style={styles.label}>Top Speed</p>
            <p style={styles.value}>{car.TopSpeed_KmH} km/h</p>
          </div>
          <div style={{ flex: isMobile ? "1 1 100%" : "1 1 45%" }}>
            <p style={styles.label}>Acceleration</p>
            <p style={styles.value}>0–100 km/h in {car.AccelSec} sec</p>
          </div>
        </div>
      </section>
      <section>
        <h2
          style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: "1rem" }}
        >
          Specifications
        </h2>
        <div style={styles.row}>
          <div style={{ flex: isMobile ? "1 1 100%" : "1 1 45%" }}>
            <p style={styles.label}>Body Style</p>
            <p style={styles.value}>{car.BodyStyle}</p>
          </div>
          <div style={{ flex: isMobile ? "1 1 100%" : "1 1 45%" }}>
            <p style={styles.label}>Power Train</p>
            <p style={styles.value}>{car.PowerTrain}</p>
          </div>
          <div style={{ flex: isMobile ? "1 1 100%" : "1 1 45%" }}>
            <p style={styles.label}>Seats</p>
            <p style={styles.value}>{car.Seats}</p>
          </div>
          <div style={{ flex: isMobile ? "1 1 100%" : "1 1 45%" }}>
            <p style={styles.label}>Segment</p>
            <p style={styles.value}>{car.Segment}</p>
          </div>
        </div>
      </section>
      <section>
        <h2
          style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: "1rem" }}
        >
          Pricing
        </h2>
        <div style={{ flex: isMobile ? "1 1 100%" : "1 1 45%" }}>
          <p style={styles.label}>Price</p>
          <p style={styles.value}>€{Number(car.PriceEuro).toLocaleString()}</p>
        </div>
      </section>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: "0rem 10rem",
  },
  headerContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  backButton: {
    padding: "0.7rem 2rem",
    backgroundColor: COLORS.grey2,
    borderRadius: 25,
    marginBottom: "1rem",
    border: "none",
    cursor: "pointer",
    fontWeight: 600,
  },
  header: {
    fontSize: "1.5rem",
    fontWeight: 600,
    marginBottom: "1rem",
  },
  carImage: {
    width: "100%",
    height: "60%",
    objectFit: "contain",
    borderRadius: 12,
  },
  label: {
    fontSize: "0.85rem",
    color: COLORS.darkGrey,
  },
  value: {
    fontSize: "1rem",
  },
  row: {
    display: "flex",
    flexWrap: "wrap",
  },
};

export default CarDetailsPage;
