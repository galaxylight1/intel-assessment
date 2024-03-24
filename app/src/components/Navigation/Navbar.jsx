import { AppBar, Toolbar, Typography, Grid } from "@mui/material";

const styles = {
  navBar: { minHeight: "8vh", boxShadow: "none", backgroundColor: "#0067B4" },
  toolBar: { height: "100%" },
};

export default function Navbar() {
  return (
    <AppBar position="fixed" sx={styles.navBar}>
      <Toolbar sx={styles.toolBar}>
        <Grid container justifyContent="space-between">
          <Grid item>
            <Typography variant="h6" noWrap>
              Intel
            </Typography>
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
