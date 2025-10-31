import React, { useEffect, useState } from "react";
import api from "../../../Api/api";
import {
  BarChart,
  Bar,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";
import { Users, X } from "lucide-react";
import { Link } from "react-router-dom";

interface ChartItem {
  name: string;
  value: number;
  fill: string;
}

const EmployeeChart: React.FC = () => {
  const [chartData, setChartData] = useState<ChartItem[]>([]);
  const [totalEmployees, setTotalEmployees] = useState<number>(0);
  const [adminCount, setAdminCount] = useState<number>(0);
  const [selectedRole, setSelectedRole] = useState<ChartItem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 🎨 Function to generate random hex color
  const getRandomColor = () => {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  };

  useEffect(() => {
    const fetchEmployeeCounts = async () => {
      try {
        setLoading(true);
        const res = await api.get("/api/employee-designation-counts/");

        const rawData = res.data.data;

        const dataWithColors: ChartItem[] = rawData.map(
          (item: { designation: string; count: number }) => ({
            name: item.designation,
            value: item.count,
            fill: getRandomColor(), // 🌈 random color for each designation
          })
        );

        setChartData(dataWithColors);

        setTotalEmployees(
          dataWithColors.reduce((sum, item) => sum + item.value, 0)
        );

        setAdminCount(
          dataWithColors.find(
            (item) => item.name.toLowerCase() === "admin"
          )?.value || 0
        );
      } catch (err) {
        console.error("Failed to fetch employee data:", err);
        setError("Failed to fetch employee data");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployeeCounts();
  }, []);



  return (
    <>
      {/* Chart Card */}
     <div
  className=" rounded-md border border-blue-100 bg-white  font-poppins p-6 mx-auto flex flex-col 
             w-[32vw]  max-w-[614px] h-[665px]  "
>
        {/* Header */}
        <div className="border-b border-blue-100 pb-4 mb-4">
          <div className="bg-[#E6F7FF] p-2 rounded-full mb-2 w-fit">
            <Users className="text-[#00AEEF] w-7 h-7" />
          </div>
          <div className="flex items-center text-[#4D4D4D] text-[20px] font-semibold">
            Total Employees
            <span className="ml-2 font-normal text-[18px]">{totalEmployees}</span>
          </div>
        </div>

        {/* Bar Graph */}
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} barGap={6}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <YAxis domain={[0, 10]} tickCount={6} tick={{ fontSize: 12 }} />
              <Bar dataKey="value" barSize={20} radius={[4, 4, 0, 0]}>
                {chartData.map((entry, index) => (
               <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="grid grid-cols-3 gap-3 mt-6 text-[12px] text-[#909090]">
          {chartData.map((item, index) => (
            <div
              key={index}
              className="flex items-center space-x-2 cursor-pointer hover:text-[#333]"
              onClick={() => setSelectedRole(item)}
            >
              <span
                className="w-3 h-3 rounded-sm"
                style={{ backgroundColor : item.fill }}
              ></span>
              <span className="text-[14px]">{item.name}</span>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-auto flex justify-end">
          <Link to="/Employee-Dashboard">
          <button
            className="text-[#909090] text-[18px] font-medium hover:text-ziyablue"
            >
            View All
          </button>
            </Link>
        </div>
      </div>

      {selectedRole && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div
            className="rounded-lg shadow-lg font-poppins p-6 relative"
            style={{ width: "500px", backgroundColor: "#FFFFFF" }}
          >
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-black"
              onClick={() => setSelectedRole(null)}
            >
              <X size={20} />
            </button>

            <h2 className="text-lg font-semibold text-[#00AEEF] mb-2">
              {selectedRole.name}
            </h2>

            <p className="text-md text-gray-800 mb-1">
              {selectedRole.name}:{" "}
              <span className="font-semibold">{selectedRole.value}</span>
            </p>
            {selectedRole.name.toLowerCase() !== "admin" && (
              <p className="text-md text-gray-800 mb-4">
                Admin: <span className="font-semibold">{adminCount}</span>
              </p>
            )}

            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[selectedRole]}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <YAxis domain={[0, 10]} tick={{ fontSize: 12 }} />
                  <Bar dataKey="value" barSize={30} radius={[4, 4, 0, 0]}>
                    <Cell fill={selectedRole.fill} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EmployeeChart;