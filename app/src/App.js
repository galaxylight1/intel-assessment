import React, { useState, useEffect } from "react";
import Navbar from "./components/Navigation/Navbar";
import Sidebar from "./components/Navigation/Sidebar";
import Table from "./components/Table/TableDataGrid";
import { Typography } from "@mui/material";

const drawerWidth = { xs: 50, md: 200 }; // TODO: change this

const styles = {
  content: {
    marginLeft: "1rem",
    marginRight: "0.5rem",
    marginTop: "4.5rem",
    marginBottom: "1rem",
  },
};

let intialCategory = "Legacy Intel Xeon Processors";
let categoryCount = 0;
export default function App() {
  const [jsonData, setJsonData] = useState([]);

  useEffect(() => {
    fetch("/API_DATA.json")
      .then((response) => response.json())
      .then((data) => {
        data = Object.values(data);
        data = data.filter((item) => {
          if (item.name || item.status) return true;
        });
        setJsonData(data);
      })
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  useEffect(() => {
    // finding number of different product collections
    jsonData.map((item) => {
      const currCategory = item.Essentials["Product Collection"];
      if (currCategory !== intialCategory) {
        categoryCount++;
        intialCategory = currCategory;
      }
    });
  }, [jsonData]);

  return (
    <div>
      <Navbar />
      <Sidebar />
      <main style={styles.content}>
        <Typography
          variant="h6"
          noWrap
          sx={{
            marginLeft: { xs: "3.5rem", md: "13rem" },
            marginTop: "5rem",
            marginBottom: "1rem",
            fontSize: "2rem",
            color: "#0067B4",
          }}
        >
          All Processors
        </Typography>
        <Table jsonData={jsonData} />
      </main>
    </div>
  );
}
