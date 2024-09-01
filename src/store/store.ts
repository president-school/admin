import { configureStore } from "@reduxjs/toolkit";
import employeesReducer from "./employees-slice";
import booleansSlice from "./booleans";

export const store = configureStore({
  reducer: {
    employees: employeesReducer,
    booleans: booleansSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;
