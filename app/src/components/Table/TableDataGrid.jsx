import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";
// import CancelIcon from "@mui/icons-material/Cancel";

const columns = [
  {
    field: "name",
    headerName: "Name",
    minWidth: 150,
    renderCell: (cellValues) => {
      return cellValues.row.name;
    },
  },
  {
    field: "product_collection",
    headerName: "Product Collection",
    minWidth: 100,
    renderCell: (cellValues) => {
      return cellValues.row.Essentials["Product Collection"];
    },
  },
  {
    field: "status",
    headerName: "Status",
    minWidth: 100,
    renderCell: (cellValues) => {
      return cellValues.row.Essentials.Status;
    },
  },
];

export default function Table({ jsonData }) {
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
        sx={{ marginLeft: { xs: "50px", md: "200px" } }} // TODO: change this
      />
    </Box>
  );
}
