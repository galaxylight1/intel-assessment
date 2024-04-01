import { useTheme } from "@mui/material/styles";
import { Drawer, Toolbar } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import SideList from "./SideList";
import { useNavigate } from "react-router-dom";
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
    zIndex: 10,
  },
});

export default function Sidebar({
  open,
  handleOnChevronClick,
  matches,
  handleSetCustomFilterModel,
}) {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleOnListBtnClick = (txt) => {
    let obj = {};
    switch (txt) {
      case "Launched":
        obj = {
          items: [
            {
              field: "status",
              operator: "equals",
              value: "Launched",
            },
          ],
        };
        break;
      case "Discontinued":
        obj = {
          items: [
            {
              field: "status",
              operator: "equals",
              value: "Discontinued",
            },
          ],
        };
        break;
      case "Desktop Segment":
        obj = {
          items: [
            {
              field: "segment",
              operator: "equals",
              value: "Desktop",
            },
          ],
        };
        break;
      case "Mobile Segment":
        obj = {
          items: [
            {
              field: "segment",
              operator: "equals",
              value: "Mobile",
            },
          ],
        };
        break;
      case "Server Segment":
        obj = {
          items: [
            {
              field: "segment",
              operator: "equals",
              value: "Server",
            },
          ],
        };
        break;
      default:
        obj = { items: [] };
    }
    if (txt === "Pie Visualization") {
      navigate("/graph");
    } else {
      navigate("/");
    }
    handleSetCustomFilterModel(obj);
  };

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
        elevation: 4,
      }}
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
      <SideList handleOnListBtnClick={handleOnListBtnClick} />
    </Drawer>
  );
}
