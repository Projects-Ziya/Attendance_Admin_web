import React from 'react';

interface DetailRowProps {
  label: string;
  value: React.ReactNode;
  className?: string;
}

const DetailRow: React.FC<DetailRowProps> = ({ label, value, className }) => (
  <div
    className={`grid items-start bg-white ${className ?? ""}`}
  >
    <span
      className="font-poppins font-normal text-[16px] leading-[27px] tracking-[0.08em] text-[#4D4D4D]"
    >
      {label}
    </span>
    <span
      className="font-poppins font-normal text-[16px] leading-[27px] tracking-[0.08em] text-[#4D4D4D]"
    >
      :
    </span>
    <span
      className="font-poppins font-normal text-[16px] leading-[27px] tracking-[0.08em] text-[#4D4D4D]"
    >
      {value}
    </span>
  </div>
);

export default DetailRow;
