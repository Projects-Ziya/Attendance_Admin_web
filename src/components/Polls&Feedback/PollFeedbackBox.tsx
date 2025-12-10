import React from "react";
import saveicon from "../../assets/icons/pollsfeedback/save.svg";
import { usePollFeedbackViewModel } from "../../viewmodels/PollsFeedback/usePollFeedbackViewModel";
import type { PollQuestion } from "../../models/pollsFeedbackModel";

// Dropdown component now receives a full question object from the viewmodel
function CheckBoxDropdown({
  question,
  handleAddOption,
  handleEditQuestionText,
  handleEditOption,
}: {
  question: PollQuestion;
  handleAddOption: (questionId: number) => void;
  handleEditQuestionText: (questionId: number, text: string) => void;
  handleEditOption: (questionId: number, optionId: number, label: string) => void;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="mt-[24px] ml-[28px]">
      {/* Question input (editable) */}
      <input
        className="mt-[36px] text-[#8E8B8B] placeholder:text-[25px] placeholder:font-[500] h-[71px] pl-[14px] justify-center w-[1299px] text-[25px] font-[500] bg-[#F5F5F5] focus:outline-none rounded-[10px]"
        type="text"
        placeholder="Question"
        value={question.text ?? ""}
        onChange={(e) => handleEditQuestionText(question.id, e.target.value)}
      />

      {/* Top Select (CheckBox type selector) */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="bg-[#F5F5F5] h-[71px] w-[478px] rounded-[10px] flex items-center px-4 justify-between mt-4"
      >
        <span className="text-[#8E8B8B] text-[22px] font-[500]">{question.type}</span>
        <span
          className={`text-[#8E8B8B] pb-4 text-[30px] w-10 transition-transform ${open ? "rotate-180" : ""}`}
        >
          ⌄
        </span>
      </button>

      {/* Dropdown options */}
      {open && question.options && (
        <div className="mt-3 space-y-2">
          {question.options.map((opt) => (
            <div key={opt.id} className="flex items-center pl-[28px] space-x-3">
              <input type="checkbox" className="h-[26px] w-[26px] border border-gray-400" />
              <input
                type="text"
                value={opt.label ?? ""}
                onChange={(e) => handleEditOption(question.id, opt.id, e.target.value)}
                className="h-[41px] w-[478px] bg-[#F5F5F5] rounded-[6px] px-3 focus:outline-none placeholder:text-[#B5B3B3] placeholder:text-[16px]"
                placeholder={`Option ${opt.id}`}
              />
            </div>
          ))}

          {/* Add Option */}
          <button
            type="button"
            className="text-[#8E8B8B] pl-[28px] text-[14px] font-[500] hover:underline"
            onClick={() => handleAddOption(question.id)}
          >
            Add Option
          </button>
        </div>
      )}
    </div>
  );
}

function PollsAndFeedback() {
  // ✅ Use the viewmodel
  const {
    form,
    handleAddOption,
    handleEditQuestionText,
    handleEditOption,
  } = usePollFeedbackViewModel();

  return (
    <div className="h-auto pl-[61px] w-[1469px] shadow-[0px_0px_2px_0px_#00000040] bg-white pb-[40px] rounded-[10px] flex items-center justify-center mb-[20px]">
      <div>
        <h1 className="text-[24px] pt-[56px] font-[600]">Polls and Feedback</h1>
        <p className="text-[18px] pt-[10px] font-[500] text-[#4D4D4D]">
          Engage your workforce through interactive polls and honest feedback
        </p>

        {/* Form header */}
        <div className="h-[208px] pl-[28px] w-[1359px] border rounded-[10px] mt-[60px] border-[#00A0E3]">
          <h1 className="text-[28px] font-[500] pt-[50px]">{form.title}</h1>
          <p className="text-[19px] font-[500] mt-[20px] text-[#686767]">Form Descriptions</p>
          <input
            type="text"
            value={form.description}
            className="w-[1299px] mt-3 outline-none focus:outline-none border-b-2 pr-[20px]"
            readOnly
          />
        </div>

        {/* Questions */}
        <div className="h-auto mt-[54px] w-[1359px] rounded-[10px] border-[1px] border-[#00A0E3]">
          {form.questions.map((q) => (
            <CheckBoxDropdown
              key={q.id}
              question={q}
              handleAddOption={handleAddOption}
              handleEditQuestionText={handleEditQuestionText}
              handleEditOption={handleEditOption}
            />
          ))}

          {/* Add Question button */}
          <div className="mt-[29px] ml-[28px] w-[1299px] h-[78px] rounded-[10px] bg-[#F5F5F5] flex items-center ">
            <button className="ml-[76px] text-[18px] font-[500] h-[59px] w-[1151px] rounded-[10px] bg-[#FFFFFF]">
              + Add Questions
            </button>
          </div>

          {/* Buttons */}
          <div className="bottom-[40px] mt-[100px] left-[42px] right-[32px] flex justify-between px-[28px] pb-[20px]">
            <button className="h-[68px] w-[252px] text-[#00A0E3] text-[22px] font-[500] border border-[#00A0E3] rounded-[10px]">
              Cancel
            </button>

            <button className="h-[68px] w-[252px] bg-[#00A0E3] text-[22px] font-[500] rounded-[10px] text-white flex items-center justify-center gap-2">
              <img src={saveicon} alt="" className="w-[22px] h-[22px]" />
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PollsAndFeedback;
