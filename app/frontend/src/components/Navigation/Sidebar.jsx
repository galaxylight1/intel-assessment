import { Drawer, Toolbar } from "@mui/material";

const drawerWidth = { xs: 50, md: 200 };

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
  }
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
