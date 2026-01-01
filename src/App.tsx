import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import Login from "./views/Login/Login";
import ForgotPassword from "./views/ForgotPassword/ForgotPassword";
import PasswordReset from "./views/passwordReset/passwordReset";
import Dasboard from "./views/Dashboard/Dashboard";
import Createacc from "./views/createNewPassword/CreateAcnt";
import AddEmployee from "./pages/AddEmployee/AddEmployee";
import MainLayout from "./components/layout/MainLayout";
import AddLeaveRequest from "./pages/AddEmployee/AddLeaveRequest/AddLeaveRequest";
import TodaysAttendance from "./views/TodaysAttendance/TodaysAttendance";
import TotalActives from "./pages/totalActives/TotalActives";
import EmployeeDashboard from "./pages/EmployeeDashboard/EmployeeDashboard";
import AddProjectLayout from "./pages/addProject/AddProjectLayout";
import EmployeeDashboardHomeLayout from "./views/EmployeesDashbaord/EmployeeDashboardHomeLayout";
import IndividualEmpAttandanceLayout from "./pages/EmployeeAttandance/IndividualEmpAttandanceLayout";
import IndividualProjectTrackerLayout from "./views/IndividualProjectTracker/IndividualProjectTrackerLayout";
import ProjectTrackerLayout from "./views/projectTracker/ProjectTrackerLayout";
import LeaveRequestLayout from "./views/LeaveRequest/LeaveRequestLayout";
import ProductivityStats from "./views/ProdcuctivityAndStatus/ProductivityStats";
import QuickActionPanel from "./views/QuickActionPanel/QuickActionPanel";
import ProfileSettings from "./views/profileSettings/ProfileSettings";
import AboutPage from "./views/profileSettings/AboutPage";
import TermsAndConditions from "./views/profileSettings/TermsAndConditions";
import PrivacyPolicy from "./views/profileSettings/PrivacyPolicy";
import NotificationLayout from "./views/notifications/NotificationLayout";
import ProfilePage from "./views/myProfile/ProfilePage";
import EmployeeBirthday from "./views/employeeBirthday/EmployeeBirthday";
import PayrollManagementSystem from "./views/PayrollManagementSystem/PayrollManagementSystem";
import RecentActivityList from "./views/Dashboard/DashComponents/RecentActivityList";
import { Toaster } from "react-hot-toast";
import EditProfile from "./views/myProfile/modifyprofile/EditProfile";
import Worksheet from "./views/Worksheet/Worksheet";
import AnnouncementNoticeBoard from "./views/Anouncemenet&NoticeBoard/AnoucementNoticeBoard";
import PollsFeedback from "./views/Polls&Feedback/PollsFeedback";
import TrainingVideo from "./views/Trainingvideos/TrainingVideos";
import ShiftSchedule from "./views/Shiftschedule/ShiftSchedule";
import DeductionDetails from "./views/Deductiondetails/DeductionDetails";

function App() {

 

  return (
    <Router>
      <Routes>
        <Route path="*" element={<div>404 - Page Not Found</div>} />
        <Route path="/" element={<Login />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<PasswordReset />} />
        <Route path="/createac" element={<Createacc />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dasboard />} />

          <Route path="/addEmployee" element={<MainLayout><AddEmployee /></MainLayout>} />
          <Route path="/addLeaveRequest" element={<MainLayout><AddLeaveRequest /></MainLayout>} />
          <Route path="/Attendancesummary" element={<MainLayout><TodaysAttendance /></MainLayout>} />

          <Route path="/Em/:id" element={<MainLayout><EmployeeDashboard employeeId={"string"} /></MainLayout>} />

          <Route path="/TotalActives" element={<TotalActives />} />
          <Route path="/AddProject" element={<AddProjectLayout />} />
          <Route path="/Employee-Dashboard" element={<EmployeeDashboardHomeLayout />} />
          <Route path="/Employee-Profilecard" element={<IndividualEmpAttandanceLayout />} />
          <Route path="/singleProjectTracker/:id" element={<IndividualProjectTrackerLayout />} />
          <Route path="/ProjectTaskTracker" element={<ProjectTrackerLayout />} />
          <Route path="/allLeaveRequests" element={<LeaveRequestLayout />} />
          <Route path="/ProductivityAndStatus" element={<ProductivityStats />} />
          <Route path="/QuickAction" element={<QuickActionPanel />} />
          <Route path="/profileSettings" element={<ProfileSettings />} />
          <Route path="/myProfile" element={<ProfilePage />} />
          <Route path="/Birthdays" element={<EmployeeBirthday />} />
          <Route path="/recentactivitylist" element={<RecentActivityList />} />
          <Route path="/modifyprofile/Editprofile" element={<EditProfile/>} />
          <Route path="/worksheet" element={<Worksheet/>} />
          <Route path="/AnnouncementAndNoticeBoard" element={<AnnouncementNoticeBoard/>} />
          <Route path="/PollsAndFeedback" element={<PollsFeedback/>} />
          <Route path="/TrainingVideos" element={<TrainingVideo/>} />
          <Route path="/ShiftSchedule" element={<ShiftSchedule/>} />
          <Route path="/DeuctionDetails" element={<DeductionDetails/>} />
        </Route>

        <Route path="/AboutUs" element={<AboutPage />} />
        <Route path="/Terms&Conditions" element={<TermsAndConditions />} />
        <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
        <Route path="/notifications" element={<NotificationLayout />} />
        <Route path="/Payroll" element={<PayrollManagementSystem />} />


        // Admin edits own profile
<Route path="/modifyprofile/Editprofile" element={<EditProfile />} />

// Admin edits specific employee (id from URL)
<Route path="/modifyprofile/Editprofile/:id" element={<EditProfile />} />

      </Routes>

      <Toaster position="top-center" />
    </Router>
  );
}

export default App;
