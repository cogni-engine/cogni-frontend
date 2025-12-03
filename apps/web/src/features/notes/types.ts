export interface ToolbarButtonProps {
  onClick: () => void;
  isActive?: boolean;
  disabled?: boolean;
  icon: React.ReactNode;
  title: string;
}

export type ToggleCommand = {
  run: () => void;
};

export type TaskListChain = {
  toggleTaskList?: () => ToggleCommand;
};

export type StrikeChain = {
  toggleStrike?: () => ToggleCommand;
};
