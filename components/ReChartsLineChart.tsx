"use client";

import { LineChartProps } from "@/types";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const ReChartsLineChart = ({ data }: LineChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={data}>
        <XAxis
          dataKey="day"
          className="fill-muted-foreground"
          tick={{ fill: "muted-foreground" }}
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          className="fill-muted-foreground"
          tick={{ fill: "muted-foreground" }}
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip
          wrapperStyle={{
            borderRadius: "6px",
            boxShadow: "0 1px 3px 0px hsl(215.4 16.3% 46.9%)",
          }}
          contentStyle={{
            borderRadius: "6px",
          }}
          labelStyle={{ color: "black" }}
        />

        <Line
          type="monotone"
          dataKey="activities"
          className="fill-primary"
          strokeWidth={3}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ReChartsLineChart;
