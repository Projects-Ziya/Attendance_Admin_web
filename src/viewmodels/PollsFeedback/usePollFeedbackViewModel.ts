// PollFeedbackViewModel.ts (VIEWMODEL)

import { useState } from "react";
import type { PollForm, PollQuestion, PollOption } from "../../models/pollsFeedbackModel";

export const usePollFeedbackViewModel = () => {
  // -----------------------------
  // Polls & Feedback state
  // -----------------------------
  const [form, setForm] = useState<PollForm>({
    id: Date.now(),
    title: "Untitled Form",
    description: "",
    questions: [
      {
        id: Date.now(),
        type: "CheckBox",
        text: "Question",
        options: [{ id: 1, label: "Option 1" }],
      },
    ],
  });

  // -----------------------------
  // Methods
  // -----------------------------

  // Update form title
  const setFormTitle = (title: string) => {
    setForm((prev) => ({ ...prev, title }));
  };

  // Update form description
  const setFormDescription = (description: string) => {
    setForm((prev) => ({ ...prev, description }));
  };

  // Add a new question
  const handleAddQuestion = (type: PollQuestion["type"] = "CheckBox") => {
    const newQuestion: PollQuestion = {
      id: Date.now(),
      type,
      text: "New Question",
      options: type !== "Text" ? [{ id: 1, label: "Option 1" }] : undefined,
    };
    setForm((prev) => ({
      ...prev,
      questions: [...prev.questions, newQuestion],
    }));
  };

  // Edit a question text
  const handleEditQuestionText = (questionId: number, text: string) => {
    setForm((prev) => ({
      ...prev,
      questions: prev.questions.map((q) =>
        q.id === questionId ? { ...q, text } : q
      ),
    }));
  };

  // Add option to a question
  // Add option to a question
const handleAddOption = (questionId: number) => {
  setForm((prevForm) => {
    return {
      ...prevForm,
      questions: prevForm.questions.map((q) => {
        if (q.id === questionId && q.options) {
          const newOption: PollOption = {
            id: Date.now(),
            label: `Option ${q.options.length + 1}`,
          };
          return {
            ...q,
            options: [...q.options, newOption],
          };
        }
        return q;
      }),
    };
  });
};


  // Edit option text
  const handleEditOption = (questionId: number, optionId: number, label: string) => {
    setForm((prev) => ({
      ...prev,
      questions: prev.questions.map((q) =>
        q.id === questionId && q.options
          ? {
              ...q,
              options: q.options.map((opt) =>
                opt.id === optionId ? { ...opt, label } : opt
              ),
            }
          : q
      ),
    }));
  };

  // Delete option
  const handleDeleteOption = (questionId: number, optionId: number) => {
    setForm((prev) => ({
      ...prev,
      questions: prev.questions.map((q) =>
        q.id === questionId && q.options
          ? {
              ...q,
              options: q.options.filter((opt) => opt.id !== optionId),
            }
          : q
      ),
    }));
  };

  return {
    form,
    setFormTitle,
    setFormDescription,
    handleAddQuestion,
    handleEditQuestionText,
    handleAddOption,
    handleEditOption,
    handleDeleteOption,
  };
};
