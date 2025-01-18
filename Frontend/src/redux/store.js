import { configureStore } from "@reduxjs/toolkit";
import tasktSlice from "./slices/taskSlice";
import userSlice from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    task: tasktSlice,
  },
});
