import { useTheme } from "@mui/material/styles";
import {
  Drawer,
  Toolbar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
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
    // display: "flex",
    // justifyContent: "center",
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
    zIndex: 10,
  },
  listItem: {
    ".MuiButtonBase-root": {
      // paddingTop: "0.4rem",
      paddingBottom: "0.4rem",
      paddingLeft: "0.8rem",
    },
  },
  listItemTypo: {
    sx: {
      fontSize: "0.76rem",
      // padding: "0.5rem"
    },
    noWrap: true,
    color: "#6A6A6A",
  },
});

export default function Sidebar({ open, handleOnChevronClick, matches }) {
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
        sx: matches
          ? open
            ? { ...styles(theme).drawerPaper, width: { xs: 200, md: 200 } }
            : { ...styles(theme).drawerPaper, width: { xs: 50, md: 50 } }
          : styles(theme).drawerPaper,
        // sx: styles(theme).drawerPaper,
        elevation: 4,
      }}
      // disableEnforceFocus
    >
      <Toolbar />
      {matches ? ( // double conditionals
        open ? (
          <ChevronLeftIcon
            sx={styles(theme).chevronIcon}
            onClick={handleOnChevronClick}
          />
        ) : (
          <ChevronRightIcon
            sx={styles(theme).chevronIcon}
            onClick={handleOnChevronClick}
          />
        )
      ) : (
        <></>
      )}
      <List sx={{ marginTop: "1rem" }}>
        {[
          "All Products",
          "Recently Announced",
          "Desktop Segment",
          "Mobile Segment",
        ].map((text, index) => (
          <ListItem
            key={text}
            disableGutters
            alignItems="center"
            // divider
            sx={styles(theme).listItem}
          >
            <ListItemButton>
              <ListItemIcon>
                <WhatshotIcon />
              </ListItemIcon>
              <ListItemText
                primary={text}
                primaryTypographyProps={styles(theme).listItemTypo}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
