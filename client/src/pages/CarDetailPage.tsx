import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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
      <section style={styles.sectionContainer}>
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
      <section style={styles.sectionContainer}>
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
      <section style={styles.sectionContainer}>
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
    padding: "4rem 6rem",
  },
  headerContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: "1.5rem",
  },
  backButton: {
    padding: "0.5rem 1rem",
    backgroundColor: "#f3f4f6",
    borderRadius: 6,
    marginBottom: "1rem",
    border: "none",
    cursor: "pointer",
  },
  header: { fontSize: "1.5rem", fontWeight: 600, marginBottom: "1rem" },
  carImage: {
    width: "100%",
    height: "80%",
    objectFit: "contain",
    borderRadius: 12,
    marginBottom: "2rem",
  },
  sectionContainer: {
    marginBottom: "2rem",
  },
  label: { fontSize: "0.85rem", color: "#6b7280" },
  value: { fontSize: "1rem", marginTop: "0.25rem" },
  row: {
    display: "flex",
    flexWrap: "wrap",
    gap: "2rem",
    marginBottom: "1.5rem",
  },
};

export default CarDetailsPage;
