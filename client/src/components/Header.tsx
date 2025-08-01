import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaFilter } from "react-icons/fa";

interface HeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}
const Header: React.FC<HeaderProps> = ({ searchTerm, setSearchTerm }) => {
  const location = useLocation();
  const FilterIcon = FaFilter as unknown as React.FC;
  const [isMobile, setIsMobile] = useState(false);
  const [filter, setFilter] = useState(false);

  const handleFilter = () => {
    setFilter(!filter);
  };

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const isDataGridPage = location.pathname === "/";

  return (
    <div style={styles.container}>
      <nav style={styles.nav}>
        <Link to="/" style={styles.logo}>
          ⚡ DataGrid App
        </Link>
        {isDataGridPage && (
          <div
            style={{
              width: isMobile ? "100%" : "auto",
              ...styles.searchContainer,
            }}
          >
            <input
              type="text"
              placeholder="Search"
              style={styles.searchBar}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div style={styles.filterContainer}>
              <span onClick={handleFilter} style={styles.filterIcon}>
                <FilterIcon />
              </span>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    backgroundColor: "#f9fafb",
    fontFamily: "sans-serif",
    position: "fixed" as const,
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    boxShadow: "0 1px 10px",
    alignItems: "center",
    justifyContent: "space-between",
  },
  nav: {
    backgroundColor: "#fff",
    boxShadow: "0 1px 4px rgba(0, 0, 0, 0.1)",
    padding: "1rem 1.5rem",
    display: "flex",
    flexDirection: "row",
    gap: "0",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    fontSize: "1.25rem",
    fontWeight: "bold",
    color: "#111827",
    textDecoration: "none",
  },
  searchContainer: {
    display: "flex",
    gap: "1rem",
    alignItems: "center",
  },
  searchBar: {
    flex: 1,
    padding: "0.4rem 0.8rem",
    borderRadius: 6,
    border: "1px solid #d1d5db",
  },
  filterContainer: {
    width: "32px",
    height: "32px",
    backgroundColor: "#d1d5db",
    borderRadius: "10%",
    alignItems: "center",
    padding: "0.2rem",
    justifyContent: "center",
    display: "flex",
  },
  filterIcon: {
    color: "#000000ff",
    fontSize: "1.25rem",
    alignSelf: "center",
    cursor: "pointer",
  },
};

export default Header;
