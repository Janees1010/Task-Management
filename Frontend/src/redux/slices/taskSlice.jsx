import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const tasktSlice = createSlice({
  name: "tasktSlice",
  initialState: initialState,
  reducers: {
    addTasks: (state, action) => {
      action.payload.forEach((t) => {
        if (!state.find((task) => task._id == t._id)) {
          state.push(t);
        }
      });
    },
    addOneTask: (state, action) => {
      state.push(action.payload);
    },
    updateTask: (state, action) => {
      return state.map((task) =>
        task._id === action.payload._id ? action.payload : task
      );
    },
    replaceTask: (state, action) => {
      return action.payload;
    },
    deleteTask: (state, action) => {
      return state.filter((task) => task._id != action.payload.id);
    },
  },
});

export const { addOneTask, addTasks, deleteTask, updateTask, replaceTask } =
  tasktSlice.actions;
export default tasktSlice.reducer;
