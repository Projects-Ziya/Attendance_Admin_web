import backicon from "../../assets/profileSettins/back.svg";
import { useNavigate } from "react-router-dom";

const PrivacyPolicy = () => {
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
        Privacy Policy
      </h1>

      {/* App Details */}
      <div className="pr-[80px] mb-10">
        <p className="text-[22px] text-midGray font-[500] leading-[180%]">
          App Name: <span className="font-[500]">Ziya Attendance App</span>
        </p>
        <p className="text-[18px] font-[400] leading-[180%] text-midGray">
          Version: 1.0.0
        </p>
      </div>

      {/* Developed By */}
      <p className="text-[18px] text-midGray font-[400] leading-[180%] mb-8">
        Developed by: Ziya Academy.LLP / IT Department
      </p>

      {/* Introduction */}
      <p className="text-[18px] text-midGray font-[400] leading-[180%] mb-8">
        At Ziya Academy LLP, we value your privacy. This Privacy Policy explains
        how we collect, use, and protect the personal information of users of the
        Ziya Attendance App. By using our app, you agree to the terms outlined in
        this policy.
      </p>

      {/* Privacy Sections */}
      <div className="text-[18px] text-midGray font-[400] leading-[180%] space-y-6 mb-10 pr-[80px]">
        <div>
          <h2 className="font-[500] text-[20px] mb-2">1. Information We Collect</h2>
          <p>
            We may collect information that you provide directly to us, such as
            your name, employee ID, contact details, and attendance activity. In
            addition, certain technical data (such as device identifiers and usage
            logs) may be collected automatically.
          </p>
        </div>

        <div>
          <h2 className="font-[500] text-[20px] mb-2">2. How We Use Your Information</h2>
          <p>
            The data collected is used solely for managing attendance, monitoring
            working hours, and improving employee management systems. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit. Pellentesque habitant morbi
            tristique senectus et netus et malesuada fames ac turpis egestas.
          </p>
        </div>

        <div>
          <h2 className="font-[500] text-[20px] mb-2">3. Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to
            protect your personal data from unauthorized access, alteration, or
            disclosure. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            ultricies, magna ac vehicula cursus, lorem elit fermentum libero, eget
            vulputate nunc ipsum ac nisi.
          </p>
        </div>

        <div>
          <h2 className="font-[500] text-[20px] mb-2">4. Sharing of Information</h2>
          <p>
            Your personal information is not shared with third parties except where
            required by law or necessary for operational purposes within Ziya
            Academy LLP. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Mauris vitae urna nec nulla interdum ultricies.
          </p>
        </div>

        <div>
          <h2 className="font-[500] text-[20px] mb-2">5. Data Retention</h2>
          <p>
            Personal information is retained only for as long as necessary to
            fulfill the purposes outlined in this policy or as required by law.
            Once the data is no longer needed, it will be securely deleted or
            anonymized.
          </p>
        </div>

        <div>
          <h2 className="font-[500] text-[20px] mb-2">6. User Rights</h2>
          <p>
            You have the right to access, update, or request deletion of your
            personal data. For any privacy-related concerns, you may contact our IT
            Department. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Integer dignissim neque ac cursus commodo.
          </p>
        </div>

        <div>
          <h2 className="font-[500] text-[20px] mb-2">7. Updates to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Any significant
            changes will be communicated through app notifications or internal
            announcements.
          </p>
        </div>
      </div>

      {/* Closing Statement */}
      <p className="text-[18px] text-midGray font-[400] leading-[180%] mb-16">
        By using the Ziya Attendance App, you acknowledge that you have read and
        understood this Privacy Policy and agree to its terms.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
