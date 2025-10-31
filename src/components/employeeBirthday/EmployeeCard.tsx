import React from "react";
import Button from "../common/ui/Button"; 
import Icon from "./AppIcon";
import type { Employee } from "../../models/employeeBirthday/Employee"; 

interface EmployeeCardProps {
  employee: Employee;
  onSendWish?: (employee: Employee) => void; 
  isHighlighted?: boolean;
  showSendWishButton?: boolean;
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({
  employee,
  onSendWish,
  isHighlighted = false,
  showSendWishButton = true,
}) => {
  return (
    <div
      className={`bg-white rounded-lg p-4 shadow-sm border ${
        isHighlighted
          ? "border-2 border-dashed border-[#00A0E3] bg-blue-50/30"
          : "border-gray-200 hover:shadow-md"
      }`}
    >
      
      <div className="flex justify-center mb-4">
        <div className="relative">
          <img
            src={employee.profileImage}
            alt={employee.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
            onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
              e.currentTarget.src = "/assets/images/no_image.png";
            }}
          />
        </div>
      </div>

      
      <div className="text-center space-y-2">
        <h3 className="font-semibold text-gray-900 text-sm">{employee.name}</h3>
        <div className="text-xs text-gray-600">
          <p>{employee.department}</p>
          <p>{employee.position}</p>
        </div>
        <p className="text-xs text-gray-500 font-medium">{employee.birthday}</p>
      </div>

      {/* Send Wish Button */}
      {showSendWishButton && (
        <div className="mt-4 flex justify-center">
          <Button
            variant="outline"
            size="sm"
            className="rounded-lg p-4 items-center border-0 text-[#4D4D4D] shadow w-fit gap-2"
            onClick={() => onSendWish?.(employee)}
          >
            <Icon name="Cake" responsive className="text-[#4D4D4D]" />
            Send Wishes
          </Button>
        </div>
      )}
    </div>
  );
};

export default EmployeeCard;
