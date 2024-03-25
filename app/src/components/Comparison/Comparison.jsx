import { Box, Typography, Collapse } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";

export default function Comparison() {
  const { state } = useLocation();
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
      <Box
        sx={{
          marginLeft: { xs: "3.8rem", md: "13.3rem" },
          marginTop: "2rem",
          maxWidth: "30rem",
        }}
      >
        <Box
          sx={{
            boxShadow: "rgba(16, 24, 40, 0.05) 0px 1px 2px 0px",
            borderBottom: "1px solid #E0E0E0",
          }}
        >
          <Typography
            variant="h6"
            gutterBottom
            component="div"
            sx={{ display: "flex", alignItems: "center", mt: 0.7 }}
          >
            <AddBoxIcon sx={{ color: "#0067B4", mr: 1.5 }} /> Essentials
          </Typography>
        </Box>
        <Collapse in>
          <Box>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="left">Name</TableCell>
                  <TableCell align="left">y</TableCell>
                  <TableCell align="left">z</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell align="left">Status</TableCell>
                  <TableCell align="left">2</TableCell>
                  <TableCell align="left">3</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left"># of Cores</TableCell>
                  <TableCell align="left">2</TableCell>
                  <TableCell align="left">3</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Box>
        </Collapse>
      </Box>
    </>
  );
}
