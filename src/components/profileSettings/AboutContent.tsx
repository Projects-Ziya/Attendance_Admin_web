import backicon from "../../assets/profileSettins/back.svg"
import { useNavigate } from 'react-router-dom';

const AboutContent = () => {
  const navigate = useNavigate();
  return (
    <div
      className="absolute left-0 bg-white shadow-md rounded-[12px] pl-[80px] pt-[84px] pr-[80px] border  flex flex-col  overflow-y-auto"
      
    >
      {/* Back Button */}
      <button onClick={() => navigate(-1)} className="flex items-center justify-center gap-2 mb-[92px] border w-[130px] h-[40px] text-midGray text-[18px] font-[500] tracking-[0.08em] leading-[16px] hover:shadow-md">
       <img src={backicon} className="w-[16px] h-[10px]"/>
        Back
      </button>

      {/* Title */}
      <h1 className="text-[45px] font-[500] leading-[65.7px] mb-[41px] text-midGray tracking-[0.08em] ">
        About App
      </h1>

      {/* App Details */}
      <div className=" pr-[80px]">
        <p className="text-[22px] text-midGray font-[500] leading-[180%]  ">
          App Name: <span className="font-[500]">Ziya Attendance App</span>
        </p>
        <p className="text-[18px] font-[400] leading-[180%] mb-10 text-midGray">Version: 1.0.0</p>
      </div>

      {/* Developed By */}
      <p className="text-[18px] text-midGray font-[400] leading-[180%] mb-8">
        Developed by: Ziya Academy.LLP / IT Department
      </p>

      {/* Intro Paragraph */}
      <p className="text-[18px] text-midGray font-[400] leading-[180%] mb-8">
        The Ziya Employee Attendance App is designed to
    simplify workforce management for Ziya Academy llp.
      </p>

      {/* Long Description */}
      <p className="text-[18px] font-[400] text-midGray leading-[180%] mb-9 pr-[80px]">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent enim leo,
        lobortis vitae ornare in, ultricies eu sem. Nullam ut ipsum sapien. Mauris
        vulputate tempus euismod. Fusce vitae tellus semper, tempor elit vitae,
        ultrices mauris. Vestibulum tristique quis felis ac imperdiet. Sed eget nisi
        vitae risus gravida euismod vitae nec massa. In porta lectus id nunc convallis
        convallis. Curabitur quam erat, tempor vitae ullamcorper nec, sollicitudin
        quis mauris. Duis tincidunt ac urna a facilisis.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent enim leo,
        lobortis vitae ornare in, ultricies eu sem. Nullam ut ipsum sapien. Mauris
        vulputate tempus euismod. Fusce vitae tellus semper, tempor elit vitae,
        ultrices mauris. Vestibulum tristique quis felis ac imperdiet. Sed eget nisi
        vitae risus gravida euismod vitae nec massa. In porta lectus id nunc convallis
        convallis.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent enim leo,
        lobortis vitae ornare in, ultricies eu sem. Nullam ut ipsum sapien. Mauris
        vulputate tempus euismod. Fusce vitae tellus semper, tempor elit vitae,
        ultrices mauris. Vestibulum tristique quis felis ac imperdiet. Sed eget nisi
        vitae risus gravida euismod vitae nec massa. In porta lectus id nunc convallis
        convallis.
      </p>

      {/* Features Section */}
      <p className="text-[18px] text-midGray leading-[180%] mb-8">It allows employees to:</p>
      <ul className="list-disc list-inside text-[18px] leading-[180%] text-midGray space-y-2">
        <li>Mark attendance with check-in/check-out.</li>
        <li>Apply for leaves and track approvals.</li>
        <li>View work schedules and shift details.</li>
      </ul>
    </div>
  );

};

export default AboutContent;
