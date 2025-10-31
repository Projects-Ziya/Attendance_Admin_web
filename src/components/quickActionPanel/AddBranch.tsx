import addicon from "../../assets/add.svg";
import { branchData } from "../../models/quickActionPanel/branchdata";

type BranchCardProps = {
  title: string;
  code: string;
  manager: string;
  phone: string;
  email: string;
  workingHours: string;
  startDate: string;
  status: string;
  address: string;
  link: string;
  icon: string;
  themeColor: string;
};

const BranchCard = ({
  title,
  code,
  manager,
  phone,
  email,
  workingHours,
  startDate,
  status,
  address,
  link,
 icon,
 themeColor,

}: BranchCardProps) => {
  return (
    <div className="rounded-[5px] w-[356px] h-[383px] pb-[50px] bg-white shadow-metrics pl-[34px] pr-[34px] pt-[30px] flex flex-col">
      {/* Header with icon + title */}
   <div className="">
  <img
    src={icon}
    alt="Branch Icon"
    className="w-[55px] h-[55px] mb-[15px]"
  />

  {/* Title + Code together */}
  <h3
    className="text-[16px] font-[600] tracking-[0.08em] leading-[20px] text-gray-800"
    style={{ color: themeColor }}
  >
    {title}
    {/* non-breaking space + hyphen + code */}
    <span className="text-[14px] text-midGray font-[400] tracking-[0.08em] leading-[20px]">
      &nbsp;{code}
    </span>
  </h3>
</div>




      {/* Info */}
     <div className="flex justify-between">
      <p className="text-[14px] text-midGray font-[500] tracking-[0.08em] leading-[16px] ">{manager}</p>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[12px] text-[#00A0E3] tracking-[0.08em]  leading-[16px] underline "
      >
        Google Maps ↗
      </a>
      </div>
      <p className="text-[12px] text-midGray pt-[15px] tracking-[0.08em] leading-[16px]"> {phone}</p>
      <p className="text-[14px] text-midGray pt-[17px] tracking-[0.08em] leading-[16px]">{email}</p>
      <p className="text-[14px] text-midGray  pt-[17px] tracking-[0.08em] leading-[16px]" >{workingHours}</p>
      <div className="flex justify-between pt-[17px]">
      <p className="text-[12px]   tracking-[0.08em] leading-[16px]" style={{ color: themeColor }}>{startDate}</p>
      <p className="text-[12px]   tracking-[0.08em] leading-[16px]" style={{ color: themeColor }}> {status}</p>
      </div>
      <p className="text-[12px] text-midGray leading-[180%] pt-[34px]">{address}</p>
    </div>
  );
};

const AddBranchCard = () => {
  return (
   <div className="rounded-[5px] w-[356px] h-[383px] shadow-metrics bg-white flex flex-col pt-[61px] pl-[34px] pr-[34px] cursor-pointer hover:bg-gray-200 transition">
  <img
    src={addicon}
    alt="Add Branch"
    className="w-[160px] h-[160px] mb-[40px] mx-auto"
  />
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
  return (
    <div className=" h-[363px]  flex gap-[15px]">
      {/* Add New Branch Card */}
      <AddBranchCard />

      {/* Branch Cards from mock data */}
      {branchData.map((branch) => (
        <BranchCard key={branch.id} {...branch} />
      ))}
    </div>
  );
};

export default AddBranch;
