import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ObjType } from "../lib/types";

interface Data {
  employeesArr:ObjType[]
}

const initialState: Data = {
  employeesArr: [],
};

export const employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    dataValue: (state, action: PayloadAction<ObjType[]>) => {
      state.employeesArr = action.payload;
    },
  },
});

export const { dataValue } = employeesSlice.actions;
export default employeesSlice.reducer; 
