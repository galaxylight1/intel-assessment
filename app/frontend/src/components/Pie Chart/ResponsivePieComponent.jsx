import { ResponsivePie } from "@nivo/pie";

export default function ResponsivePieComponent({
  data,
  theme,
  legendSpacing,
  arcLinkLabelsOffset,
  arcLinkLabelsStraightLength,
}) {
  return (
    <ResponsivePie
      data={data}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0}
      padAngle={0.7}
      colors={{ scheme: theme }}
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
      arcLinkLabelsOffset={arcLinkLabelsOffset}
      arcLinkLabelsStraightLength={arcLinkLabelsStraightLength}
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
            id: "Not Supported",
          },
          id: "dots",
        },
        {
          match: {
            id: "Announced",
          },
          id: "lines",
        },
        {
          match: {
            id: "Server",
          },
          id: "lines",
        },
      ]}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          // translateX: -200,
          translateY: 56,
          itemsSpacing: 10,
          itemWidth: 100,
          itemHeight: 18,
          itemTextColor: "#999",
          itemDirection: "left-to-right",
          itemOpacity: 1,
          symbolSize: 18,
          symbolShape: "square",
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
  );
}
