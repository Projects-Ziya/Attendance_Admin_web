import React, { type HTMLAttributes } from "react";
import * as LucideIcons from "lucide-react";

interface AppIconProps extends HTMLAttributes<HTMLSpanElement> {
  name: keyof typeof LucideIcons; 
  size?: number;                  
  responsive?: boolean;           
  className?: string;
}

const AppIcon: React.FC<AppIconProps> = ({
  name,
  size = 16,
  responsive = false,
  className = "",
  ...props
}) => {
  const IconComponent = LucideIcons[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found.`);
    return null;
  }

  return (
    <span
      className={`inline-flex items-center justify-center ${className}`}
      {...props}
    >
      {responsive ? (
        
        <IconComponent className="text-[25px] sm:text-[40px]" />
      ) : (
        
        <IconComponent size={size} />
      )}
    </span>
  );
};

export default AppIcon;
