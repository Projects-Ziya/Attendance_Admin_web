import React from "react";

interface CircleImageProps {
  src: string;
  alt?: string;
  size?: number;       
  border?: boolean;    
  className?: string;  
}

const CircleImage: React.FC<CircleImageProps> = ({
  src,
  alt = "Profile Image",
  size = "",
  border = false,
  className = "",
}) => {
  return (
    <div
      className={`overflow-hidden rounded-full flex items-center justify-center ${
        border ? "border-2 border-gray-300" : ""
      } ${className}`}
      style={{ width: size, height: size }}
    >
      <img
        src={src}
        alt={alt}
        className="object-cover w-full h-full"
      />
    </div>
  );
};

export default CircleImage;
