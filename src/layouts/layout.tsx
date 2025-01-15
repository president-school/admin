import { Outlet } from "react-router-dom";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";
import { AddNews } from "../components/shared/add-news";
import { FormModal, Sidebar } from "../components/shared";
import { AcceptanceEdit } from "../components/shared/acceptance-edit";

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
