import { useSelector } from "react-redux";
import { ModalForm } from "./form";
import { RootState } from "../../store/store";

export const FormModal = () => {
  const editData = useSelector((state: RootState) => state.booleans.edit);
  console.log(editData);

  return (
    <div className="fixed w-full h-screen left-0 top-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
      <ModalForm
        id={editData > 0 ? editData : 0}
        type={editData > 0 ? "put" : ""}
      />
    </div>
  );
};
