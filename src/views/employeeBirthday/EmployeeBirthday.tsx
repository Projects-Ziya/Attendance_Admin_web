import React from "react";
import Icon from "../../components/employeeBirthday/AppIcon";
import Button from "../../components/common/ui/Button";
import EmployeeCard from "../../components/employeeBirthday/EmployeeCard";
import { EmployeeViewModel } from "../../viewmodels/employeeBirthday/EmployeeViewModel";
import MainLayout from "../../components/layout/MainLayout";

const EmployeeBirthday: React.FC = () => {
  const vm = new EmployeeViewModel();

  return (
    <MainLayout>

      <div className="flex min-h-screen bg-gray-100">
        <div className="flex-1 flex flex-col">
          <div className="flex items-center space-x-3  ml-6 mt-9">
            <Icon name="Cake" responsive className="text-blue-500" />
            <h1 className="text-base font-semibold text-[#909090]">
              Employee Birthday
            </h1>
          </div>

          <main className="bg-gray-50 overflow-y-auto shadow rounded sm:rounded-[10px] mt-5 sm:mt-[40px] px-4 sm:px-[30px] mr-3 sm:mr-[50px] ml-6 sm:ml-[73px] py-4 sm:py-[30px]">

            <section className="mb-12">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
                <div>
                  <h2 className="text-lg sm:text-xl font-semibold text-[#4D4D4D] mb-1 sm:mb-2">
                    Birthday Today
                  </h2>
                  <p className="text-sm sm:text-base text-[#909090]">
                    Send a Birthday Wish to Your Employees
                  </p>
                </div>

                <Button
                  variant="default"
                  className="shadow text-[#4D4D4D] w-full gap-3 sm:w-fit"
                  onClick={() => vm.sendGroupWishes()}
                >
                  <Icon name="Cake" responsive className="text-[#4D4D4D]" />
                  Send Group Wishes
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {vm.todayBirthdays.map((employee) => (
                  <EmployeeCard
                    key={employee.id}
                    employee={employee}
                    onSendWish={vm.sendWish}
                    isHighlighted={true}
                  />
                ))}
              </div>
            </section>


            <section className="mb-12">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Birthday Tomorrow
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {vm.tomorrowBirthdays.map((employee) => (
                  <EmployeeCard
                    key={employee.id}
                    employee={employee}
                    onSendWish={vm.sendWish}
                    isHighlighted={false}
                  />
                ))}
              </div>
            </section>


            <section>
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  Upcoming Birthday
                </h2>
                <h2 className="text-gray-600">Next 7-day birthdays</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                {vm.upcomingBirthdays.map((employee) => (
                  <EmployeeCard
                    key={employee.id}
                    employee={employee}
                    onSendWish={vm.sendWish}
                    isHighlighted={false}
                    showSendWishButton={false}
                  />
                ))}
              </div>
            </section>
          </main>
        </div>
      </div>
    </MainLayout>
  );
};

export default EmployeeBirthday;
