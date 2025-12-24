import React from "react";
import Files from "./Files";
import Images from "./Images";

const HomePage: React.FC = ({ApiProject,id}) => {
  return (
    <div className="flex flex-col md:flex-row gap-6 pt-5 mb-[30px]  mx-auto" >
      <div className="flex-1 " style={{ boxShadow: "0px 0px 2px 0px #00000040" }}>
        <Files id={id} />
      </div>
      <div className="flex-1">
        <Images ApiProject={ApiProject} id={id} />
      </div>
    </div>
  );
};

export default HomePage;