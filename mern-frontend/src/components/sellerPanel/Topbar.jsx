import { Search } from "lucide-react";

const Topbar = () => {
  return (
    <div className="py-5">
      <header className="flex justify-between items-center mb-3 ">
        {/* Search bar */}
        <div className="relative w-1/3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2  shadow bg-white  rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Profile Section */}
        <div className="flex items-center gap-3">
          <img
            src="https://via.placeholder.com/40"
            alt="profile"
            className="w-10 h-10 rounded-full border  border-gray-200"
          />
          <div className="flex flex-col">
            <span className="font-medium text-gray-800">Bishop Healhmund</span>
            <span className="text-sm text-gray-400">
              bishopheal28@gmail.com
            </span>
          </div>
        </div>
      </header>
      <span>
        <h1 className="capitalize text-3xl text-gray-700 mb-1">
          welcome back, <strong>bishop!</strong>
        </h1>
        <p className="capitalize text-[15px] text-gray-800">
          here's is your current sales overview
        </p>
      </span>
    </div>
  );
};

export default Topbar;
