import backicon from "../../assets/profileSettins/back.svg";
import { useNavigate } from "react-router-dom";

const TermsAndConditions = () => {
  const navigate = useNavigate();

  return (
    <div className="absolute left-0 bg-white shadow-md rounded-[12px] pl-[80px] pt-[84px] pr-[80px] border flex flex-col overflow-y-auto">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center justify-center gap-2 mb-[92px] border w-[130px] h-[40px] text-midGray text-[18px] font-[500] tracking-[0.08em] leading-[16px] hover:shadow-md"
      >
        <img src={backicon} alt="Back" className="w-[16px] h-[10px]" />
        Back
      </button>

      {/* Title */}
      <h1 className="text-[45px] font-[500] leading-[65.7px] mb-[41px] text-midGray tracking-[0.08em]">
        Terms & Conditions
      </h1>

      {/* App Info */}
      <div className="pr-[80px] mb-10">
        <p className="text-[22px] text-midGray font-[500] leading-[180%]">
          App Name: <span className="font-[500]">Ziya Attendance App</span>
        </p>
        <p className="text-[18px] font-[400] leading-[180%] text-midGray">
          Version: 1.0.0
        </p>
      </div>

      {/* Developer Info */}
      <p className="text-[18px] text-midGray font-[400] leading-[180%] mb-8">
        Developed by: Ziya Academy.LLP / IT Department
      </p>

      {/* Introduction */}
      <p className="text-[18px] text-midGray font-[400] leading-[180%] mb-8">
        Welcome to the Ziya Employee Attendance App. By accessing or using this
        application, you agree to comply with and be bound by these Terms and
        Conditions. Please read them carefully before using the app.
      </p>

      {/* Terms Content */}
      <div className="text-[18px] text-midGray font-[400] leading-[180%] space-y-6 mb-10 pr-[80px]">
        <div>
          <h2 className="font-[500] text-[20px] mb-2">1. Acceptance of Terms</h2>
          <p>
            By downloading, installing, or using the Ziya Attendance App, you
            agree to these terms. If you do not agree, please discontinue use of
            the application.
          </p>
        </div>

        <div>
          <h2 className="font-[500] text-[20px] mb-2">2. Use of the App</h2>
          <p>
            The app is intended solely for use by employees of Ziya Academy LLP.
            You must use it responsibly and in accordance with company policies.
          </p>
        </div>

        <div>
          <h2 className="font-[500] text-[20px] mb-2">3. Data Collection</h2>
          <p>
            The app may collect data such as your attendance logs, login details,
            and device information to facilitate attendance tracking and improve
            services. Data will be handled in accordance with our Privacy Policy.
          </p>
        </div>

        <div>
          <h2 className="font-[500] text-[20px] mb-2">4. Restrictions</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>You may not misuse or tamper with the app’s functionality.</li>
            <li>You may not share login credentials with others.</li>
            <li>Unauthorized access or modification is strictly prohibited.</li>
          </ul>
        </div>

        <div>
          <h2 className="font-[500] text-[20px] mb-2">
            5. Limitation of Liability
          </h2>
          <p>
            Ziya Academy LLP shall not be liable for any loss or damages arising
            from the use or inability to use this application.
          </p>
        </div>

        <div>
          <h2 className="font-[500] text-[20px] mb-2">6. Updates</h2>
          <p>
            We reserve the right to modify or update these terms at any time.
            Users will be notified of any significant changes.
          </p>
        </div>

        <div>
          <h2 className="font-[500] text-[20px] mb-2">7. Contact</h2>
          <p>
            For any questions regarding these Terms and Conditions, please
            contact the IT Department at Ziya Academy LLP.
          </p>
        </div>
      </div>

      {/* Closing Statement */}
      <p className="text-[18px] text-midGray font-[400] leading-[180%] mb-16">
        By continuing to use this application, you acknowledge that you have read,
        understood, and agree to these Terms and Conditions.
      </p>
    </div>
  );
};

export default TermsAndConditions;
