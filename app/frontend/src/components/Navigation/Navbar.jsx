/*
 * Component that renders the Navbar
 */

import { AppBar, Toolbar, Grid, Box } from "@mui/material";
import logo from "../../logo.svg";

const styles = {
  navBar: {
    boxShadow: "none",
    backgroundColor: "#0067B4",
    height: "3.7rem",
    ".MuiToolbar-root": {
      paddingLeft: "0.8rem",
    },
  },
  toolBar: {
    height: "100%",
    display: "flex",
    alignItems: "center",
  },
  logoBox: {
    width: 65,
    height: 65,
    height: "100%",
  },
};

export default function Navbar() {
  return (
    <AppBar position="fixed" sx={styles.navBar}>
      <Toolbar sx={styles.toolBar}>
        <Grid container justifyContent="space-between">
          <Grid item>
            <Box sx={styles.logoBox}>
              <img src={logo} alt="Intel Logo" />
            </Box>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
