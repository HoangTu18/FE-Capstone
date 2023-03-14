import React from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function Chart({ data }) {
  console.log(data);
  return (
    <ResponsiveContainer width="100%" aspect={3}>
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="orderday" />
        <YAxis />
        <Legend />
        <Bar dataKey="totalPrice" fill="#8884d8" />
        <Bar dataKey="totalQuantity" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
}
