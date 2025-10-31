import React from "react";
import BasicDetails from "../../components/employee/BasicDetails";
import PersonalDetails from "../../components/employee/PersonalDetails";
import useAddEmployeeViewModel from "../../viewmodels/useAddEmployeeViewModel";
import BankDetails from "../../components/employee/BankDetails";

const AddEmployee: React.FC = () => {
  const {
    steps,
    activeStep,
    setActiveStep,
    goNext,
    goBack,
    formData,
    updateBasic,
    updatePersonal,
    updateBank,
    submitAll,
  } = useAddEmployeeViewModel();

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h2 className="text-lg font-semibold text-gray-700">Add New Employee</h2>

      {/* Tabs */}
      <div className="flex border-b mb-3">
        {steps.map((step, index) => (
          <button
            key={step}
            onClick={() => setActiveStep(index)}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              activeStep === index
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {step}
          </button>
        ))}
      </div>

      {/* Step Components */}
      {activeStep === 0 && (
        <BasicDetails
          data={formData.basic}
          update={updateBasic}
          onNext={goNext}
        />
      )}
      {activeStep === 1 && (
        <PersonalDetails
          data={formData.personal}
          update={updatePersonal}
          onBack={goBack}
          onNext={goNext}
        />
      )}
      {activeStep === 2 && (
        <BankDetails
          data={formData.bank}
          update={updateBank}
          onBack={goBack}
          onSubmit={async () => {
            try {
              await submitAll();
              alert("Employee Added Successfully");
            } catch (err) {
              console.error(err);
              alert("Failed to add employee. Please try again.");
            }
          }}
        />
      )}
    </div>
  );
};

export default AddEmployee;
