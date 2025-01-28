import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  AcceptanceModalAction,
  FormModalType,
  langueType,
  NewsType,
  UserData,
} from "../utils/types";

type State = {
  fromModal: FormModalType;
  fetching: boolean;
  edit: string | undefined | number;
  method: string;
  loading: boolean;
  admin: string;
  langue: langueType | any;
  newsModal: NewsType;
  acceptanceModal: AcceptanceModalAction;
  userEmail: string;
  user: UserData;
};
const initialState: State = {
  fromModal: { id: "", open: false, role: "add", refresh: false, title: "" },
  acceptanceModal: { text: "", open: false, refresh: false },
  newsModal: {
    id: "",
    open: false,
    role: "add",
    refresh: false,
    path: "",
    title: "",
  },
  fetching: false,
  edit: 0,
  method: "post",
  loading: false,
  admin: localStorage?.getItem("userRole") || "",
  langue: localStorage?.getItem("langue") || "uz",
  userEmail: "",
  user: { email: "", role: "" },
};
const booleansSlice = createSlice({
  name: "booleans",
  initialState,
  reducers: {
    setFromModal: (state, action: PayloadAction<FormModalType>) => {
      state.fromModal = action.payload;
    },
    setNewsModal: (state, action: PayloadAction<NewsType>) => {
      state.newsModal = action.payload;
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
    setAdmin: (state, action: PayloadAction<string>) => {
      state.admin = action.payload;
    },
    setLangue: (state, action: PayloadAction<langueType>) => {
      state.langue = action.payload;
    },
    setUserEmail: (state, action: PayloadAction<string>) => {
      state.userEmail = action.payload;
    },

    setAcceptanceModal: (
      state,
      action: PayloadAction<AcceptanceModalAction>
    ) => {
      state.acceptanceModal = action.payload;
    },

    setUser: (state, action: PayloadAction<UserData>) => {
      state.user = action.payload;
    },
  },
});
export const {
  setFromModal,
  setFetching,
  setEdit,
  setMethod,
  setLoading,
  setAdmin,
  setLangue,
  setNewsModal,
  setAcceptanceModal,
  setUserEmail,
  setUser,
} = booleansSlice.actions;
export default booleansSlice.reducer;
