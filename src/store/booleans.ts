import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type State = {
  fromModal: boolean;
  fetching: boolean;
  edit: number | undefined;
};
const initialState: State = {
  fromModal: false,
  fetching: false,
  edit: 0,
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
    setEdit: (state, action: PayloadAction<number | undefined>) => {
      state.edit = action.payload;
    },
  },
});
export const { setFromModal, setFetching, setEdit } = booleansSlice.actions;
export default booleansSlice.reducer;
