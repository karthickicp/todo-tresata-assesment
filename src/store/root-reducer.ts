import { combineReducers } from "@reduxjs/toolkit";
import todosReducer from "../slices/todo";

export const rootReducer = combineReducers({
  todos: todosReducer,
});
