import React, { useState, useEffect } from "react";
import Navbar from "./components/Navigation/Navbar";
import Sidebar from "./components/Navigation/Sidebar";
import Table from "./components/Table/TableDataGrid";

const drawerWidth = { xs: 50, md: 200 }; // TODO: change this

const styles = {
  content: {
    marginLeft: "0.7rem",
    marginRight: "0.5rem",
    marginTop: "4.5rem",
  },
};

export default function App() {
  const [jsonData, setJsonData] = useState([]);

  useEffect(() => {
    fetch("/API_DATA.json")
      .then((response) => response.json())
      .then((data) => {
        data = Object.values(data).slice(0, 5);
        data = data.filter((item) => {
          if (item.name || item.status) return true;
        });
        setJsonData(data);
      })
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  console.log(jsonData);

  return (
    <div>
      <Navbar />
      <Sidebar />
      <main style={styles.content}>
        <Table jsonData={jsonData} />
      </main>
    </div>
  );
}
