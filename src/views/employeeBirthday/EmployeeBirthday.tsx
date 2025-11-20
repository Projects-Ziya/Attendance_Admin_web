import React, { useEffect, useState } from "react";
import Icon from "../../components/employeeBirthday/AppIcon";
import Button from "../../components/common/ui/Button";
import EmployeeCard from "../../components/employeeBirthday/EmployeeCard";
import MainLayout from "../../components/layout/MainLayout";
import api from "../../Api/api";
import toast from "react-hot-toast";


const EmployeeBirthday: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [todayBirthdays, setTodayBirthdays] = useState<any[]>([]);
  const [tomorrowBirthdays, setTomorrowBirthdays] = useState<any[]>([]);
  const [upcomingBirthdays, setUpcomingBirthdays] = useState<any[]>([]);

  const BASE_URL = api.defaults.baseURL || " ";

  useEffect(() => {
    const fetchBirthdays = async () => {
      try {
        setLoading(true);
        const response = await api.get("/api/birthday-list-all/");

        if (response?.data?.success) {
          setTodayBirthdays(response.data.today_birthdays || []);
          setTomorrowBirthdays(response.data.tomorrow_birthdays || []);
          setUpcomingBirthdays(response.data.upcoming_birthdays || []);
        } else {
          throw new Error("Invalid API response");
        }
      } catch (err: any) {
        console.error("Error fetching birthdays:", err);
        setError(err.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };
    fetchBirthdays();
  }, []);

// 🔹 Send group birthday wishes (POST)
  const handleSendGroupWishes = async () => {
    if (todayBirthdays.length === 0) {
      toast("No birthdays today to send wishes.",{id: "unique-toast-id",});
      return;
    }

    try {
      setSending(true);
      const response = await api.post("/api/birthdaystodaywish/");

      if (response?.data?.success) {
        toast.success(" Group birthday wishes sent successfully!🎉",{id: "unique-toast-id",});
      } else {
        toast("⚠️ Failed to send wishes. Please try again.",{id: "unique-toast-id",});
      }
    } catch (error: any) {
      console.error("Error sending wishes:", error);
      toast.error(" Something went wrong while sending wishes.",{id: "unique-toast-id",});
    } finally {
      setSending(false);
    }
  };


  if (loading)
    return (
      <div className="bg-white rounded-[10px] shadow p-6 text-center text-gray-500">
        Loading birthdays...
      </div>
    );

  if (error)
    return (
      <div className="bg-white rounded-[10px] shadow p-6 text-center text-red-500">
        {error}
      </div>
    );

  return (
    <MainLayout>
      <div className="flex min-h-screen bg-gray-100">
        <div className="flex-1 flex flex-col">
          <div className="flex items-center space-x-3 ml-6 mt-9">
            <Icon name="Cake" responsive className="text-blue-500" />
            <h1 className="text-base font-semibold text-[#909090]">
              Employee Birthday
            </h1>
          </div>

          <main className="bg-gray-50 overflow-y-auto shadow rounded sm:rounded-[10px] mt-5 sm:mt-[40px] px-4 sm:px-[30px] mr-3 sm:mr-[50px] ml-6 sm:ml-[73px] py-4 sm:py-[30px]">
            {/* 🎂 TODAY */}
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
                  disabled={sending}
                  className={`shadow text-[#4D4D4D] w-full gap-3 sm:w-fit ${
                    sending ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  onClick={handleSendGroupWishes}
                >
                  <Icon name="Cake" responsive className="text-[#4D4D4D]" />
                  {sending ? "Sending..." : "Send Group Wishes"}
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {todayBirthdays.length > 0 ? (
                  todayBirthdays.map((employee) => (
                    <EmployeeCard
                      key={employee.id}
                      employee={{
                        id: employee.id,
                        name: `${employee.first_name} ${employee.last_name}`,
                        profileImage:  employee.profile_pic
                ? `${BASE_URL}${employee.profile_pic}`
                : null,
                        department: employee.department,
                        position: employee.designation,
                        birthday: employee.dob,
                      }}
                      onSendWish={() =>
                        toast(`Wished ${employee.first_name}`)
                      }
                      isHighlighted={true}
                    />
                  ))
                ) : (
                  <div className="text-center text-gray-500 col-span-full">
                    No birthdays today.
                  </div>
                )}
              </div>
            </section>

            {/* 🌅 TOMORROW */}
            <section className="mb-12">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Birthday Tomorrow
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {tomorrowBirthdays.length > 0 ? (
                  tomorrowBirthdays.map((employee) => (
                    <EmployeeCard
                      key={employee.id}
                      employee={{
                        id: employee.id,
                        name: `${employee.first_name} ${employee.last_name}`,
                        profileImage: employee.profile_pic
                ? `${BASE_URL}${employee.profile_pic}`
                : null,
                        department: employee.department,
                        position: employee.designation,
                        birthday: employee.dob,
                      }}
                      onSendWish={() =>
                        toast(`Wished ${employee.first_name}`)
                      }
                      isHighlighted={false}
                    />
                  ))
                ) : (
                  <div className="text-center text-gray-500 col-span-full">
                    No birthdays tomorrow.
                  </div>
                )}
              </div>
            </section>

            {/* 🎁 UPCOMING */}
            <section>
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  Upcoming Birthdays
                </h2>
                <h2 className="text-gray-600">Next 7-day birthdays</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                {upcomingBirthdays.length > 0 ? (
                  upcomingBirthdays.map((employee) => (
                    <EmployeeCard
                      key={employee.id}
                      employee={{
                        id: employee.id,
                        name: `${employee.first_name} ${employee.last_name}`,
                         profileImage: employee.profile_pic
                ? `${BASE_URL}${employee.profile_pic}`
                : null,
                        department: employee.department,
                        position: employee.designation,
                        birthday: employee.dob,
                      }}
                      isHighlighted={false}
                      showSendWishButton={false}
                    />
                  ))
                ) : (
                  <div className="text-center text-gray-500 col-span-full">
                    No upcoming birthdays.
                  </div>
                )}
              </div>
            </section>
          </main>
        </div>
      </div>
    </MainLayout>
  );
};

export default EmployeeBirthday;