import React from "react";
import Files from "./Files";
import Images from "./Images";

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row gap-6 p-6  mx-auto">
      <div className="flex-1">
        <Files />
      </div>
      <div className="flex-1">
        <Images />
      </div>
    </div>
  );
};

export default HomePage;