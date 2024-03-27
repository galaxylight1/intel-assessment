import { useTheme } from "@mui/material/styles";
import { Drawer, Toolbar } from "@mui/material";

const drawerWidth = { xs: 50, md: 200 };

const styles = (theme) => ({
  drawer: {
    width: drawerWidth,
    "& .MuiBackdrop-root": {
      display: "none",
    },
  },
  drawerPaper: {
    width: drawerWidth,
    zIndex: 10,
    backgroundColor: "#E7E7E7",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.easeOut,
      duration: 300,
    }),
  },
});

export default function Sidebar() {
  const theme = useTheme();
  return (
    <Drawer
      variant="permanent"
      open={true}
      sx={styles.drawer}
      PaperProps={{ sx: styles(theme).drawerPaper, elevation: 4 }}
      disableEnforceFocus
    >
      <Toolbar />
    </Drawer>
  );
}
