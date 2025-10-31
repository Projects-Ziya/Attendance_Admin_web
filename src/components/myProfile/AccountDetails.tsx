// AccountDetails.tsx
import type { FC } from "react";
import type { Profile } from "../../viewmodels/myProfile/useProfile"; 
import p3 from "../../assets/icons/person-icon.png";
import p4 from "../../assets/icons/id-icon.png";
import p5 from "../../assets/icons/job-icon.png";
import p6 from "../../assets/icons/department-icon.png";

interface AccountDetailsProps {
  profile: Profile;
}

const AccountDetails: FC<AccountDetailsProps> = ({ profile }) => {
  return (
    <div className="bg-[#FCFCFC] border-[#D9D9D9] border-[0.5px] rounded-[8px] 
    py-3 px-5 lg:py-5 lg:px-7 xl:py-7 xl:px-12 w-full max-w-[1000px]">
      <h3 className="text-[16px] 2xl:text-[18px] font-medium text-[#00A0E3]">
        Account Details
      </h3>

      <div className="space-y-3 xl:space-y-6 flex flex-col justify-center 
      font-[400px] text-[#4D4D4D] h-full text-[14px] mb-6">
        {/* Row 1 */}
        <div className="flex sm:flex-row flex-col justify-between sm:items-center ">
          <div className="flex items-center gap-4 xl:gap-8">
            <img src={p3} alt="Name" className="h-4 w-4 xl:h-5 xl:w-5" />
            <span>Name</span>
          </div>
          <span className="ms-8 sm:ms-0">
            {profile.name}
          </span>
        </div>

        {/* Row 2 */}
        <div className="flex sm:flex-row flex-col justify-between sm:items-center">
          <div className="flex items-center gap-4 xl:gap-8">
            <img src={p4} alt="Employee ID" className="h-4 w-4 xl:h-5 xl:w-5" />
            <span>Employee ID</span>
          </div>
          <span className="ms-8 sm:ms-0">
            {profile.employeeId}
          </span>
        </div>

        {/* Row 3 */}
        <div className="flex sm:flex-row flex-col justify-between sm:items-center">
          <div className="flex items-center gap-4 xl:gap-8">
            <img src={p5} alt="Designation" className="h-4 w-4 xl:h-5 xl:w-5" />
            <span>Designation</span>
          </div>
          <span className="ms-8 sm:ms-0">
            {profile.designation}
          </span>
        </div>

        {/* Row 4 */}
        <div className="flex sm:flex-row flex-col justify-between sm:items-center">
          <div className="flex items-center gap-4 xl:gap-8">
            <img src={p6} alt="Department" className="h-4 w-4 xl:h-5 xl:w-5" />
            <span>Department</span>
          </div>
          <span className="ms-8 sm:ms-0">
            {profile.department}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AccountDetails;
