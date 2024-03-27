import React, { useState, useEffect } from "react";
import Navbar from "./components/Navigation/Navbar";
import Sidebar from "./components/Navigation/Sidebar";
import Table from "./components/Table/TableDataGrid";
import Comparison from "./components/Comparison/Comparison";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./utils/scrollToTop";
import { useTheme } from "@mui/material/styles";

const drawerWidth = { xs: 50, md: 200 }; // TODO: change this

const styles = (theme) => ({
  content: {
    paddingLeft: "0.5rem",
    paddingRight: "0.3rem",
    // ".table-data-grid": {
    //   transition: theme.transitions.create("margin-left", {
    //     easing: theme.transitions.easing.easeOut,
    //     duration: 2000,
    //   }),
    // },
  },
});

// TODO: remove this when not needed
// let intialCategory = "Legacy Intel Xeon Processors";
// let categoryCount = 0;
export default function App() {
  const theme = useTheme();
  const [jsonData, setJsonData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        data = Object.values(data);
        data = data.filter((item) => {
          if (item.name && item.Essentials["Status"]) return true;
        });
        setJsonData(data);
      })
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  // TODO: remove this when not needed
  // useEffect(() => {
  //   // finding number of different product collections
  //   jsonData.map((item) => {
  //     // const currCategory = item.Essentials["Product Collection"];
  //     // if (currCategory !== intialCategory) {
  //     //   categoryCount++;
  //     //   intialCategory = currCategory;
  //     // }

  //     if (item["Performance"] && item["Performance"]["Processor Base Frequency"])
  //       console.log(item["Performance"]["Processor Base Frequency"]);
  //   });
  // }, [jsonData]);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div>
        <Navbar />
        <Sidebar />
        <main style={styles(theme).content}>
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
