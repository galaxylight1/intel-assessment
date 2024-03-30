import { Box, Typography, CircularProgress } from "@mui/material";
import PieChartIcon from "@mui/icons-material/PieChart";
import { ResponsivePie } from "@nivo/pie";
import { useTheme } from "@mui/material/styles";
import { useState, useEffect } from "react";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

const PieChart = ({ open, matches }) => {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [pieData, setPieData] = useState([]);

  useEffect(() => {
    fetch("https://intel-assessment-backend.vercel.app/pie")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const total = data.totalCount;
        const percent1 = data.desktopCount / total;
        const percent2 = data.serverCount / total;
        const percent3 = data.mobileCount / total;
        const percent4 = data.workstationCount / total;

        const tempPieData = [
          {
            id: "desktop",
            label: "Desktop",
            value: percent1,
            color: "hsl(242, 70%, 50%)",
          },

          {
            id: "server",
            label: "Server",
            value: percent2,
            color: "hsl(348, 70%, 50%)",
          },
          {
            id: "mobile",
            label: "Mobile",
            value: percent3,
            color: "hsl(237, 70%, 50%)",
          },
          {
            id: "workstation",
            label: "Workstation",
            value: percent4,
            color: "hsl(348, 70%, 50%)",
          },
        ];

        setPieData(tempPieData);
        setIsLoading(false);
      })
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  return (
    <>
      <Typography
        variant="h6"
        sx={{
          marginLeft: matches
            ? open
              ? { xs: "12.5rem", md: "200px" }
              : { xs: "50px", md: "50px" }
            : { xs: "50px", md: "50px" },
          marginTop: "5rem",
          marginBottom: "1rem",
          fontSize: "2rem",
          color: "#0067B4",
          display: "flex",
          alignItems: "center",
          transition: theme.transitions.create("margin-left", {
            // TODO: club this together in a styles object
            easing: theme.transitions.easing.easeOut,
            duration: 300,
          }),
        }}
      >
        <PieChartIcon sx={{ fontSize: "2.6rem", mr: "0.5rem" }} /> Pie
        Visualization
      </Typography>
      <Box
        sx={{
          height: "75vh",
          paddingLeft: matches
            ? open
              ? { xs: "12.5rem", md: "200px" }
              : { xs: "50px", md: "50px" }
            : { xs: "50px", md: "50px" },
          paddingRight: "1.5rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          transition: theme.transitions.create("padding-left", {
            easing: theme.transitions.easing.easeOut,
            duration: 300,
          }),
        }}
      >
        {isLoading ? (
          <CircularProgress />
        ) : (
          <ResponsivePie
            data={pieData}
            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
            innerRadius={0}
            padAngle={0.7}
            colors={{ scheme: "category10" }}
            cornerRadius={3}
            activeOuterRadiusOffset={8}
            borderWidth={1}
            valueFormat=" >-.2%"
            borderColor={{
              from: "color",
              modifiers: [["darker", 0.2]],
            }}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextColor="#333333"
            arcLinkLabelsThickness={3}
            arcLinkLabelsColor={{ from: "color" }}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor={{
              from: "color",
              modifiers: [["darker", 2]],
            }}
            defs={[
              {
                id: "dots",
                type: "patternDots",
                background: "inherit",
                color: "rgba(255, 255, 255, 0.3)",
                size: 4,
                padding: 1,
                stagger: true,
              },
              {
                id: "lines",
                type: "patternLines",
                background: "inherit",
                color: "rgba(255, 255, 255, 0.3)",
                rotation: -45,
                lineWidth: 6,
                spacing: 10,
              },
            ]}
            fill={[
              // {
              //   match: {
              //     id: "desktop",
              //   },
              //   id: "squares",
              // },
              // {
              //   match: {
              //     id: "mobile",
              //   },
              //   id: "dots",
              // },
              {
                match: {
                  id: "server",
                },
                id: "lines",
              },
            ]}
            legends={[
              {
                anchor: "bottom",
                direction: "row",
                justify: false,
                translateX: 30,
                translateY: 56,
                itemsSpacing: 0,
                itemWidth: 100,
                itemHeight: 18,
                itemTextColor: "#999",
                itemDirection: "left-to-right",
                itemOpacity: 1,
                symbolSize: 18,
                symbolShape: "circle",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemTextColor: "#000",
                    },
                  },
                ],
              },
            ]}
          />
        )}
      </Box>
    </>
  );
};

export default PieChart;
