import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
  GridToolbarQuickFilter,
  GridPagination,
} from "@mui/x-data-grid";
import { Box } from "@mui/material";

export default function customToolbar() {
  return (
    <GridToolbarContainer
      sx={{
        marginTop: "0.1rem",
        ".MuiToolbar-root": {
          paddingLeft: "0.4rem",
        },
        ".MuiInputBase-root": {
          marginLeft: "0.3em"
        }
      }}
    >
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
      <GridToolbarQuickFilter />
      <GridPagination />
    </GridToolbarContainer>
  );
}
