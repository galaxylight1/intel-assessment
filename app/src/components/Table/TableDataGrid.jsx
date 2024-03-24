import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";

const columns = [
  {
    field: "name",
    headerName: "Name",
    minWidth: 150,
    renderCell: (cellValues) => {
      return cellValues.value;
    },
  },
  {
    field: "role",
    headerName: "Role",
    minWidth: 100,
    renderCell: (cellValues) => {
      return cellValues.value;
    },
  },
  {
    field: "skills",
    headerName: "Skills",
    minWidth: 150,
    renderCell: (cellValues) => {
      return cellValues.value ? cellValues.value[0] : "";
    },
  },
  {
    field: "startDate",
    headerName: "Start Date",
    minWidth: 120,
    renderCell: (cellValues) => {
      return cellValues.value;
    },
  },
  {
    field: "preference",
    headerName: "Work Preference",
    minWidth: 150,
    renderCell: (cellValues) => {
      return cellValues.value;
    },
  },
];

export const contactData = [
  {
    id: 1,
    name: "Shawn Spencer",
    role: "Dev",
    skills: ["React", "Angular"],
    startDate: "123",
    preference: "Work from home",
  },
  {
    id: 2,
    name: "Kody Spencer",
    role: "Manager",
    skills: ["comm", "mgmt", "documentation"],
    startDate: "123",
    preference: "Work from office",
  },
  {
    id: 3,
    name: "Andie Spencer",
    role: "Dev",
    skills: ["React", "Angular"],
    startDate: "123",
    preference: "Work from home",
  },
  {
    id: 4,
    name: "Macy Spencer",
    role: "Dev",
    skills: ["TypeScript", "Angular"],
    startDate: "456",
    preference: "Work from office",
  },
  {
    id: 5,
    name: "Prateek",
    role: "Dev",
    skills: ["TypeScript", "Angular"],
    startDate: "456",
    preference: "Work from office",
  },
  {
    id: 6,
    name: "Adam",
    role: "Dev",
    skills: ["TypeScript", "Angular"],
    startDate: "456",
    preference: "Work from home",
  },
];

export default function Table() {
  const rows = () => [...contactData];
  return (
    <Box sx={{ height: "100%" }}>
      <DataGrid
        rows={rows()}
        columns={columns}
        pageSize={5}
        headerHeight={50}
        rowHeight={70}
        sx={{ marginLeft: { xs: "50px", md: "200px" } }} // TODO: change this
      />
    </Box>
  );
}
