import { ArrowLeft } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import dashicon from "../../assets/images/icons/dashicon.svg";

const DashboardHeader: React.FC = () => {
    const navigate = useNavigate();

    return (
     <div className="flex items-center text-gray-600 my-6">
     
      <button
        onClick={() => navigate(-1)}
        className="flex border px-4 py-1 items-center space-x-1 text-sm font-medium hover:text-gray-800 rounded bg-white"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back</span>
      </button>

    
      <div className="flex items-center gap-2 ml-8">
        <img
          src={dashicon}
          alt="Dashboard"
          className="w-7 h-7 text-blue-500 bg-blue-100 rounded-full p-1"
        />
        <span className="text-sm font-medium text-gray-400">
          Employees Dashboard
        </span>
      </div>
    </div>
  );
};

export default DashboardHeader;


