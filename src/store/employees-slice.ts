import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ObjType } from "../utils/types";

interface Data {
  employeesArr: ObjType[];
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
    addData: (state, action: PayloadAction<ObjType>) => {
      state.employeesArr.push(action.payload);
    },
  },
});

export const { dataValue, addData } = employeesSlice.actions;
export default employeesSlice.reducer;
