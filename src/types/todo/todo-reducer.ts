export type ITodoReducerInitialState = {
  isFetching: boolean;
  todos: ITodos[];
  isUpdating: boolean;
  error: string | null;
};

export type ITodos = {
  id: string;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "completed";
  created_at: string;
  updated_at: string;
};
