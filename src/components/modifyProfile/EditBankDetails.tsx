import { useEffect, useState } from "react";
import pinicon from "../../assets/icons/pinicon.svg";

type BankDetailsPayload = {
  accountNumber: string;
  confirmAccountNumber: string;
  bankName: string;
  ifscCode: string;
  branchName: string;
  accountHolderName: string;
  documents?: File | null;
  passbook?: File | null;
};

interface EditBankDetailsProps {
  data: any;
  setEmployeeData: (data: any) => void;
}

function EditBankDetails({ data, setEmployeeData }: EditBankDetailsProps) {
  const [bankDetails, setBankDetails] = useState<BankDetailsPayload>({
    accountNumber: "",
    confirmAccountNumber: "",
    bankName: "",
    ifscCode: "",
    branchName: "",
    accountHolderName: "",
    documents: null,
    passbook: null,
  });

  // Only initialize local state from data; do NOT call setEmployeeData here to avoid loops
  useEffect(() => {
    if (!data) return;
    const bank = (data.bank_details && data.bank_details[0]) || {};

    setBankDetails({
      accountNumber: bank.account_number || "",
      confirmAccountNumber: bank.account_number || "",
      bankName: bank.bank_name || "",
      ifscCode: bank.ifsc_code || "",
      branchName: bank.branch_name || "",
      accountHolderName:
        `${data.first_name || ""} ${data.last_name || ""}`.trim(),
      documents: null,
      passbook: null,
    });
  }, [data]);

  const syncToEmployeeData = (partial: Partial<BankDetailsPayload>) => {
    setBankDetails((prev) => {
      const next = { ...prev, ...partial };
      const existingBank =
        (data?.bank_details && data.bank_details[0]) || {};

      const updatedEmployee = {
        ...data,
        bank_details: [
          {
            ...existingBank,
            account_number: next.accountNumber,
            bank_name: next.bankName,
            ifsc_code: next.ifscCode,
            branch_name: next.branchName,
            account_type: existingBank.account_type || "Salary",
          },
        ],
      };

      setEmployeeData(updatedEmployee);
      return next;
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    syncToEmployeeData({ [name]: value } as Partial<BankDetailsPayload>);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      syncToEmployeeData({ [name]: files[0] } as Partial<BankDetailsPayload>);
    }
  };

  return (
    <div className="flex flex-col mt-[20px] gap-6">
      {/* Account Number */}
      <div>
        <label className="block text-[18px] font-medium text-[#4D4D4D]">
          Account Number
        </label>
        <input
          type="text"
          name="accountNumber"
          value={bankDetails.accountNumber}
          onChange={handleChange}
          className="mt-1 block w-full h-[80px] border-[1px] border-[#D9D9D9] rounded-md p-3"
        />
      </div>

      {/* Confirm Account Number */}
      <div>
        <label className="block text-[18px] font-medium text-[#4D4D4D]">
          Confirm Account Number
        </label>
        <input
          type="text"
          name="confirmAccountNumber"
          value={bankDetails.confirmAccountNumber}
          onChange={handleChange}
          className="mt-1 block w-full h-[80px] border-[1px] border-[#D9D9D9] rounded-md p-3"
        />
      </div>

      {/* Bank Name */}
      <div>
        <label className="block text-[18px] font-medium text-[#4D4D4D]">
          Bank Name
        </label>
        <input
          type="text"
          name="bankName"
          value={bankDetails.bankName}
          onChange={handleChange}
          className="mt-1 block w-full h-[80px] border-[1px] border-[#D9D9D9] rounded-md p-3"
        />
      </div>

      {/* IFSC code & Branch Name */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-[15px]">
        {/* IFSC Code */}
        <div>
          <label className="block text-[18px] font-medium text-[#4D4D4D]">
            IFSC code
          </label>
          <input
            type="text"
            name="ifscCode"
            value={bankDetails.ifscCode}
            onChange={handleChange}
            placeholder="Enter IFSC Code"
            className="mt-1 block w-full h-[60px] border-[1px] border-[#D9D9D9] rounded-md p-4"
          />
        </div>

        {/* Branch Name */}
        <div>
          <label className="block text-[18px] font-medium text-[#4D4D4D]">
            Branch Name
          </label>
          <input
            type="text"
            name="branchName"
            value={bankDetails.branchName}
            onChange={handleChange}
            placeholder="Auto-fill"
            className="mt-1 block w-full h-[60px] border-[1px] border-[#D9D9D9] rounded-md p-4"
          />
        </div>

        {/* Account Holder Name */}
        <div>
          <label className="block text-[18px] font-medium text-[#4D4D4D]">
            Account Holder Name
          </label>
          <input
            type="text"
            name="accountHolderName"
            value={bankDetails.accountHolderName}
            onChange={handleChange}
            className="mt-1 block w-full h-[60px] border-[1px] border-[#D9D9D9] rounded-md p-3"
          />
        </div>
      </div>

      {/* Documents */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[15px]">
        {/* Aadhar / Documents */}
        <div>
          <label className="block text-[18px] font-medium text-[#4D4D4D]">
            Attach All Valid Documents
          </label>
          <input
            type="file"
            name="documents"
            accept=".jpg,.jpeg,.png,.pdf"
            onChange={handleFileChange}
            className="mt-1 block w-full h-[80px] placeholder:text-[#FF4343] border-[1px] border-[#D9D9D9] rounded-md p-4 pl-12"
            style={{
              backgroundImage: `url(${pinicon})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "10px center",
              backgroundSize: "20px 20px",
            }}
          />
        </div>

        {/* Passbook / Cheque */}
        <div>
          <label className="block text-[18px] font-medium text-[#4D4D4D]">
            Passbook or Cheque
          </label>
          <input
            type="file"
            name="passbook"
            accept=".jpg,.jpeg,.png,.pdf"
            onChange={handleFileChange}
            className="mt-1 block w-full h-[80px] border-[1px] border-[#D9D9D9] rounded-md p-4 pl-12"
            style={{
              backgroundImage: `url(${pinicon})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "10px center",
              backgroundSize: "20px 20px",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default EditBankDetails;
