import { useState } from "react";
import { Box, Typography, Collapse } from "@mui/material";
import { Table, TableBody, TableCell, TableRow } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";

const commonKeys = (obj1, obj2) =>
  Object.keys(obj1).filter((key) => obj2.hasOwnProperty(key));

let commonKeysArr = [];

export default function CollapsibleTable({ headerName, specificState }) {
  if (headerName === "Package Specifications") {
    const obj1 = specificState[0];
    const obj2 = specificState[1];
    commonKeysArr = commonKeys(obj1, obj2);
  }
  const [open, setOpen] = useState(headerName === "Essentials" ? true : false);

  return (
    <>
      <Box
        sx={{
          marginLeft: { xs: "3.7rem", md: "13.2rem" },
          marginTop: "2rem",
          maxWidth: "33rem",
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
              <TableBody>
                {commonKeysArr.map((key, idx) => {
                  return (
                    <TableRow key={idx}>
                      <TableCell align="left" sx={{ fontWeight: 600 }}>
                        {key}
                      </TableCell>
                      <TableCell align="left">
                        {specificState[0][`${key}`]}
                      </TableCell>
                      <TableCell align="left">
                        {specificState[1][`${key}`]}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Box>
        </Collapse>
      </Box>
    </>
  );
}
