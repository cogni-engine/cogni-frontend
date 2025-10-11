export type Message = {
  role: "user" | "assistant";
  content: string;
};

export type InputMode = "default" | "expanded";

export type SuggestionConfig = {
  suggestions: string[];
  inputPlaceholder?: string;
};

