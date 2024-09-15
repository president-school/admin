import { useTranslation } from "react-i18next";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  employeeName: string;
}

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  employeeName,
}: ConfirmationModalProps) {
  const { t } = useTranslation();
  if (!isOpen) return null;
  return (
    <div className="h-screen fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-4">
          {t("employees.confirmation")}
        </h3>
        <p className="mb-6">
          {t("employees.modalText")} {employeeName} {t("employees.modalText2")}
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            {t("employees.yes")}
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            {t("employees.no")}
          </button>
        </div>
      </div>
    </div>
  );
}
