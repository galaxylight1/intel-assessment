import { useTheme } from "@mui/material/styles";
import { Drawer, Toolbar } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
// import { useState } from "react";
const drawerWidth = { xs: 50, md: 200 };

const styles = (theme) => ({
  drawer: {
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
    overflow: "visible",
  },
  chevronIcon: {
    cursor: "pointer",
    color: "darkgray",
    border: "0.7px solid darkgray",
    borderRadius: "50vh",
    position: "absolute",
    right: "-0.7rem",
    top: "50vh",
    backgroundColor: "#E7E7E7",
  },
});

export default function Sidebar({ open, handleOnChevronClick }) {
  // const [open, setOpen] = useState(false);
  const theme = useTheme();

  // const handleOnChevronClick = () => {
  //   setOpen(!open);
  // };

  return (
    <Drawer
      variant="permanent"
      open={true}
      sx={styles(theme).drawer}
      PaperProps={{
        sx: open
          ? { ...styles(theme).drawerPaper, width: { xs: 200, md: 200 } }
          : { ...styles(theme).drawerPaper, width: { xs: 50, md: 50 } },
        elevation: 4,
      }}
      // disableEnforceFocus
    >
      <Toolbar />
      {open ? (
        <ChevronLeftIcon
          sx={styles(theme).chevronIcon}
          onClick={handleOnChevronClick}
        />
      ) : (
        <ChevronRightIcon
          sx={styles(theme).chevronIcon}
          onClick={handleOnChevronClick}
        />
      )}
    </Drawer>
  );
}
