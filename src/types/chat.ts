export type Message = {
  id?: string;
  role: "user" | "assistant";
  content: string;
};

export type InputMode = "default" | "expanded";

export type SuggestionConfig = {
  suggestions: string[];
  inputPlaceholder?: string;
};

