import { Ellipsis, PenSquareIcon, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { ObjType } from "../../utils/types";

import "react-toastify/dist/ReactToastify.css";
import ConfirmationModal from "../shared/confirmation-modal";
import { useTranslation } from "react-i18next";
import { DeleteData } from "../../firebase/services";
import { setFormModalFun } from "../../utils/dispatch";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { deleteObject, getStorage, ref } from "firebase/storage";
interface Props {
  data: ObjType;
  refresh: () => void;
}
export const Card = ({ data, refresh }: Props) => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { loading, deleteFun, success } = DeleteData("employees");
  const { id, full_name, role, photo, position } = data;
  const userData = useSelector((state: RootState) => state.booleans.user);
  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };
  useEffect(() => {
    if (success) refresh();
  }, [success]);
  const storage = getStorage();
  const deletePhoto = async (path: string) => {
    const fileRef = ref(storage, path);
    try {
      await deleteObject(fileRef); // Faylni o'chirish
      console.log("File deleted successfully");
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };
  const handleConfirmDelete = () => {
    if (id) {
      deleteFun(id);
      deletePhoto(photo);
    }
    setIsModalOpen(false);
  };

  const editFun = (id: any) => {
    setFormModalFun({
      id,
      open: true,
      role: "edit",
      refresh: false,
      title: t("news.modal_edit"),
    });
  };

  const [popupActive, setPopupActive] = useState<boolean>(false);

  return (
    <div className="w-[338px] h-[450px] bg-white p-6 flex flex-col  border border-gray-200 shadow-sm relative rounded-2xl">
      <div className="flex justify-end w-full">
        {userData.role == "admin" && role == "Teacher" && (
          <Ellipsis
            className="cursor-pointer"
            onClick={() => setPopupActive((c) => !c)}
            style={{ color: "#606060" }}
          />
        )}
        {userData.role == "superAdmin" && (
          <Ellipsis
            className="cursor-pointer"
            onClick={() => setPopupActive((c) => !c)}
            style={{ color: "#606060" }}
          />
        )}
        {popupActive && (
          <div className="absolute top-14 right-4 p-4 bg-gray-50 border border-gray-200 rounded-md shadow-md">
            <div
              className="flex items-center gap-4 mb-4 cursor-pointer hover:bg-gray-200 p-2 rounded transition"
              onClick={() => editFun(id)}
            >
              <PenSquareIcon />
              <p className="text-sm">{t("employees.edit")}</p>
            </div>
            <button
              className={`flex items-center gap-4 cursor-pointer ${
                loading ? "opacity-50" : ""
              } hover:bg-gray-200 p-2 rounded transition`}
              onClick={handleDeleteClick}
              disabled={loading}
            >
              <Trash2 color="red" />
              <p className="text-red-500 text-sm">{t("employees.delete")}</p>
            </button>
          </div>
        )}
      </div>
      <div className="w-full mb-4">
        <img
          src={photo ? photo : "/user-logo.png"}
          alt="user photo"
          className="w-full h-[250px] rounded-xl "
        />
      </div>
      <h2 className="text-[18px] font-semibold text-[#303972] mb-2">
        {full_name}
      </h2>
      <p className="text text-gray-700 mb-1 ">
        {t("form.role")}:{" "}
        {role.toLowerCase() === "worker" ? t("employee") : t("form.teacher")}
      </p>
      <p className="text text-gray-700 mb-1 ">
        {t("form.position")}: {position}
      </p>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
        employeeName={full_name}
      />
    </div>
  );
};
