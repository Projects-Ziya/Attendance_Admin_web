import React, { useEffect, useState } from "react";
import { Cake } from "lucide-react";
import api from "../../../Api/api";
import { Link } from "react-router-dom";

interface Birthday {
  id: number;
  first_name: string;
  last_name: string;
  dob: string;
  designation: string;
  profile_pic: string | null;
}

const BirthdayCard: React.FC = () => {
  const [grouped, setGrouped] = useState<Record<string, Birthday[]>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBirthdays = async () => {
      try {
        setLoading(true);
        const res = await api.get("/api/birthday-list-all/");
        const data = res.data;

        // ✅ Convert API structure to grouped object
        const formatted: Record<string, Birthday[]> = {
          "Today": data.today_birthdays || [],
          "Tomorrow": data.tomorrow_birthdays || [],
          "Upcoming": data.upcoming_birthdays || [],
        };

        setGrouped(formatted);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch birthday list");
      } finally {
        setLoading(false);
      }
    };

    fetchBirthdays();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-[15px] w-[727px] h-[632px] border border-gray-100">
      <div className="mb-5 border-b border-[#43C8FF] pb-4 flex items-center justify-between">
        <div className="flex flex-col items-start gap-1">
          <div className="bg-[#E6F7FF] p-2 rounded-full">
            <Cake className="w-7 h-7 text-[#00AEEF]" strokeWidth={2} />
          </div>
          <h2 className="text-[24px] font-normal text-[#4D4D4D]">Birthdays</h2>
        </div>
<Link to={'/Birthdays'}>
        <button
          className="text-[#909090] font-medium -mb-[46px] hover:text-ziyablue"
          style={{ fontSize: "18px" }}
          >
          View All
        </button>
          </Link>
      </div>

      <div className="space-y-4">
        {loading && <p className="text-gray-500 text-center">Loading...</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}

        {!loading &&
          !error &&
          Object.entries(grouped).map(([label, items]) =>
            items.length > 0 ? (
              <div key={label}>
                <p className="text-[18px] font-medium text-gray-500 mb-2">
                  {label}
                </p>
                <div className="space-y-2">
                  {items.map((person) => (
                    <div
                      key={person.id}
                      className="flex items-center justify-between border p-2 rounded-md"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={
                            person.profile_pic
                              ? person.profile_pic
                              : "/default-avatar.png"
                          }
                          alt={`${person.first_name} ${person.last_name}`}
                          className="w-[60px] h-[60px] rounded-full object-cover"
                        />
                        <div>
                          <p className="text-[22px] font-medium text-gray-800">
                            {person.first_name} {person.last_name}
                          </p>
                          <p className="text-[18px] text-gray-500">
                            {person.designation}
                          </p>
                        </div>
                      </div>
                      <button className="flex items-center gap-1 px-3 py-1 text-xs text-gray-700 border border-gray-200 rounded hover:bg-gray-100">
                        <Cake className="w-4 h-4" />
                        Send
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ) : null
          )}
      </div>
    </div>
  );
};

export default BirthdayCard;