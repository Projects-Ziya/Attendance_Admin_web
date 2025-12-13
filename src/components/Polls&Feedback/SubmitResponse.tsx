import React from "react";
import type { PollQuestion } from "../../models/pollsFeedbackModel";

type Props = {
  formTitle: string;
  formDescription: string;
  questions: PollQuestion[];
  handleSubmitResponse: () => void;
};

const SubmitResponseTab: React.FC<Props> = ({
  formTitle,
  formDescription,
  questions,
  handleSubmitResponse,
}) => {
  return (
    <div className="h-auto   bg-white pb-[40px] rounded-[10px] mb-[20px]">
      <h1 className="text-[24px] pt-[56px] font-[600]">Submit Response</h1>
      <p className="text-[18px] pt-[10px] font-[500] text-[#4D4D4D]">
        Participate in the poll and share your feedback
      </p>

      {/* Form header */}
      <div className="h-[208px] pl-[28px] w-[1359px] border rounded-[10px] mt-[60px] border-[#00A0E3]">
        <h1 className="text-[28px] font-[500] pt-[50px]">{formTitle}</h1>
        <p className="text-[19px] font-[500] mt-[20px] text-[#686767]">Form Description</p>
        <input
          type="text"
          value={formDescription}
          readOnly
          className="w-[1299px] mt-3 outline-none border-b-2 pr-[20px] text-[16px] text-[#4D4D4D] bg-transparent"
        />
      </div>

      {/* Questions */}
      <div className="h-auto mt-[54px] w-[1359px] rounded-[10px] border-[1px] border-[#00A0E3]">
        {questions.map((q) => (
          <div key={q.id} className="mt-[24px] ml-[28px]">
            <input
              type="text"
              value={q.text}
              readOnly
              className="mt-[36px] text-[#4D4D4D] placeholder:text-[25px] placeholder:font-[500] h-[71px] pl-[14px] w-[1299px] text-[25px] font-[500] bg-[#F5F5F5] focus:outline-none rounded-[10px]"
            />

            {/* Options */}
            {q.options?.map((opt) => (
              <div key={opt.id} className="flex items-center pl-[28px] space-x-3 mt-4">
                <input type="checkbox" className="h-[26px] w-[26px] border border-gray-400" />
                <input
                  type="text"
                  value={opt.label}
                  readOnly
                  className="h-[41px] w-[478px] bg-[#F5F5F5] rounded-[6px] px-3 focus:outline-none text-[#4D4D4D] text-[16px]"
                />
              </div>
            ))}
          </div>
        ))}

        {/* Submit Button */}
        <div className="mt-[40px] flex justify-end px-[28px] pb-[20px]">
          <button
            onClick={handleSubmitResponse}
            className="h-[68px] w-[252px] bg-[#00A0E3] text-[22px] font-[500] rounded-[10px] text-white"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubmitResponseTab;
