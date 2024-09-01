import { Ellipsis, Mail, PenSquareIcon, PhoneCall, Trash2 } from "lucide-react";
import { useState } from "react";
import { ObjType } from "../../lib/types";
import axios from "../../service/axios";
import { dataValue } from "../../store/employees-slice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { setEdit, setFromModal } from "../../store/booleans";
interface Props {
  data: ObjType;
}
export const Card = ({ data }: Props) => {
  const dispatch = useDispatch();
  const dataArr = useSelector(
    (state: RootState) => state.employees.employeesArr
  );
  const { id, name, role, surname, img } = data;
  async function deleteData(id: number | undefined) {
    try {
      dispatch(dataValue(dataArr.filter((item) => item.id != id)));
      axios.delete(`hodimlar/${id}`);
    } catch (err) {
      console.log(err);
    }
  }
  const editFun = (id: number | undefined) => {
    dispatch(setEdit(id));
    dispatch(setFromModal());
  };
  const [popupActive, setPopupActive] = useState<boolean>(false);
  return (
    <div className="w-[338px] h-[352px] rounded-lg bg-white p-8 flex flex-col items-center">
      <div className="flex justify-end w-full relative">
        <Ellipsis
          className="cursor-pointer"
          onClick={() => setPopupActive((c) => !c)}
        />
        {popupActive && (
          <div className="absolute top-8 p-4 bg-stone-200 rounded-md ">
            <div
              className=" flex items-center gap-4 mb-4 cursor-pointer"
              onClick={() => editFun(id)}
            >
              <PenSquareIcon />
              <p>Tahrirlash</p>
            </div>
            <div
              className=" flex items-center gap-4 cursor-pointer"
              onClick={() => deleteData(id)}
            >
              <Trash2 color="red" />
              <p className="text-red-500">O'chirish</p>
            </div>
          </div>
        )}
      </div>
      <div className="w-[120px] h-[120px] rounded-full bg-purple-300 mb-4">
        <img
          src={img}
          alt=""
          className="w-full h-full rounded-full object-cover"
        />
      </div>
      <h2 className="text-[24px] font-semibold text-[#303972] mb-2">
        {name + " " + surname}
      </h2>
      <p className="mb-4">{role}</p>
      <div className="flex gap-4 items-center text-[#303972]">
        <PhoneCall />
        <Mail />
      </div>
    </div>
  );
};
