import { useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box, FormControlLabel, Switch } from "@mui/material";
import customToolbar from "./CustomToolbar";
import Snackbar from "@mui/material/Snackbar";
import { SnackbarContent } from "@mui/material";
import Slide from "@mui/material/Slide";
import Alert from "@mui/material/Alert";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const columns = [
  {
    field: "id",
    headerName: "ID",
    minWidth: 100,
    renderCell: (cellValues) => {
      return cellValues.row.id;
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

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

export default function Table({ jsonData }) {
  const [checkboxSelection, setCheckboxSelection] = useState(false);
  const [rowSelectionModel, setRowSelectionModel] = useState([]);
  const [isSnackbarVisible, SetIsSnackBarVisible] = useState(false);

  // pre-processing, TODO: explore useEffect here
  jsonData = jsonData.map((item, idx) => ({
    id: 1 + idx, // TODO: id: 27076 + idx,
    name: item.name,
    productCollection: item.Essentials["Product Collection"],
    status: item.Essentials.Status,
    cores: item.Performance ? parseInt(item.Performance["# of Cores"]) : 0,
  }));

  const rows = () => [...jsonData];
  return (
    <Box sx={{ height: "100%" }}>
      <Box sx={{ mb: 1, marginLeft: { xs: "3.5rem", md: "13rem" } }}>
        <FormControlLabel
          label="Select two units for comparison"
          control={
            <Switch
              checked={checkboxSelection}
              onChange={(event) => setCheckboxSelection(event.target.checked)}
            />
          }
        />
      </Box>
      <DataGrid
        getRowId={(row) => row.name}
        rows={rows()}
        columns={columns}
        headerHeight={50}
        rowHeight={50}
        sx={{
          // TODO: change this slightly
          marginLeft: { xs: "50px", md: "200px" },
          minHeight: "10rem",
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
            SetIsSnackBarVisible(true);
          }
          if (newRowSelectionModel.length < 2) {
            SetIsSnackBarVisible(false);
          }
          setRowSelectionModel(newRowSelectionModel);
        }}
        slots={{ toolbar: customToolbar }}
      />
      <Snackbar
        open={isSnackbarVisible}
        // onClose={() => {
        // }}
        TransitionComponent={Slide}
        key="compareProducts"
        autoHideDuration={1200}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <SnackbarContent
          sx={{
            backgroundColor: "#0067B4",
          }}
          message="Compare products"
          action={<ArrowForwardIcon />}
        ></SnackbarContent>
      </Snackbar>
    </Box>
  );
}
