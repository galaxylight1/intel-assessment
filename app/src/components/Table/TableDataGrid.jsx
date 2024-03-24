import { useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import customToolbar from "./CustomToolbar";

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

export default function Table({ jsonData }) {
  const [rowSelectionModel, setRowSelectionModel] = useState([]);
  // pre-processing
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
      <DataGrid
        getRowId={(row) => row.name}
        rows={jsonData}
        columns={columns}
        headerHeight={50}
        rowHeight={50}
        sx={{
          // TODO: change this slightly
          marginLeft: { xs: "50px", md: "200px" },
          minHeight: "10rem",
          // disply: "flex",
          // flexDirection: "column-reverse",
        }}
        autoHeight
        initialState={{
          sorting: {
            sortModel: [{ field: "id", sort: "asc" }],
          },
        }}
        checkboxSelection
        rowSelectionModel={rowSelectionModel}
        onRowSelectionModelChange={(newRowSelectionModel) => {
          if(newRowSelectionModel.length > 2) {
            return;
          }
          setRowSelectionModel(newRowSelectionModel);
        }}
        // disableColumnFilter
        // disableColumnSelector
        // disableDensitySelector
        slots={{ toolbar: customToolbar }}
        // slotProps={{
        //   toolbar: {
        //     showQuickFilter: true,
        //   },
        // }}
      />
    </Box>
  );
}
