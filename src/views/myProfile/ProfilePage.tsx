// ProfilePage.tsx
import { useProfile } from "../../viewmodels/myProfile/useProfile";
import ProfileCard from "../../components/myProfile/ProfileCard";
import AccountDetails from "../../components/myProfile/AccountDetails";
import p1 from "../../assets/icons/profile-icon.png";
import img1 from "../../assets/img1.svg";
import MainLayout from "../../components/layout/MainLayout";

export default function ProfilePage() {
  const { profile, loading } = useProfile();

  if (loading) return <div className="p-6">Loading profile...</div>;
  if (!profile) return <div className="p-6">No profile data found.</div>;

  return (
    <MainLayout>
      <div className="flex flex-col gap-2 md:gap-4 2xl:gap-[35px] 
    p-2 xl:p-6 2xl:p-[55px] justify-center w-full h-screen">
        <h1 className="text-[#909090] font-medium text-[16px] mb-2 flex tracking-[1.5px]">
          <img className="me-2 mt-[-10px] bg-[#DAF1FB] p-[7px] rounded-full w-11 h-11"
            src={p1} alt="profile" />
          My Profile</h1>
        <div className="flex flex-col md:flex-row gap-2 xl:gap-5 2xl:gap-10
        items-center w-full md:items-stretch">
          <ProfileCard profile={profile} />
          <AccountDetails profile={profile} />
        </div>
        <img className="w-[250px] xl:w-[300px] 2xl:w-[417.49px] h-auto 
        mx-auto" src={img1} alt="image" />
      </div>
    </MainLayout>
  );
}
