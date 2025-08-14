// src/components/SalesChart.jsx
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { FaBars } from "react-icons/fa";
import { IndianRupee } from "lucide-react";

const data = [
  { month: "Jun", revenue: 15000, orders: 5000 },
  { month: "Jul", revenue: 10000, orders: 8000 },
  { month: "Aug", revenue: 5800, orders: 6800 },
  { month: "Sep", revenue: 9000, orders: 6000 },
  { month: "Oct", revenue: 17000, orders: 7000 },
  { month: "Nov", revenue: 16000, orders: 9000 },
  { month: "Dec", revenue: 18000, orders: 12000 },
  { month: "Jan", revenue: 20000, orders: 15000 },
];

const SalesChart = () => {
  return (
    <div className="bg-white shadow rounded-lg p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-2 ">
        <h3 className="font-semibold text-lg">Sales Overtime</h3>
        <FaBars className="text-gray-600 cursor-pointer" />
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <XAxis
            dataKey="month"
            tick={{ fill: "#555" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
            tick={{ fill: "#555" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "white",
              borderRadius: "8px",
              border: "1px solid #eee",
            }}
            formatter={(value) => [`$${(value / 1000).toFixed(1)}k`, ""]}
          />
          <Legend
            verticalAlign="top"
            align="right"
            iconType="circle"
            wrapperStyle={{
              paddingBottom: "20px",
            }}
          />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#C084FC"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
            name="Revenue"
          />
          <Line
            type="monotone"
            dataKey="orders"
            stroke="#60A5FA"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
            name="Order"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesChart;
