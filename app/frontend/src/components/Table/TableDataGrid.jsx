import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, FormControlLabel, Switch } from "@mui/material";
import customToolbar from "./CustomToolbar";
import Snackbar from "@mui/material/Snackbar";
import { SnackbarContent, Typography } from "@mui/material";
import Slide from "@mui/material/Slide";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import MemoryIcon from "@mui/icons-material/Memory";
import { useTheme } from "@mui/material/styles";

const columns = [
  {
    field: "id",
    headerName: "ID",
    minWidth: 100,
    renderCell: (cellValues) => {
      return cellValues.row.id + 1;
    },
  },
  {
    field: "name",
    headerName: "Product Name",
    minWidth: 500,
    renderCell: (cellValues) => {
      return cellValues.row.name;
    },
  },
  {
    field: "productCollection",
    headerName: "Product Collection",
    minWidth: 300,
    valueGetter: (val) => {
      return val;
    },
    renderCell: (cellValues) => {
      return cellValues.row.productCollection;
    },
  },
  {
    field: "cores",
    headerName: "# of Cores",
    minWidth: 100,
    renderCell: (cellValues) => {
      return cellValues.row.cores === 0 ? "-" : cellValues.row.cores;
    },
  },
  {
    field: "status",
    headerName: "Product Status",
    minWidth: 150,
    renderCell: (cellValues) => {
      return cellValues.row.status;
    },
  },
];

let comparisonProductsArr = [];

export default function Table({ jsonData, open }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const [checkboxSelection, setCheckboxSelection] = useState(false);
  const [rowSelectionModel, setRowSelectionModel] = useState([]);
  const [isSnackbarVisible, setIsSnackBarVisible] = useState(false);

  const handleOnSnackbarClick = () => {
    const passOnProductsArr = [...comparisonProductsArr];
    comparisonProductsArr = []; // reset
    navigate(`/compare`, { state: passOnProductsArr });
  };

  // pre-processing, TODO: explore useEffect here
  const newJsonData = jsonData.map((item, idx) => ({
    id: idx, // TODO: id: 27076 + idx,
    name: item.name,
    productCollection: item.Essentials["Product Collection"],
    status: item.Essentials.Status,
    cores: item.Performance ? parseInt(item.Performance["# of Cores"]) : 0,
  }));

  const handleRowSelectionModel = (newRowSelectionModel) => {
    setRowSelectionModel(newRowSelectionModel);
  };

  const rows = () => [...newJsonData];

  return (
    <Box sx={{ height: "100%" }}>
      <Typography
        variant="h6"
        noWrap
        sx={{
          marginLeft: open
            ? { xs: "12.5rem", md: "200px" }
            : { xs: "50px", md: "50px" },
          marginTop: "5rem",
          marginBottom: "1rem",
          fontSize: "2rem",
          color: "#0067B4",
          display: "flex",
          alignItems: "center",
          transition: theme.transitions.create("margin-left", {
            easing: theme.transitions.easing.easeOut,
            duration: 300,
          }),
        }}
      >
        <MemoryIcon sx={{ fontSize: "3rem", mr: "0.5rem" }} /> All Processors
      </Typography>
      <Box
        sx={{
          mb: 1,
          marginLeft: open
            ? { xs: "12.7rem", md: "205px" }
            : { xs: "55px", md: "55px" },
          transition: theme.transitions.create("margin-left", {
            easing: theme.transitions.easing.easeOut,
            duration: 300,
          }),
        }}
      >
        <FormControlLabel
          label="Select two products for comparison"
          control={
            <Switch
              checked={checkboxSelection}
              onChange={(event) => setCheckboxSelection(event.target.checked)}
            />
          }
        />
      </Box>
      <DataGrid
        className="table-data-grid"
        getRowId={(row) => row.id}
        rows={rows()}
        columns={columns}
        headerHeight={50}
        rowHeight={50}
        sx={{
          // TODO: change this slightly
          marginLeft: open
            ? { xs: "12.5rem", md: "200px" }
            : { xs: "50px", md: "50px" },
          minHeight: "10rem",
          transition: theme.transitions.create("margin-left", {
            easing: theme.transitions.easing.easeOut,
            duration: 300,
          }),
        }}
        autoHeight
        initialState={{
          sorting: {
            sortModel: [{ field: "id", sort: "asc" }],
          },
        }}
        checkboxSelection={checkboxSelection}
        rowSelectionModel={rowSelectionModel}
        onRowSelectionModelChange={(newRowSelectionModel) => {
          if (newRowSelectionModel.length > 2) {
            return;
          }
          if (newRowSelectionModel.length === 2) {
            comparisonProductsArr = [
              jsonData[newRowSelectionModel[0]],
              jsonData[newRowSelectionModel[1]],
            ];
            setIsSnackBarVisible(true);
          }
          if (newRowSelectionModel.length < 2) {
            setIsSnackBarVisible(false);
          }
          handleRowSelectionModel(newRowSelectionModel);
        }}
        slots={{ toolbar: customToolbar }}
      />
      <Snackbar
        open={isSnackbarVisible}
        TransitionComponent={Slide}
        onClick={handleOnSnackbarClick}
        key="compareProducts"
        autoHideDuration={1200}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <SnackbarContent
          sx={{
            backgroundColor: "#0067B4",
            cursor: "pointer",
          }}
          message="Compare products"
          action={<ArrowForwardIcon />}
        ></SnackbarContent>
      </Snackbar>
    </Box>
  );
}
