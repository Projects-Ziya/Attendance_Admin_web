import { useEffect, useState } from "react";
import api from "../../Api/api";

type MetricsCardProps = {
  description: string; // e.g. "Total Hours Today"
};

const MetricsCard = ({ description }: MetricsCardProps) => {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await api.get("/api/working-hoursallemp/");
        setData(res.data);
      } catch (err: any) {
        console.error("Error fetching work hours:", err);
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading)
    return (
      <div className="bg-white rounded-[10px] shadow p-6 text-center text-gray-500">
        Loading work hours...
      </div>
    );

  if (error)
    return (
      <div className="bg-white rounded-[10px] shadow p-6 text-center text-red-500">
        {error}
      </div>
    );

  if (!data)
    return (
      <div className="bg-white rounded-[10px] shadow p-6 text-center text-gray-500">
        No data available
      </div>
    );

  let displayValue = "0";

  if (description.toLowerCase().includes("today")) {
    displayValue = `${data.daily?.total_hours_today ?? 0} hrs`;
  } else if (description.toLowerCase().includes("week")) {
    displayValue = `${data.weekly?.total_hours_weekly ?? 0} hrs`;
  } else if (description.toLowerCase().includes("month")) {
    displayValue = `${data.monthly?.total_hours_monthly ?? 0} hrs`;
  } else if (description.toLowerCase().includes("overtime")) {
  displayValue = `${data.monthly?.total_overtime_hours_monthly ?? 0} hrs`;
}


  return (
    <div className="flex flex-col bg-[#FCFCFC] shadow-[0px_0px_2px_0px_#00000040] rounded-[10px] w-[356px] h-[185px] pt-[59.5px] pl-[32px]">
      {/* Value */}
      <div className="flex items-center">
        <span className="font-[600] text-[28px] leading-[66px] tracking-[0.08em] text-lightBlue">
          {displayValue}
        </span>
      </div>

      {/* Description */}
      <p className="text-midGray text-[14px] font-[400] pb-[58px] leading-[27px] tracking-[0.08em]">
        {description}
      </p>
    </div>
  );
};

export default MetricsCard;
