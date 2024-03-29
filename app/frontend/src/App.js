import React, { useState } from "react";
import Navbar from "./components/Navigation/Navbar";
import Sidebar from "./components/Navigation/Sidebar";
import Table from "./components/Table/TableDataGrid";
import Comparison from "./components/Comparison/Comparison";
import PieChart from "./components/Pie Chart/PieChart";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./utils/scrollToTop";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const styles = (theme) => ({
  content: {
    paddingLeft: "0.5rem",
    paddingRight: "0.3rem",
  },
});

export default function App() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [customFilterModel, setCustomFilterModel] = useState({
    items: [],
  });
  const matches = useMediaQuery("(min-width:900px)");

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div>
        <Navbar />
        <Sidebar
          open={open}
          handleOnChevronClick={() => {
            setOpen(!open);
          }}
          matches={matches}
          handleSetCustomFilterModel={setCustomFilterModel}
        />
        <main style={styles(theme).content}>
          <Routes>
            <Route
              path="/"
              element={
                <Table
                  open={open}
                  matches={matches}
                  customFilterModel={customFilterModel}
                  handleSetCustomFilterModel={setCustomFilterModel}
                />
              }
            ></Route>
          </Routes>
          <Routes>
            <Route
              path="/compare"
              element={<Comparison open={open} matches={matches} />}
            ></Route>
          </Routes>
          <Routes>
            <Route
              path="/graph"
              element={<PieChart open={open} matches={matches} />}
            ></Route>
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
