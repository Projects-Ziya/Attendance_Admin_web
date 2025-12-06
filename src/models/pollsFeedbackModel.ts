// pollsFeedbackModel.ts

// Represents a single option in a question
export type PollOption = {
  id: number;        // unique identifier
  label: string;     // text shown to the user
  checked?: boolean; // optional: whether employee selected it
};

// Represents a single question in the poll
export type PollQuestion = {
  id: number;             // unique identifier
  type: "CheckBox" | "Radio" | "Text"; // question type
  text: string;           // the question itself
  options?: PollOption[]; // only for checkbox/radio types
};

// Represents the entire poll form
export type PollForm = {
  id: number;             // unique identifier for the poll
  title: string;          // form title
  description: string;    // form description
  questions: PollQuestion[];
};
