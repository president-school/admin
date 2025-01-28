import { Outlet } from "react-router-dom";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";
import { AddNews } from "../components/shared/add-news";
import { FormModal, Sidebar } from "../components/shared";
import { AcceptanceEdit } from "../components/shared/acceptance-edit";

import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { setUserFun } from "../utils/dispatch";
import { UserData } from "../utils/types";
export const Layout = () => {
  const FormModalActive = useSelector(
    (state: RootState) => state.booleans.fromModal
  );
  const FormNewsActive = useSelector(
    (state: RootState) => state.booleans.newsModal
  );
  const acceptanceModal = useSelector(
    (state: RootState) => state.booleans.acceptanceModal
  );

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const data: UserData = {
        email: user?.email ? user.email : "",
        role: user.email === "adimin@gmail.com" ? "admin" : "superAdmin",
      };
      setUserFun(data);
      // ...
    } else {
    }
  });
  return (
    <div className="flex h-screen w-full relative">
      <Sidebar />
      {FormModalActive.open && <FormModal />}
      {FormNewsActive.open && <AddNews />}
      {acceptanceModal.open && <AcceptanceEdit />}
      <Outlet />
    </div>
  );
};
