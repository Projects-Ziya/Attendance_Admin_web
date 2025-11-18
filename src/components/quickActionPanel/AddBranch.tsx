import React, { useState, useEffect } from "react";
import addicon from "../../assets/add.svg";
import api from "../../Api/api";
import AddBranchModal from "./AddBranchModal";
import buildingBlue from "../../assets/buildingblue.svg"; // default icon

const BranchCard = (props: any) => {
  const {
    name,
    company_id,
    phone,
    email,
    starting_time,
    closing_time,
    address,
    status,
    location,
    id,
  } = props;

  return (
    <div className="rounded-[5px] w-[345px] h-[383px] pb-[50px] bg-white shadow-[0px_0px_2px_0px_#00000040]  pl-[34px] pr-[34px] pt-[30px] flex flex-col">
      <img src={buildingBlue} alt="Branch Icon" className="w-[55px] h-[55px] mb-[15px]" />

      <h3 className="text-[16px] font-[600] tracking-[0.08em] leading-[20px] text-[#00A0E3]">
        {name}
        <span className="text-[14px] text-midGray font-[400] tracking-[0.08em] leading-[20px]">
          &nbsp;({company_id})
        </span>
      </h3>

      <div className="flex justify-between">
        <p className="text-[14px] text-midGray font-[500] tracking-[0.08em] leading-[16px] ">
          {location}
        </p>
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[12px] text-[#00A0E3] tracking-[0.08em] leading-[16px] underline"
        >
          Google Maps ↗
        </a>
      </div>

      <p className="text-[12px] text-midGray pt-[15px] tracking-[0.08em] leading-[16px]">
        {phone}
      </p>

      <p className="text-[14px] text-midGray pt-[17px] tracking-[0.08em] leading-[16px]">
        {email}
      </p>

      <p className="text-[14px] text-midGray pt-[17px] tracking-[0.08em] leading-[16px]">
        {starting_time} – {closing_time}
      </p>

      <div className="flex justify-between pt-[17px]">
        <p className="text-[12px] tracking-[0.08em] leading-[16px] text-[#00A0E3]">
          Active
        </p>
        <p className="text-[12px] tracking-[0.08em] leading-[16px] text-[#00A0E3]">
          {status}
        </p>
      </div>

 
      <p className="text-[12px] text-midGray leading-[180%] pt-[34px]">
        {address}
      </p>
    </div>
  );
};

const AddBranchCard = ({ onAdd }: any) => {
  return (
    <div
      className="rounded-[5px] w-[345px] h-[383px] shadow-[0px_0px_2px_0px_#00000040]  bg-white flex flex-col pt-[61px] pl-[34px] pr-[34px] cursor-pointer hover:bg-gray-200 transition"
      onClick={onAdd}
    >
      <img src={addicon} alt="Add Branch" className="w-[160px] h-[160px] mb-[40px] mx-auto" />
      <h1 className="font-[500] text-[16px] text-center leading-[16px] mb-[20px] tracking-[0.08em] text-[#00A0E3]">
        Add New Branch
      </h1>
      <p className="text-[14px] text-midGray font-[400] leading-[16px] tracking-[0.08em] text-center">
        Click to create a new branch
      </p>
    </div>
  );
};

const AddBranch = () => {
  const [showModal, setShowModal] = useState(false);
  const [branches, setBranches] = useState<any[]>([]);

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const res = await api.get("/api/create-list-branch/");
        setBranches(res.data.data); // ✅ API data only
      } catch (err) {
        console.log("API failed");
      }
    };
    fetchBranches();
  }, []);

  const handleBranchCreated = (newBranch: any) => {
    setBranches((prev) => [newBranch, ...prev]);
  };

  return (
    <div className="h-[363px] flex gap-[10px] flex-wrap">
      <AddBranchCard onAdd={() => setShowModal(true)} />

      {branches.map((branch: any) => (
        <BranchCard key={branch.id} {...branch} />
      ))}

      {showModal && (
        <AddBranchModal
          onClose={() => setShowModal(false)}
          onBranchCreated={handleBranchCreated}
        />
      )}
    </div>
  );
};

export default AddBranch;
