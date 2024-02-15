"use client";

import { BarChartProps } from "@/types";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

export function RechartsBarChart({ data }: BarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          className="fill-muted-foreground"
          tick={{ fill: "muted-foreground" }}
        />
        <YAxis
          fontSize={12}
          tickLine={false}
          axisLine={false}
          className="fill-muted-foreground"
          tick={{ fill: "muted-foreground" }}
        />
        <Bar
          dataKey="total"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
