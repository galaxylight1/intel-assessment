import React, { useState, useEffect } from "react";
import Navbar from "./components/Navigation/Navbar";
import Sidebar from "./components/Navigation/Sidebar";
import Table from "./components/Table/TableDataGrid";

const drawerWidth = { xs: 50, md: 200 }; // TODO: change this

const styles = {
  content: {
    marginLeft: '1rem',
    marginTop: "5rem",
  },
};

export default function App() {
  const [jsonData, setJsonData] = useState([]);

  useEffect(() => {
    fetch("/API_DATA.json")
      .then((response) => response.json())
      .then((data) => {
        setJsonData(data);
        console.log(Object.keys(data).length);
      })
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  return (
    <div>
      <Navbar />
      <Sidebar />
      <main style={styles.content}>
        <Table />
      </main>
    </div>
  );
}
