import { useEffect, useMemo, useState } from "react";
import {
  employeeService,
  type BasicDetailsPayload,
  type PersonalDetailsPayload,
  type BankDetailsPayload,
} from "../services/employeeService";

export interface AddEmployeeForm {
  basic: BasicDetailsPayload;
  personal: PersonalDetailsPayload;
  bank: BankDetailsPayload;
}

const STORAGE_KEY = "addEmployeeForm.v1";

const emptyForm: AddEmployeeForm = {
  basic: {
    firstName: "",
    lastName: "",
    employeeId: "",
    jobType: "",
    designation: "",
    department: "",
    userType: "",
    repMgrTl: "",
    salary: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePic: null,
  },
  personal: {
    address: "",
    phone: "",
    emergencyPhone: "",
    gender: "",
    dob: "",
    nationality: "",
    bloodGroup: "",
  },
  bank: {
    accountNumber: "",
    confirmAccountNumber: "",
    ifscCode: "",
    branchName: "",
    accountHolderName: "",
    documents: [],
  },
};

function sanitizeForSave(data: AddEmployeeForm): AddEmployeeForm {
  return {
    basic: { ...data.basic, profilePic: null },
    personal: { ...data.personal },
    bank: { ...data.bank, documents: [] },
  };
}

const useAddEmployeeViewModel = () => {
  const steps = useMemo(
    () => ["Basic Details", "Personal Details", "Bank Details"],
    []
  );

  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState<AddEmployeeForm>(emptyForm);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as {
          step?: number;
          data?: AddEmployeeForm;
        };
        if (typeof parsed.step === "number") setActiveStep(parsed.step);
        if (parsed.data) setFormData(parsed.data);
      } catch {
      }
    }
  }, []);

  useEffect(() => {
    const payload = {
      step: activeStep,
      data: sanitizeForSave(formData),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  }, [activeStep, formData]);

  const updateBasic = (patch: Partial<BasicDetailsPayload>) =>
    setFormData((prev) => ({ ...prev, basic: { ...prev.basic, ...patch } }));

  const updatePersonal = (patch: Partial<PersonalDetailsPayload>) =>
    setFormData((prev) => ({ ...prev, personal: { ...prev.personal, ...patch } }));

  const updateBank = (patch: Partial<BankDetailsPayload>) =>
    setFormData((prev) => ({ ...prev, bank: { ...prev.bank, ...patch } }));

  // Navigation
  const goNext = () => setActiveStep((s) => Math.min(s + 1, steps.length - 1));
  const goBack = () => setActiveStep((s) => Math.max(s - 1, 0));

  const resetAll = () => {
    setFormData(emptyForm);
    setActiveStep(0);
    localStorage.removeItem(STORAGE_KEY);
  };

  //  submission
  const submitAll = async () => {
    const res = await employeeService.addEmployee(formData);
    resetAll();
    return res;
  };

  return {
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
    resetAll,
  };
};

export default useAddEmployeeViewModel;
