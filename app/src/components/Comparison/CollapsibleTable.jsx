import { useState } from "react";
import { Box, Typography, Collapse } from "@mui/material";
import { Table, TableBody, TableCell, TableRow } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";

export default function CollapsibleTable({
  headerName,
  specificState,
  commonKeysArr,
}) {
  const [open, setOpen] = useState(headerName === "Essentials" ? true : false);

  return (
    <>
      <Box
        sx={{
          // marginLeft: { xs: "3.7rem", md: "13.2rem" },
          marginTop: "2rem",
          // maxWidth: "33rem",
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
                    <TableRow
                      key={idx}
                      sx={{
                        "&:nth-of-type(odd)": {
                          backgroundColor: "#F5F5F5",
                        },
                        // hide last border
                        "&:last-child td, &:last-child th": {
                          border: 0,
                        },
                      }}
                    >
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
