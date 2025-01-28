import {
  setAcceptanceModal,
  setFromModal,
  setNewsModal,
  setUser,
  setUserEmail,
} from "../store/booleans";
import { store } from "../store/store";
import {
  AcceptanceModalAction,
  FormModalType,
  NewsType,
  UserData,
} from "./types";
const { dispatch } = store;
export const setFormModalFun = (data: FormModalType) =>
  dispatch(setFromModal(data));
export const setNewsModalFun = (data: NewsType) => dispatch(setNewsModal(data));
export const AcceptanceModal = (data: AcceptanceModalAction) =>
  dispatch(setAcceptanceModal(data));

export const userEmailFun = (data: string) => dispatch(setUserEmail(data));

export const setUserFun = (data: UserData) => dispatch(setUser(data));
