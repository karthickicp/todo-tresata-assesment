import { createSlice } from "@reduxjs/toolkit";
import type { ITodoReducerInitialState } from "../types/todo/todo-reducer";

const initialState: ITodoReducerInitialState = {
  isFetching: false,
  todos: [],
  isUpdating: false,
  error: null,
};
const todosSlice = createSlice({
  name: "todos",
  initialState: initialState,
  reducers: {
    addTodo(state, action) {
      state.todos.push(action.payload);
    },
    updateTodo(state, action) {
      const todoCopy = [...state.todos];
      const selectedTodoIndex = state.todos.findIndex(
        (todo) => todo.id === action.payload.id
      );

      if (selectedTodoIndex > -1) {
        todoCopy[selectedTodoIndex] = action.payload;
      }
      state.todos = todoCopy;
    },
    deleteTodo(state, action) {
      const todoCopy = [...state.todos];
      const selectedTodoIndex = state.todos.findIndex(
        (todo) => todo.id === action.payload
      );
      if (selectedTodoIndex > -1) {
        todoCopy.splice(selectedTodoIndex, 1);
      }
      state.todos = todoCopy;
    },
  },
});

export const { addTodo, updateTodo, deleteTodo } = todosSlice.actions;
export default todosSlice.reducer;
