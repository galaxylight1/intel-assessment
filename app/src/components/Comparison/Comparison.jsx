import { useState } from "react";
import { Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import CollapsibleTable from "./CollapsibleTable";
import { commonKeys } from "../../utils/commonKeys";

let commonKeysArr = [];

export default function Comparison() {
  const navigate = useNavigate();
  const { state } = useLocation();
  if (!state || state.length !== 2) {
    navigate("/");
    return;
  }

  const obj1 = state[0];
  const obj2 = state[1];
  commonKeysArr = commonKeys(obj1, obj2);
  console.log("## state -> ", state);
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

      {commonKeysArr.map((key, idx) => {
        if (key === "name") return;
        return (
          <CollapsibleTable
            key={idx}
            headerName={key}
            specificState={[state[0][`${key}`], state[1][`${key}`]]}
          />
        );
      })}
    </>
  );
}
