import { AppBar, Toolbar, Typography, Grid, Box } from "@mui/material";
import logo from "../../logo.svg";

const styles = {
  navBar: { boxShadow: "none", backgroundColor: "#0067B4" },
  toolBar: { height: "100%" },
  logoBox: {
    width: 65,
    height: 65,
    display: "flex",
    alignItems: "center",
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
