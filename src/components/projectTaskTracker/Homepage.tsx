import React from "react";
import Files from "./Files";
import Images from "./Images";

const HomePage: React.FC = ({id}) => {
  return (
    <div className="flex flex-col md:flex-row gap-6 p-6  mx-auto">
      <div className="flex-1">
        <Files id={id} />
      </div>
      <div className="flex-1">
        <Images id={id} />
      </div>
    </div>
  );
};

export default HomePage;