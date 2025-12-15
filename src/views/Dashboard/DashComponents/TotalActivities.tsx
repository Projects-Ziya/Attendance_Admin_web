import React, { useEffect, useState } from "react";
import { LineChart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../../../Api/api";
interface ActivityData {
  designation: string;
  count: number;
}

const TotalActivesCard: React.FC = () => {
  const [data, setData] = useState<ActivityData[]>([]);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
const navigate = useNavigate()
 useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true);

        
        const res = await api.get("/api/todays-employee-count-by-designation/");
        

        setData(res.data.data);
      const totalCount = res.data.data.reduce((sum, item) => sum + item.count, 0);
        setTotalUsers(totalCount);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch activities");
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);
  return (
<div className="w-[17vw]  max-w-[324px] h-[443px]
                rounded-md border border-blue-100 bg-white  p-5 flex flex-col justify-between">
                        <div>
        {/* Header */}
      <div className="flex flex-col items-start gap-5 mb-4 border-b border-b-[#43C8FF] pb-4">
         
          <div className="bg-[#E6F7FF] p-2 rounded-full">
            <LineChart className="text-[#00AEEF] w-6 h-6" />
          </div>
          <h2 className="flex items-center text-[#4D4D4D]  text-[1.25rem] font-semibold">
            Total Actives
            <span className="font-normal ml-1">
              {loading ? "..." : totalUsers}
            </span>

          </h2>
        </div>
           

        {/* List */}
        {loading ? (
          <p className="text-gray-400">Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="space-y-3 text-[1.125rem] text-gray-500">
            {data.map((item, index) => (
              <div key={index} className=" flex justify-between items-center">
                <span className="text-gray-500">{item.designation}</span>
                <span className="  text-gray-500">
                  {item.count} users
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <button onClick={()=>{navigate('/TotalActives')}} className="text-[#909090] text-[18px] font-medium hover:text-ziyablue mt-4 self-start">
        View All
      </button>
    </div>
  );
};

export default TotalActivesCard;
