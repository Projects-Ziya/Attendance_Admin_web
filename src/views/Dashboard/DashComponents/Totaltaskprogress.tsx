import React, { useEffect, useState } from "react";
import api from "../../../Api/api";
import "../../../assets/css/taskProgress.css";
import CircularProgressIndicator from "../../../components/taskProgressComponents/CircularProgressArc";
import TaskProgressCard from "../../../components/taskProgressComponents/TaskProgressCard";
import PieProgress from "../../../components/taskProgressComponents/PieProgress";
import TaskIcon1 from "../../../components/taskProgressComponents/TaskIcon1";
import TaskIcon2 from "../../../components/taskProgressComponents/TaskIcon2";
import TaskIcon3 from "../../../components/taskProgressComponents/TaskIcon3";
import TaskIcon4 from "../../../components/taskProgressComponents/Taskicon4";

const App: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTaskPercentage = async () => {
      try {
        const response = await api.get("/api/taskpercentage/");
        setData(response.data.data);
        console.log('ttttttttttttttt',response.data.data)
      } catch (error) {
        console.error("Error fetching task percentage:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTaskPercentage();
  }, []);

  if (loading) return <p className="text-center">Loading...</p>;
  if (!data) return <p className="text-center">No data available</p>;

  return (
    <div
      className="bg-white rounded-xl shadow-sm p-8 
                w-full max-w-[1469px] overflow-hidden"
    >
      <div className="pt-[10px] pl-[10px] ">
        <PieProgress />
      </div>
      <p className="text-[24px] text-gray-700 pr-[660px] pt-[5px]">
        Today's Tasks Progress
      </p>
      <hr className="mt-[30px] pb-[41px] -mx-8 border-t-[0.1px] border-blue-100" />
      <div className="flex content-center justify-center gap-8">
        <div className="flex flex-col justify-center items-center">
          <CircularProgressIndicator
            percentage={data.on_going || 0}
            color="green"
          />
          <div className="flex justify-center items-center mt-1 pt-1">
            <TaskIcon1 />
            <p className="text-[20px] text-gray-500 ml-1">Ongoing</p>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center">
          <CircularProgressIndicator
            percentage={data.pending || 0}
            color="yellow"
          />
          <div className="flex justify-center items-center mt-1 pt-1">
            <TaskIcon2 />
            <p className="text-[20px] text-gray-500 ml-1">Pending</p>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center">
          <CircularProgressIndicator
            percentage={data.on_hold || 0}
            color="blue"
          />
          <div className="flex justify-center items-center mt-1 pt-1">
            <TaskIcon3 />
            <p className="text-[20px] text-gray-500 ml-1">On Hold</p>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center">
          <CircularProgressIndicator
            percentage={data.overdue || 0}
            color="red"
          />
          <div className="flex justify-center items-center mt-1 pt-1">
            <TaskIcon4 />
            <p className="text-[20px] text-gray-500 ml-1">Overdue</p>
          </div>
        </div>

        <TaskProgressCard completed={data.completed || 0} total={data.total || 0} />
      </div>
    </div>
  );
};

export default App;
