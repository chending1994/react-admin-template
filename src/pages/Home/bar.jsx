import React from "react";
import { Chart, Tooltip, Interval } from "bizcharts";

export default class Bar extends React.Component {
  render() {
    const data = [
      { year: "1951 年", sales: 38 },
      { year: "1952 年", sales: 52 },
      { year: "1956 年", sales: 61 },
      { year: "1957 年", sales: 45 },
      { year: "1958 年", sales: 48 },
      { year: "1959 年", sales: 38 },
      { year: "1960 年", sales: 38 },
      { year: "1962 年", sales: 38 },
    ];
    return (
      <div style={{ width: "100%" }}>
        <Chart
          height={400}
          autoFit
          data={data}
          interactions={["active-region"]}
          padding={[30, 30, 30, 50]}
        >
          <Interval position="year*sales" />
          <Tooltip shared />
        </Chart>
      </div>
    );
  }
}
