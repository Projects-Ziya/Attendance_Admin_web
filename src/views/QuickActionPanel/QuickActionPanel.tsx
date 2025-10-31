import headimg from "../../assets/head.svg";
import CreateCard from "../../components/quickActionPanel/CreateCard";
import AddBranch from "../../components/quickActionPanel/AddBranch";
import EmployeeList from "../../components/quickActionPanel/EmployeeList";
import List from "../../components/quickActionPanel//List";
import EmployeeManager from "../../components/quickActionPanel/EmloyeeManager"; // ✅ import the manager
import MainLayout from "../../components/layout/MainLayout";

function QuickActionPanel() {
  return (
    <MainLayout>
      <div className="bg-[#F6F5FA]   px-4 sm:px-6 lg:pl-[37px] pr-[37px] ">

        <div className="mb-6 sm:mb-8 lg:mb-10 mt-8 sm:mt-12 ">
          <h1 className=" flex items-center gap-2 text-midGray text-[16px]  leading-[16px] font-[500] ">
            <span className="bg-[#DAF1FB] rounded-full w-[40px] h-[40px] flex items-center justify-center">
              <img
                src={headimg}
                alt="Section icon"
                className="w-5.5 h-5.5 object-contain"
              />
            </span>
            Productivity & Stats
          </h1>
        </div>

        {/* ✅ Employee search + locate + delete handled by EmployeeManager */}
        <section className="mt-[10px]">
          <EmployeeManager />
        </section>

        <section className="mt-[10px] ">
          <EmployeeList />
        </section>

        <section className="mt-[10px] mb-[60px]">
          <List searchTerm="" statusFilter="" />
        </section>

        <div className="flex gap-[15px] w-[1469px]">
          <CreateCard
            title="Create Departments"
            description="Add new departments and keep your organisation structured."
            inputs={[
              { label: "Department Name", type: "text" },
              { label: "Department head", type: "select" },
            ]}
            buttonLabel="Create"
            enableSearch={true} // 👈 only this card has searchable dropdown
          />

          <CreateCard
            title="Create Designation"
            description="Create designstion to structure your workforce."
            inputs={[
              { label: "Designation Name", type: "text" },
              { label: "Select Department", type: "select" },
            ]}
            buttonLabel="add Task"
          />
        </div>

        <section className="mt-[60px]  mb-[95px] ">
          <AddBranch />
        </section>
      </div>
    </MainLayout>
  );
}

export default QuickActionPanel;
