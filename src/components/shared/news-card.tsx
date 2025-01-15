import { Ellipsis, PenSquareIcon, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { DeleteData } from "../../firebase/services";
import ConfirmationModal from "./confirmation-modal";
import { setNewsModalFun } from "../../utils/dispatch";
interface Props {
  id: string;
  title: string;
  description: string;
  img: string;
  refresh: () => void;
  path: string;
}

export const NewsCard = ({
  id,
  title,
  img,
  description,
  refresh,
  path,
}: Props) => {
  const [popupActive, setPopupActive] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { t } = useTranslation();
  const { loading, deleteFun, success } = DeleteData(path);
  useEffect(() => {
    if (success) refresh();
  }, [success]);

  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };
  const handleConfirmDelete = () => {
    if (id) {
      deleteFun(id);
    }
    setIsModalOpen(false);
  };
  return (
    <>
      <div className="w-96 h-[450px] bg-white shadow-md flex flex-col relative p-4 rounded-lg cursor-pointer">
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
                onClick={() =>
                  setNewsModalFun({
                    id,
                    open: true,
                    role: "edit",
                    refresh: false,
                    path,
                    title:t('news.modal_edit')
                  })
                }
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
            src={img ? img : "/no-picture.jpg"}
            alt="user photo"
            className="w-full h-[200px] rounded-xl "
          />
        </div>
        <h2 className="text-[18px] font-semibold text-[#303972] mb-2">
          {title.slice(0, 39)} {title.length > 39 ? "..." : ""}
        </h2>
        <p>
          {description.slice(0, 170)} {description.length > 39 ? "..." : ""}
        </p>
      </div>
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
        employeeName={title}
      />
    </>
  );
};
