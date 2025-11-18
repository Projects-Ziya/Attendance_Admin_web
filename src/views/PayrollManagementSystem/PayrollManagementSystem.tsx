import React from 'react'
// import Header from '../../components/PayrollManagementSystem/Header'
import MainLayout from "../../components/layout/MainLayout";
import Management from '../../components/PayrollManagementSystem/Management';
import payroll from "../../assets/payroll.svg"

const PayrollManagementSystem = () => {
  return (
    <MainLayout>
   <div className="bg-[#F6F5FA]   px-4 sm:px-6 lg:pl-[37px] pr-[37px] ">

        <div className="mb-6 sm:mb-8 lg:mb-10 mt-8 sm:mt-12 ">
          <h1 className=" flex items-center gap-2 text-midGray text-[16px]  leading-[16px] font-[500] ">
            <span className="bg-[#DAF1FB] rounded-full w-[40px] h-[40px] flex items-center justify-center">
              <img
                src={payroll}
                alt="Section icon"
                className="w-5.5 h-5.5 object-contain"
              />
            </span>
            Payroll Management System
          </h1>
        </div>
    <Management/>
    </div>
    </MainLayout>
  )
}

export default PayrollManagementSystem