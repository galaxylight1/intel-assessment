import { Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import CollapsibleTable from "./CollapsibleTable";
import { commonKeys } from "../../utils/commonKeys";
import { BarChart } from "@mui/x-charts/BarChart";
import { Grid } from "@mui/material";

let commonKeysArr = [];

const uData = [4000, 3000, 2000, 2780];
const pData = [2400, 1398, 9800, 3908];
const xLabels = ["Page A", "Page B", "Page C", "Page D"];

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
      <Grid container spacing={0}>
        <Grid item md={7}>
          {commonKeysArr.map((key, idx) => {
            if (key === "name") return;

            const obj1 = state[0][`${key}`];
            const obj2 = state[1][`${key}`];
            let innerCommonKeysArr = [];

            // TODO: temporary code
            const doesObjectHasOnlyOneKey = typeof obj1 === "string"; // for name
            if (doesObjectHasOnlyOneKey) {
              innerCommonKeysArr = [obj1, obj2];
            } else innerCommonKeysArr = commonKeys(obj1, obj2);

            if (innerCommonKeysArr.length === 0) return; // no common keys (ex. Supplemental Information)

            return (
              <CollapsibleTable
                key={idx}
                headerName={key === "name" ? "Name" : key}
                specificState={[obj1, obj2]}
                commonKeysArr={innerCommonKeysArr}
              />
            );
          })}
        </Grid>
        <Grid item md={5}>
          <BarChart
            width={600}
            height={300}
            series={[
              { data: pData, label: "pv", id: "pvId" },
              { data: uData, label: "uv", id: "uvId" },
            ]}
            xAxis={[{ data: xLabels, scaleType: "band" }]}
          />
        </Grid>
      </Grid>
    </>
  );
}
