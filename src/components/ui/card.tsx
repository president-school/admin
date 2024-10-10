import { Ellipsis, PenSquareIcon, Trash2 } from "lucide-react";
import { useState } from "react";
import { ObjType } from "../../lib/types";
import { dataValue } from "../../store/employees-slice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { setEdit, setFromModal, setMethod } from "../../store/booleans";
import { deleteEmployee } from "../../firebase/services";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConfirmationModal from "../shared/confirmation-modal";
import { useTranslation } from "react-i18next";

interface Props {
  data: ObjType;
}

export const Card = ({ data }: Props) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const dispatch = useDispatch();

  const dataArr = useSelector(
    (state: RootState) => state.employees.employeesArr
  );
  const { id, full_name, role, photo, position } = data;

  const deleteData = async (id: string | undefined | number) => {
    if (id !== undefined) {
      try {
        setLoading(true);
        await deleteEmployee(id)
          .then(() => {
            toast.success(t("toast.delete_success"));
            dispatch(dataValue(dataArr.filter((item) => item.id !== id)));
          })
          .catch(() => {
            toast.error("Something went wrong");
          });
      } catch (err) {
        console.error("Error deleting employee:", err);
      } finally {
        setLoading(false);
      }
    } else {
      console.error("id is undefined");
    }
  };

  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (id) {
      deleteData(id);
    }
    setIsModalOpen(false);
  };

  const editFun = (id: string | undefined | number) => {
    dispatch(setEdit(id));
    dispatch(setFromModal());
    dispatch(setMethod("put"));
  };

  const [popupActive, setPopupActive] = useState<boolean>(false);

  return (
    <div className="w-[338px] h-[470px] overflow-y-scroll bg-white p-6 flex flex-col  border border-gray-200 shadow-sm relative rounded-2xl">
      <div className="flex justify-end w-full">
        <Ellipsis
          className="cursor-pointer"
          onClick={() => setPopupActive((c) => !c)}
          style={{ color: "#606060" }}
        />
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
          src={photo? photo :"/user-logo.png"}
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
