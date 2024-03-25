import { useState } from "react";
import { Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import CollapsibleTable from "./CollapsibleTable";

export default function Comparison() {
  const navigate = useNavigate();
  const { state } = useLocation();
  if (!state || state.length !== 2) {
    navigate("/");
    return;
  }
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
      {/* <CollapsibleTable headerName="Essentials" state={state} />
      <CollapsibleTable headerName="Performance" state={state} />
      <CollapsibleTable headerName="Supplemental Information" state={state} />
      <CollapsibleTable headerName="Memory Specifications" state={state} />
      <CollapsibleTable headerName="Processor Graphics" state={state} />
      <CollapsibleTable headerName="Expansion Options" state={state} />
      <CollapsibleTable headerName="I/O Specifications" state={state} /> */}
      {state[0]["Package Specifications"] &&
      state[1]["Package Specifications"] ? (
        <CollapsibleTable
          headerName="Package Specifications"
          specificState={[
            state[0]["Package Specifications"],
            state[1]["Package Specifications"],
          ]}
        />
      ) : (
        <></>
      )}
      {/* <CollapsibleTable headerName="Advanced Technologies" state={state} />
      <CollapsibleTable headerName="Security & Reliability" state={state} /> */}
    </>
  );
}
