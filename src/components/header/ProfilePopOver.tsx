import React, { useState, useRef, useEffect } from "react";
import { LogOut, Settings, User } from "lucide-react";
import { Link } from "react-router-dom";

interface ProfileData {
  name: string;
  role: string;
  email: string;
  image: string;
  isOnline?: boolean;
}

interface ProfilePopOverProps {
  children: React.ReactNode; // any clickable trigger (like profile image)
  profile: ProfileData;
  onLogout?: () => void;
}

const ProfilePopOver: React.FC<ProfilePopOverProps> = ({
  children,
  profile,
  onLogout,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const popoverRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null);

  const toggleVisibility = () => setIsVisible((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        !triggerRef.current?.contains(event.target as Node)
      ) {
        setIsVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block">
      {/* Trigger (wrapped content) */}
      <div
        ref={triggerRef}
        onClick={toggleVisibility}
        className="cursor-pointer select-none"
      >
        {children}
      </div>

      {/* Popover Content */}
      {isVisible && (
        <div
          ref={popoverRef}
          className="absolute right-0 mt-3 w-96 h-80 bg-white rounded-xl shadow-lg border border-gray-100 z-[1000]  transition ease-in duration-300"
        >
          {/* Header */}
          <div className="flex items-center gap-3 p-4 border-b border-gray-200">
            <div className="relative">
              <img
                src={profile.image}
                alt="User"
                className="w-12 h-12 rounded-full object-cover border border-gray-200"
              />
              {profile.isOnline && (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
              )}
            </div>
            <div>
              <h3 className="text-blue-600 font-semibold text-lg leading-tight">
                {profile.name}
              </h3>
              <p className="text-orange-500 text-sm font-medium">
                {profile.role}
              </p>
              <p className="text-gray-500 text-sm">{profile.email}</p>
            </div>
          </div>

          {/* Menu */}
          <div className="flex flex-col gap-5 p-4 text-gray-700">
            <Link to="/myProfile">
            <button className="flex items-center gap-2 hover:text-blue-600 transition-colors">
              <User size={18} />
              <span>My Profile</span>
            </button>
            </Link>
            <Link to="/profileSettings">
            <button className="flex items-center gap-2 hover:text-blue-600 transition-colors">
              <Settings size={18} />
              <span>Settings</span>
            </button>
            </Link>
          </div>


          <div className="border-t border-gray-200 p-4 mt-16 ">
            <button
              onClick={onLogout}
              className="flex items-center gap-2 text-gray-700 hover:text-red-500 transition-colors w-full text-left"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePopOver;
