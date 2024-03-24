import {
  DataGrid,
  GridToolbar,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
  GridToolbarQuickFilter,
  GridPagination,
} from "@mui/x-data-grid";
import { Box } from "@mui/material";

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
      return cellValues.row.cores;
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

function customToolbar() {
  return (
    <GridToolbarContainer sx={{ marginTop: "0.1rem" }}>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector
        slotProps={{ tooltip: { title: "Change density" } }}
      />
      <GridToolbarExport
        slotProps={{
          tooltip: { title: "Export as CSV" },
          button: {
            variant: "outlined",
            sx: { borderRadius: 0 },
          },
        }}
      />
      <Box sx={{ flexGrow: 1 }} />
      <GridToolbarQuickFilter sx={{ marginLeft: "0.5rem" }} />
      <GridPagination />
    </GridToolbarContainer>
  );
}

export default function Table({ jsonData }) {
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
        componentsProps={{
          panel: {
            anchorEl: customToolbar,
            // placement: "bottom",
          },
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
