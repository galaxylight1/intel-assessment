import { useState } from "react";
import { Box, Typography, Collapse } from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  // TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";

export default function CollapsibleTable({ headerName, state }) {
  const [open, setOpen] = useState(headerName === "Essentials" ? true : false);

  return (
    <>
      <Box
        sx={{
          marginLeft: { xs: "3.7rem", md: "13.2rem" },
          marginTop: "2rem",
          maxWidth: "30rem",
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
            {headerName}
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
                  <TableCell align="left">4</TableCell>
                  <TableCell align="left">5</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left" sx={{ fontWeight: 600 }}>
                    # of Cores
                  </TableCell>
                  <TableCell align="left">
                    6{/* {state[0].cores === 0 ? "-" : state[0].cores} */}
                  </TableCell>
                  <TableCell align="left">
                    7{/* {state[1].cores === 0 ? "-" : state[1].cores} */}
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
