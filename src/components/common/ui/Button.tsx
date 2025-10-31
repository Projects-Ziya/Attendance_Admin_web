import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'medium', 
  disabled = false, 
  type = 'button',
  fullWidth = false,
  className = '',
  ...props 
}) => {
 const baseClasses = 'font-medium rounded transition-colors duration-200 focus:outline-none cursor-pointer';

  const variants = {
    primary: `
 
  text-xl text-white 
  py-3 px-4 
  rounded-secondaryradius 
  font-medium 
  hover:bg-[#055C9D] 
  focus:outline-none 
  transition-colors duration-300 ease-in-out
`,
   subprimary: `
  bg-[#E0E0E0] 
  text-[#333333] 
  hover:bg-[#CFCFCF] 
  disabled:bg-[#F0F0F0] 
  disabled:text-[#999999] 
  transition-colors duration-300 ease-in-out
`,
 secondary: 'bg-global-25 text-global-2 hover:bg-global-21 disabled:bg-global-21',
  outline: 'border border-global-15 text-global-2 hover:bg-global-21 disabled:border-global-15 disabled:text-global-4',
};

  
  const sizes = {
    small: 'px-2 py-1 text-xs sm:px-3 sm:py-1.5 sm:text-sm',
    medium: 'px-3 py-1.5 text-sm sm:px-4 sm:py-2 sm:text-base',
    large: 'px-4 py-2 text-base sm:px-6 sm:py-3 sm:text-lg',
  };
  
  const buttonClasses = `
    ${baseClasses} 
    ${variants[variant]} 
    ${sizes[size]} 
    ${fullWidth ? 'w-full' : ''} 
    ${disabled ? 'cursor-not-allowed opacity-50' : ''}
    ${className}
  `.trim().replace(/\s+/g, ' ');
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;