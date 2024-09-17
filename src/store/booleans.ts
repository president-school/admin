import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type State = {
  fromModal: boolean;
  fetching: boolean;
  edit: string | undefined | number;
  method: string;
};
const initialState: State = {
  fromModal: false,
  fetching: false,
  edit: 0,
  method: "post",
};
const booleansSlice = createSlice({
  name: "booleans",
  initialState,
  reducers: {
    setFromModal: (state) => {
      state.fromModal = !state.fromModal;
    },
    setFetching: (state) => {
      state.fetching = !state.fetching;
    },
    setEdit: (state, action: PayloadAction<string | undefined | number>) => {
      state.edit = action.payload;
    },
    setMethod: (state, action: PayloadAction<string>) => {
      state.method = action.payload;
    },
  },
});
export const { setFromModal, setFetching, setEdit,setMethod } = booleansSlice.actions;
export default booleansSlice.reducer;
