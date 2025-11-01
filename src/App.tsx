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
          <Route
            path="/addEmployee"
            element={
              <MainLayout>
                <AddEmployee />
              </MainLayout>
            }
          />
          <Route
            path="/addLeaveRequest"
            element={
              <MainLayout>
                <AddLeaveRequest />
              </MainLayout>
            }
          />
          <Route
            path="/Attendancesummary"
            element={
              <MainLayout>
                <TodaysAttendance />
              </MainLayout>
            }
          />

          <Route
            path="/Em/:id"
            element={
              <MainLayout>
                <EmployeeDashboard employeeId={"string"} />
              </MainLayout>
            }
          />


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
        </Route>
          <Route path="/AboutUs" element={<AboutPage />} />
          <Route path="/Terms&Conditions" element={<TermsAndConditions />} />
          <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
          <Route path="/notifications" element={<NotificationLayout />} />
      </Routes>
    </Router>
  );
}

export default App;
