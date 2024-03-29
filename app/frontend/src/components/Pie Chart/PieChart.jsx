import { Box, Typography } from "@mui/material";
import PieChartIcon from "@mui/icons-material/PieChart";
import { ResponsivePie } from "@nivo/pie";
import { useTheme } from "@mui/material/styles";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

const data = [
  {
    id: "java",
    label: "java",
    value: 0.33,
    color: "hsl(242, 70%, 50%)",
  },
  {
    id: "sass",
    label: "sass",
    value: 0.335,
    color: "hsl(237, 70%, 50%)",
  },
  {
    id: "javascript",
    label: "javascript",
    value: 0.345,
    color: "hsl(348, 70%, 50%)",
  },
];

const PieChart = ({ open, matches }) => {
  const theme = useTheme();

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
        <PieChartIcon sx={{ fontSize: "3rem", mr: "0.5rem" }} /> Pie Chart
        Analysis
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
          transition: theme.transitions.create("padding-left", {
            easing: theme.transitions.easing.easeOut,
            duration: 300,
          }),
        }}
      >
        <ResponsivePie
          data={data}
          margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
          innerRadius={0.4}
          padAngle={0.7}
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
          arcLinkLabelsThickness={2}
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
            {
              match: {
                id: "ruby",
              },
              id: "dots",
            },
            {
              match: {
                id: "c",
              },
              id: "dots",
            },
            {
              match: {
                id: "go",
              },
              id: "dots",
            },
            {
              match: {
                id: "python",
              },
              id: "dots",
            },
            {
              match: {
                id: "scala",
              },
              id: "lines",
            },
            {
              match: {
                id: "lisp",
              },
              id: "lines",
            },
            {
              match: {
                id: "elixir",
              },
              id: "lines",
            },
            {
              match: {
                id: "javascript",
              },
              id: "lines",
            },
          ]}
          legends={[
            {
              anchor: "bottom",
              direction: "row",
              justify: false,
              translateX: 0,
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
      </Box>
    </>
  );
};

export default PieChart;
