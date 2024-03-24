import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";

const columns = [
  {
    field: "name",
    headerName: "Name",
    minWidth: 500,
    renderCell: (cellValues) => {
      return cellValues.row.name;
    },
  },
  {
    field: "product_collection",
    headerName: "Product Collection",
    minWidth: 300,
    renderCell: (cellValues) => {
      return cellValues.row.Essentials["Product Collection"];
    },
  },
  {
    field: "status",
    headerName: "Status",
    minWidth: 150,
    renderCell: (cellValues) => {
      return cellValues.row.status;
    },
  },
];

export default function Table({ jsonData }) {
  // pre-processing
  jsonData = jsonData.map((item) => ({
    ...item,
    status: item.Essentials.Status,
  }));

  const rows = () => [...jsonData];
  return (
    <Box sx={{ height: "100%" }}>
      <DataGrid
        // autoHeight
        getRowId={(row) => row.name}
        rows={rows()}
        columns={columns}
        headerHeight={50}
        rowHeight={50}
        // initialState={{
        //   sorting: {
        //     sortModel: [{ field: "product_collection", sort: "asc" }],
        //   },
        // }}
        sx={{ marginLeft: { xs: "50px", md: "200px" } }} // TODO: change this
      />
    </Box>
  );
}
