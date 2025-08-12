import { FaClipboardList, FaDatabase, FaExpand } from "react-icons/fa";

const stats = [
  {
    title: "AVG. Order Value",
    value: "$ 77.21",
    change: "+ 3.16%",
    changeColor: "text-green-500",
    icon: <FaDatabase />,
    bg: "bg-gray-900 text-gray-100",
  },
  {
    title: "Total Orders",
    value: "$ 2,107",
    change: "- 1.18%",
    changeColor: "text-red-500",
    icon: <FaClipboardList />,
    bg: "bg-white text-gray-800",
  },
  {
    title: "Lifetime Value",
    value: "$ 653",
    change: "+ 2.24%",
    changeColor: "text-green-500",
    icon: <FaExpand />,
    bg: "bg-white text-gray-800",
  },
];

export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4   w-full">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`${stat.bg} rounded-lg shadow-md p-4 flex flex-col justify-between `}
        >
          {/* Top Section */}
          <div className="flex justify-between items-center ">
            <h2 className="text-sm font-medium uppercase">{stat.title}</h2>
            <div className="text-lg">{stat.icon}</div>
          </div>

          {/* Value */}
          <p className="text-2xl font-bold mt-2 ">{stat.value}</p>

          {/* Change Info */}
          <p className={`text-sm mt-1 ${stat.changeColor} `}>
            {stat.change} <span className="text-gray-500">From last month</span>
          </p>
        </div>
      ))}
    </div>
  );
}
