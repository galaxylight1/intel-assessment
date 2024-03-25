import React, { useState, useEffect } from "react";
import Navbar from "./components/Navigation/Navbar";
import Sidebar from "./components/Navigation/Sidebar";
import Table from "./components/Table/TableDataGrid";
import Comparison from "./components/Comparison/Comparison";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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
        console.log(data);
        let max = -1;
        let obj = {};
        data.map((key, idx) => {
          let tempMax = Object.keys(data[idx]).length;
          if (tempMax > max) {
            max = tempMax;
            obj = data[idx];
          }
        });
        console.log(max, obj);
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
    <BrowserRouter>
      <div>
        <Navbar />
        <Sidebar />
        <main style={styles.content}>
          <Routes>
            <Route path="/" element={<Table jsonData={jsonData} />}></Route>
          </Routes>
          <Routes>
            <Route path="/compare" element={<Comparison />}></Route>
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
