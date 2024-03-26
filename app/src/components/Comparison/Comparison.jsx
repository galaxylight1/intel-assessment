import { Typography, Grid } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import CollapsibleTable from "./CollapsibleTable";
import { commonKeys } from "../../utils/commonKeys";
import { BarChart } from "@mui/x-charts/BarChart";
import BarChartIcon from "@mui/icons-material/BarChart";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import SquareIcon from "@mui/icons-material/Square";

let commonKeysArr = [];
const labels = ["# of Cores", "Processor Base Frequency", "Cache"];

export default function Comparison() {
  const navigate = useNavigate();
  const { state } = useLocation();
  if (!state || state.length !== 2) {
    navigate("/");
    return;
  }

  let barCharts = [];
  let barChartData = {}; // initialize bar chart, since barChartData can be derived from 'state', it will not be it's own state

  const obj1 = state[0];
  const obj2 = state[1];
  commonKeysArr = commonKeys(obj1, obj2);

  // for bar chart
  if (commonKeysArr.includes("Performance")) {
    const innerObj1 = state[0]["Performance"];
    const innerObj2 = state[1]["Performance"];

    labels.map((label) => {
      if (!innerObj1[label] || !innerObj2[label]) return; // if the value doesn't exist in any of the objects (obj1 and obj2) then we can skip it because comparison is not possible
      // barChartData = {}; // reset

      // console.log(key);
      let split1 = innerObj1[label].split(" ");
      let split2 = innerObj2[label].split(" ");
      let barChartArr1 = [split1 ? split1[0] : innerObj1[label]];
      let barChartArr2 = [split2 ? split2[0] : innerObj2[label]];
      // console.log(barChartArr1, barChartArr2);

      const unit1 = split1 ? split1[1] : "";
      const unit2 = split2 ? split2[1] : "";

      barChartData = {
        isVisible: unit1 === unit2 ? true : false, // we only show bar chart if both units are same
        aData: barChartArr1,
        bData: barChartArr2,
        unit: unit1 ? unit1 : "Unit",
        name: [label],
      };

      barCharts.push({ ...barChartData });
    });
  }

  return (
    <>
      <Typography
        variant="h6"
        sx={{
          marginLeft: { xs: "3.2rem", md: "12.7rem" },
          marginTop: "5rem",
          marginBottom: "1rem",
          fontSize: "2rem",
          color: "#0067B4",
          display: "flex",
          alignItems: "center",
        }}
      >
        <BarChartIcon sx={{ fontSize: "3rem", mr: "0.5rem" }} /> Compare
        Products
      </Typography>
      <Typography
        sx={{
          marginLeft: { xs: "3.5rem", md: "13rem" },
          marginTop: "1rem",
          marginBottom: "0.5rem",
          fontSize: "1.1rem",
          color: "#0067B4",
          display: "flex",
          alignItems: "center",
        }}
      >
        <SquareIcon sx={{ color: "#05B1AF", mr: "0.5rem" }} />
        {state[0].name} <CompareArrowsIcon sx={{ mr: "1rem", ml: "1rem" }} />{" "}
        <SquareIcon sx={{ color: "#2D96FF", mr: "0.5rem" }} />
        {state[1].name}
      </Typography>
      <Grid
        container
        width="100vw"
        // justifyContent="space-between"
        sx={{
          paddingLeft: { xs: "3.7rem", md: "13.2rem" },
          paddingRight: "1.5rem",
          display: "flex",
        }}
      >
        {barCharts.map((barChartData, idx) => {
          if (barChartData.isVisible) {
            return (
              <Grid key={idx} item mt={3} md={6} xs={12}>
                <BarChart
                  // width={570}
                  height={500}
                  series={[
                    {
                      data: barChartData.aData,
                      // label: state[0].name,
                      id: "aId",
                    },
                    {
                      data: barChartData.bData,
                      // label: state[1].name,
                      id: "bId",
                    },
                  ]}
                  xAxis={[{ data: barChartData.name, scaleType: "band" }]}
                  yAxis={[{ label: barChartData.unit }]}
                  grid={{ horizontal: true }}
                />
              </Grid>
            );
          } else return <></>;
        })}
        <Grid item md={6} xs={12}>
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
      </Grid>
    </>
  );
}
