import { Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

export default function Comparison() {
  const { state } = useLocation();
  console.log(state);
  return (
    <>
      <Typography
        variant="h6"
        noWrap
        sx={{
          marginLeft: { xs: "3.5rem", md: "13rem" },
          marginTop: "5rem",
          marginBottom: "1rem",
          fontSize: "2rem",
          color: "#0067B4",
        }}
      >
        Compare Products
      </Typography>
    </>
  );
}
