import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type State = {
  fromModal: boolean;
  fetching: boolean;
  edit: string | undefined | number;
  method: string;
  loading: boolean;
};
const initialState: State = {
  fromModal: false,
  fetching: false,
  edit: 0,
  method: "post",
  loading: false,
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
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});
export const { setFromModal, setFetching, setEdit, setMethod, setLoading } =
  booleansSlice.actions;
export default booleansSlice.reducer;
