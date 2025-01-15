import {
  setAcceptanceModal,
  setFromModal,
  setNewsModal,
} from "../store/booleans";
import { store } from "../store/store";
import { AcceptanceModalAction, FormModalType, NewsType } from "./types";
const { dispatch } = store;
export const setFormModalFun = (data: FormModalType) =>
  dispatch(setFromModal(data));
export const setNewsModalFun = (data: NewsType) => dispatch(setNewsModal(data));
export const AcceptanceModal = (data: AcceptanceModalAction) =>
  dispatch(setAcceptanceModal(data));
