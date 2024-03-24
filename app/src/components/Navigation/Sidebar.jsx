import { Drawer, Toolbar } from "@mui/material";

const drawerWidth = 200;

const styles = {
  drawer: {
    width: drawerWidth,
    zIndex: 20,
    "& .MuiBackdrop-root": {
      display: "none",
    },
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#E7E7E7",
  },
  content: {
    marginLeft: drawerWidth + 30,
    marginTop: "20px",
  },
};

export default function Sidebar() {
  return (
    <Drawer
      variant="temporary"
      open={true}
      sx={styles.drawer}
      PaperProps={{ sx: styles.drawerPaper, elevation: 4 }}
      disableEnforceFocus
    >
      <Toolbar />
    </Drawer>
  );
}
