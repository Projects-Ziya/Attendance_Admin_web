import React from "react";
import type { PollQuestion } from "../../models/pollsFeedbackModel";
import submiticon from "../../assets/icons/submiticon.svg";
import formicon from "../../assets/icons/formicon.svg";

type Props = {
  formTitle: string;
  formDescription: string;
  questions: PollQuestion[];
  handleSubmitResponse: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

const SubmitResponseTab: React.FC<Props> = ({
  formTitle,
  formDescription,
  questions,
  handleSubmitResponse,
  activeTab,
  setActiveTab,
}) => {

  // ✅ Correct guard condition
  const noQuestions = !questions || questions.length === 0;
  const noOptions = questions.every(
    (q) => !q.options || q.options.length === 0
  );

  if (noQuestions || noOptions) {
    return (
      <div className="h-auto bg-white pb-[40px] rounded-[10px] mb-[20px] pl-[61px] w-[1469px] shadow-[0px_0px_2px_0px_#00000040]">
        <h1 className="text-[24px] pt-[56px] font-[600]">Submit Response</h1>
        <p className="text-[18px] pt-[10px] font-[500] text-[#4D4D4D]">
          Participate in the poll and share your feedback
        </p>

        <div className="mt-[80px] text-center text-[22px] text-[#4D4D4D] font-[500]">
          No questions added yet. Please create a form first.
        </div>
      </div>
    );
  }

  return (
    <div className="h-auto bg-white pb-[40px] rounded-[10px] mb-[20px] pl-[61px] w-[1469px] shadow-[0px_0px_2px_0px_#00000040]">
      <h1 className="text-[24px] pt-[56px] font-[600]">Submit Response</h1>
      <p className="text-[18px] pt-[10px] font-[500] text-[#4D4D4D]">
        Participate in the poll and share your feedback
      </p>

      {/* ✅ Top Tabs */}
      <div className="flex gap-4 pt-[40px] pr-[50px]">
        <button
          onClick={() => setActiveTab("create")}
          className={`flex w-1/2 items-center justify-center gap-2 px-6 py-3 rounded-[10px] text-[18px] font-[500] ${
            activeTab === "create"
              ? "bg-[#00A0E3] text-white"
              : "bg-white text-[#4D4D4D] border border-[#D5D5D5]"
          }`}
        >
          <img
            src={formicon}
            alt=""
            className={`w-[24px] h-[24px] transition-all duration-200 ${
              activeTab === "create" ? "invert brightness-0" : ""
            }`}
          />
          Create Form
        </button>

        <button
          onClick={() => setActiveTab("submit")}
          className={`flex w-1/2 items-center justify-center gap-2 px-6 py-3 rounded-[10px] text-[18px] font-[500] ${
            activeTab === "submit"
              ? "bg-[#00A0E3] text-white"
              : "bg-white text-[#4D4D4D] border border-[#D5D5D5]"
          }`}
        >
          <img
            src={submiticon}
            alt=""
            className={`w-[24px] h-[24px] transition-all duration-200 ${
              activeTab === "submit" ? "invert brightness-0" : ""
            }`}
          />
          Submit Response
        </button>
      </div>

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
              className="mt-[36px] text-[#4D4D4D] h-[71px] pl-[14px] w-[1299px] text-[25px] font-[500] bg-[#F5F5F5] rounded-[10px]"
            />

            {q.options?.map((opt) => (
              <div key={opt.id} className="flex items-center pl-[28px] space-x-3 mt-4">
                <input type="checkbox" className="h-[26px] w-[26px] border border-gray-400" />
                <input
                  type="text"
                  value={opt.label}
                  readOnly
                  className="h-[41px] w-[478px] bg-[#F5F5F5] rounded-[6px] px-3 text-[#4D4D4D] text-[16px]"
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
