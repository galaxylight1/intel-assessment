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
  jsonData = jsonData.map((item, idx) => ({
    id: idx,
    name: item.name,
    productCollection: idx % 2 == 0 ? "abc" : "def",
    status: item.Essentials.Status,
  }));

  const rows = () => [...jsonData];
  return (
    <Box sx={{ height: "100%" }}>
      <DataGrid
        // autoHeight
        getRowId={(row) => row.name}
        rows={jsonData}
        columns={columns}
        headerHeight={50}
        rowHeight={50}
        // initialState={{
        //   sorting: {
        //     sortModel: [{ field: "productCollection", sort: "asc" }],
        //   },
        // }}
        sx={{ marginLeft: { xs: "50px", md: "200px" } }} // TODO: change this
      />
    </Box>
  );
}
