import { AppBar, Toolbar, Typography, Grid, Box } from "@mui/material";
import logo from "../../logo.svg";

const styles = {
  navBar: { boxShadow: "none", backgroundColor: "#0067B4" },
  toolBar: { height: "100%" },
};

export default function Navbar() {
  return (
    <AppBar position="fixed" sx={styles.navBar}>
      <Toolbar sx={styles.toolBar}>
        <Grid container justifyContent="space-between">
          <Grid item>
            <Box sx={{ width: 60, height: 60 }}>
              <img src={logo} alt="Intel Logo" />
            </Box>
          </Grid>
          {/* <Grid item>
            <Typography variant="h6" noWrap>
              Intel
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6" noWrap>
              Intel
            </Typography>
          </Grid> */}
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
