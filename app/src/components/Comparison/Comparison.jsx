import { Box, Typography, Collapse, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
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
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";

export default function Comparison() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [open, setOpen] = useState(false);
  if (!state || state.length !== 2) {
    navigate("/");
    return;
  }
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
          marginLeft: { xs: "3.7rem", md: "13.2rem" },
          marginTop: "2rem",
          maxWidth: "27rem",
        }}
      >
        <Box
          sx={{
            boxShadow: "rgba(16, 24, 40, 0.05) 0px 1px 2px 0px",
            borderBottom: "1px solid #E0E0E0",
            backgroundColor: "#0067B4",
            paddingTop: "0.2rem",
            paddingLeft: "0.5rem",
            cursor: "pointer",
          }}
          onClick={() => setOpen(!open)}
        >
          <Typography
            variant="h6"
            gutterBottom
            component="div"
            sx={{ display: "flex", alignItems: "center", color: "white" }}
          >
            {open ? (
              <IndeterminateCheckBoxIcon sx={{ color: "white", mr: 1.5 }} />
            ) : (
              <AddBoxIcon sx={{ color: "white", mr: 1.5 }} />
            )}{" "}
            Essentials
          </Typography>
        </Box>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Box>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="left" sx={{ fontWeight: 600 }}>
                    Name
                  </TableCell>
                  <TableCell align="left">{state[0].name}</TableCell>
                  <TableCell align="left">{state[1].name}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell align="left" sx={{ fontWeight: 600 }}>
                    Status
                  </TableCell>
                  <TableCell align="left">{state[0].status}</TableCell>
                  <TableCell align="left">{state[1].status}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left" sx={{ fontWeight: 600 }}>
                    # of Cores
                  </TableCell>
                  <TableCell align="left">
                    {state[0].cores === 0 ? "-" : state[0].cores}
                  </TableCell>
                  <TableCell align="left">
                    {state[1].cores === 0 ? "-" : state[1].cores}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Box>
        </Collapse>
      </Box>
      <Box
        sx={{
          marginLeft: { xs: "3.7rem", md: "13.2rem" },
          marginTop: "2rem",
          maxWidth: "27rem",
        }}
      >
        <Box
          sx={{
            boxShadow: "rgba(16, 24, 40, 0.05) 0px 1px 2px 0px",
            borderBottom: "1px solid #E0E0E0",
            backgroundColor: "#0067B4",
            paddingTop: "0.2rem",
            paddingLeft: "0.5rem",
            cursor: "pointer",
          }}
          onClick={() => setOpen(!open)}
        >
          <Typography
            variant="h6"
            gutterBottom
            component="div"
            sx={{ display: "flex", alignItems: "center", color: "white" }}
          >
            {open ? (
              <IndeterminateCheckBoxIcon sx={{ color: "white", mr: 1.5 }} />
            ) : (
              <AddBoxIcon sx={{ color: "white", mr: 1.5 }} />
            )}{" "}
            Performance
          </Typography>
        </Box>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Box>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="left" sx={{ fontWeight: 600 }}>
                    Name
                  </TableCell>
                  <TableCell align="left">{state[0].name}</TableCell>
                  <TableCell align="left">{state[1].name}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell align="left" sx={{ fontWeight: 600 }}>
                    Status
                  </TableCell>
                  <TableCell align="left">{state[0].status}</TableCell>
                  <TableCell align="left">{state[1].status}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left" sx={{ fontWeight: 600 }}>
                    # of Cores
                  </TableCell>
                  <TableCell align="left">
                    {state[0].cores === 0 ? "-" : state[0].cores}
                  </TableCell>
                  <TableCell align="left">
                    {state[1].cores === 0 ? "-" : state[1].cores}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Box>
        </Collapse>
      </Box>
    </>
  );
}
