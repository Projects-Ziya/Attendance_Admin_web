import React, { useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import type { BankDetailsPayload } from "../../services/employeeService";

interface BankDetailsProps {
    data: BankDetailsPayload;
    update: (patch: Partial<BankDetailsPayload>) => void;
    onBack: () => void;
    onSubmit: () => Promise<void>; 
}

type Errors = Partial<Record<keyof BankDetailsPayload, string>>;

const BankDetails: React.FC<BankDetailsProps> = ({ data, update, onBack, onSubmit }) => {

    const [errors, setErrors] = useState<Errors>({});
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        update({ [name]: value } as Partial<BankDetailsPayload>);
        setErrors((prev) => ({ ...prev, [name as keyof BankDetailsPayload]: "" }));
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files);
            update({ documents: [...(data.documents || []), ...newFiles] });
            setErrors((prev) => ({ ...prev, documents: "" }));
        }
    };

    const handleRemoveFile = (index: number) => {
        const updated = (data.documents || []).filter((_, i) => i !== index);
        update({ documents: updated });
    };

    const validate = (payload: BankDetailsPayload) => {
        const newErrors: Errors = {};
        if (!payload.accountNumber) newErrors.accountNumber = "Account number is required";
        if (payload.accountNumber !== payload.confirmAccountNumber)
            newErrors.confirmAccountNumber = "Account numbers do not match";
        if (!payload.ifscCode) newErrors.ifscCode = "IFSC code is required";
        if (!payload.accountHolderName) newErrors.accountHolderName = "Account holder name required";
        if (!payload.documents || payload.documents.length === 0) newErrors.documents = "Please attach required document";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const allFilled = useMemo(() => {
        return Boolean(
            data.accountNumber &&
            data.confirmAccountNumber &&
            data.ifscCode &&
            data.branchName &&
            data.accountHolderName &&
            data.documents.length > 0
        );
    }, [data]);


    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!validate(data)) return;
        try {
            setSubmitting(true);
            await onSubmit();
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-3">
            <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Account Number</label>
                <input
                    type="text"
                    name="accountNumber"
                    value={data.accountNumber}
                    onChange={handleChange}
                    className="w-full border rounded-md px-2 h-[80px] text-gray-700"
                />
                {errors.accountNumber && <p className="text-red-500 text-sm">{errors.accountNumber}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Confirm Account Number</label>
                <input
                    type="text"
                    name="confirmAccountNumber"
                    value={data.confirmAccountNumber}
                    onChange={handleChange}
                    className="w-full border rounded-md px-2 h-[80px] text-gray-700"
                />
                {errors.confirmAccountNumber && (
                    <p className="text-red-500 text-sm">{errors.confirmAccountNumber}</p>
                )}
            </div>

            <div className="grid grid-cols-3 gap-3">
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">IFSC code</label>
                    <input
                        type="text"
                        name="ifscCode"
                        value={data.ifscCode}
                        onChange={handleChange}
                        className="w-full border  rounded-md px-2 h-[80px] text-gray-700"
                    />
                    {errors.ifscCode && <p className="text-red-500 text-sm">{errors.ifscCode}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Branch name</label>
                    <input
                        type="text"
                        name="branchName"
                        placeholder="auto fill"
                        value={data.branchName}
                        onChange={handleChange}
                        className="w-full border rounded-md px-2 h-[80px] text-gray-700"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Account Holder Name</label>
                    <input
                        type="text"
                        name="accountHolderName"
                        value={data.accountHolderName}
                        onChange={handleChange}
                        className="w-full border rounded-md px-2 h-[80px] text-gray-700"
                    />
                    {errors.accountHolderName && (
                        <p className="text-red-500 text-sm">{errors.accountHolderName}</p>
                    )}
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                    Attach all Valid Documents
                </label>
                <div className="w-full border rounded-md h-[80px] flex items-center px-2">
                    <input
                        type="file"
                        accept="image/*,.pdf"
                        multiple
                        onChange={handleFileChange}
                        className="text-gray-700"
                    />
                </div>
                <p className="text-red-500 text-xs mt-1">
                    * Aadhaar, Bank Passbook or Cheque
                </p>
                {errors.documents && <p className="text-red-500 text-sm">{errors.documents}</p>}

                {data.documents && data.documents.length > 0 && (
                    <ul className="mt-2 space-y-1">
                        {data.documents.map((file, idx) => (
                            <li key={idx} className="flex justify-between items-center text-sm bg-gray-100 px-2 py-1 rounded">
                                <span>{file.name}</span>
                                <button
                                    type="button"
                                    onClick={() => handleRemoveFile(idx)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    ✕
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div className="flex justify-end gap-2">
                <button
                    type="button"
                    onClick={onBack}
                    className="px-4 py-1 border rounded-md text-sm"
                >
                    Back
                </button>
                <button
                    type="submit"
                    disabled={!allFilled || submitting}
                    className={`px-5 py-1 text-white rounded-md text-sm ${allFilled
                        ? "bg-blue-500 hover:bg-blue-600"
                        : "bg-blue-400 cursor-not-allowed"
                        }`}
                >
                    {submitting ? "Submitting..." : "Add Employee"}
                </button>
            </div>
        </form>
    );
};

export default BankDetails;
