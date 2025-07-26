import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { FaArrowTrendUp } from "react-icons/fa6";
import { HiOutlineArrowTrendingDown } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { useMemo } from "react";
import { motion } from "framer-motion";
import lightMap from "../assets/images/lightMap.png";
import darkMap from "../assets/images/darkMap.png";
import { useAuth } from "./Context";

export default function Dashboard() {
  const { isDarkMode } = useAuth();

  const COLORS = useMemo(
    () => ["#1c1c1c", "#b9edbd", "#b1e3fe", "#95a4fd"],
    []
  );

  const boxes = useMemo(
    () => [
      { name: "Customers", number: "3,781", hike: "+11.01%", link: "/" },
      { name: "Orders", number: "1,219", hike: "-0.03%", link: "/orders" },
      { name: "Revenue", number: "$695", hike: "+15.03%", link: "/" },
      { name: "Growth", number: "30.1%", hike: "+6.08%", link: "/" },
    ],
    []
  );

  const tableHeaders = useMemo(
    () => [
      { name: "Name", key: "name" },
      { name: "Price", key: "price" },
      { name: "Quantity", key: "quantity" },
      { name: "Amount", key: "amount" },
    ],
    []
  );

  const barLineData = useMemo(
    () => [
      { name: "Jan", Actual: 18, Projection: 22 },
      { name: "Feb", Actual: 20, Projection: 25 },
      { name: "Mar", Actual: 22, Projection: 23 },
      { name: "Apr", Actual: 24, Projection: 27 },
      { name: "May", Actual: 15, Projection: 20 },
      { name: "Jun", Actual: 19, Projection: 23 },
    ],
    []
  );

  const revenueData = useMemo(
    () => [
      { title: "Current Week", value: "$58,211" },
      { title: "Previous Week", value: "$68,768" },
    ],
    []
  );

  const PieChartData = useMemo(
    () => [
      { name: "Direct", value: 300.56 },
      { name: "Affilliate", value: 135.18 },
      { name: "Sponsored", value: 154.02 },
      { name: "E-mail", value: 48.96 },
    ],
    []
  );

  const revenueDataCountry = useMemo(
    () => [
      { location: "New York", revenue: 72 },
      { location: "San Francisco", revenue: 39 },
      { location: "Sydney", revenue: 25 },
      { location: "Singapore", revenue: 61 },
    ],
    []
  );

  const tableData = useMemo(() => {
    const baseData = [
      {
        name: "ASOS Ridley High Waist",
        price: "$79.49",
        quantity: 82,
        amount: "$6518.18",
      },
      {
        name: "Marco Lightweight Shirt",
        price: "$128.50",
        quantity: 37,
        amount: "$4754.50",
      },
      {
        name: "Half Sleeve Shirt",
        price: "$39.99",
        quantity: 64,
        amount: "$2559.36",
      },
      {
        name: "Lightweight Jacket",
        price: "$20.00",
        quantity: 184,
        amount: "$3680.00",
      },
      {
        name: "Long Sleeve Shirt",
        price: "$25.50",
        quantity: 10,
        amount: "$255.00",
      },
      {
        name: "Cotton T-Shirt",
        price: "$10.99",
        quantity: 184,
        amount: "$2023.16",
      },
    ];
    return Array(3).fill(baseData).flat();
  }, []);

  const cardStyle = (index) => {
    if (index === 1 || index === 2) {
      return isDarkMode
        ? "bg-zinc-800 hover:bg-zinc-700 text-white fade-in"
        : "bg-zinc-100 hover:bg-zinc-200 text-black fade-out";
    }
    return "bg-blue-100 hover:bg-blue-200 text-black";
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`p-4 font-inter ${
        isDarkMode ? "bg-zinc-900 text-white" : "bg-white text-zinc-900"
      }`}
    >
      <div className="font-bold w-full py-6 px-1">eCommerce</div>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex flex-wrap gap-4 w-full md:w-1/2">
          {boxes.map((box, index) => (
            <Link
              to={box.link}
              key={index}
              className={`${cardStyle(
                index
              )} p-6 rounded-3xl w-full md:w-[47%] transition-all duration-1000 group`}
            >
              <div className="text-md font-bold">{box.name}</div>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-2xl font-bold">{box.number}</span>
                <span
                  className={`text-sm flex items-center ${
                    box.hike.startsWith("-") ? "text-red-500" : "text-green-500"
                  }`}
                >
                  {box.hike}
                  {box.hike.startsWith("+") ? (
                    <FaArrowTrendUp className="ml-1 group-hover:translate-y-[-10px] transition duration-500" />
                  ) : (
                    <HiOutlineArrowTrendingDown className="ml-1 group-hover:translate-y-[10px] transition duration-500" />
                  )}
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div
          className={`${
            isDarkMode ? "bg-zinc-800" : "bg-zinc-100"
          } p-6 rounded-3xl w-full md:w-1/2`}
        >
          <h3 className="font-bold mb-4">Projections vs Actuals</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barLineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Actual" stackId="a" fill="#a8c5da" />
              <Bar
                dataKey="Projection"
                stackId="a"
                fill="#cedfe9"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mt-6">
        <div
          className={`${
            isDarkMode ? "bg-zinc-800" : "bg-zinc-100"
          } p-8 rounded-3xl w-full md:w-[70%]`}
        >
          <div className="flex flex-wrap items-center mb-4 gap-4">
            <h3 className="font-bold">Revenue</h3>
            {revenueData.map((data) => (
              <div key={data.title} className="flex items-center space-x-2">
                <span
                  className={`w-2 h-2 rounded-full ${
                    isDarkMode ? "bg-white" : "bg-black"
                  }`}
                />
                <span>{data.title}</span>
                <span className="font-bold">{data.value}</span>
              </div>
            ))}
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={barLineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="Projection"
                stroke={isDarkMode ? "#4fc3f7" : "#8884d8"}
                activeDot={{ r: 8 }}
              />
              <Line
                type="monotone"
                dataKey="Actual"
                stroke={isDarkMode ? "#ff7043" : "#82ca9d"}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div
          className={`${
            isDarkMode ? "bg-zinc-800" : "bg-zinc-100"
          } p-6 rounded-3xl w-full md:w-[30%]`}
        >
          <h6 className="font-semibold text-center mb-4">
            Revenue by Location
          </h6>
          <div className="relative w-full h-56 mb-4">
            <img
              src={isDarkMode ? darkMap : lightMap}
              alt="Map"
              className="w-full h-full object-cover rounded-3xl"
            />
          </div>
          {revenueDataCountry.map((loc) => (
            <div key={loc.location} className="mb-2">
              <div className="flex justify-between text-sm">
                <span>{loc.location}</span>
                <span>{loc.revenue}K</span>
              </div>
              <div
                className={`${
                  isDarkMode ? "bg-zinc-700" : "bg-gray-200"
                } w-full h-2 rounded-full`}
              >
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: `${loc.revenue}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-6 mt-6">
        <div
          className={`${
            isDarkMode ? "bg-zinc-800" : "bg-zinc-100"
          } p-6 rounded-3xl w-full md:w-[70%] overflow-y-scroll`}
          style={{ maxHeight: 400 }}
        >
          <div className="font-bold mb-3">Top Selling Products</div>
          <table className="min-w-full table-auto text-left border-collapse">
            <thead>
              <tr className="text-sm border-b-2 border-[#a9aaac]">
                {tableHeaders.map((header) => (
                  <th key={header.key} className="px-4 py-2">
                    {header.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.map((item, idx) => (
                <tr key={idx}>
                  {tableHeaders.map((header) => (
                    <td key={header.key} className="px-4 py-2">
                      {item[header.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div
          className={`${
            isDarkMode ? "bg-zinc-800" : "bg-zinc-100"
          } p-6 rounded-3xl w-full md:w-[30%]`}
        >
          <div className="font-bold mb-3">Total Sales</div>
          <ResponsiveContainer width="100%" height={190}>
            <PieChart>
              <Pie
                data={PieChartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={3}
                dataKey="value"
              >
                {PieChartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          {PieChartData.map((data, index) => (
            <div key={data.name} className="flex justify-between py-1">
              <div className="flex items-center gap-2">
                <span
                  style={{
                    backgroundColor: COLORS[index],
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    display: "inline-block",
                  }}
                />
                <span>{data.name}</span>
              </div>
              <span>${data.value}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
