import { Ellipsis, Mail, PenSquareIcon, PhoneCall, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { ObjType } from '../../lib/types';
import { dataValue } from '../../store/employees-slice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { setEdit, setFromModal } from '../../store/booleans';
import { deleteEmployee } from '../../firebase/services';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Props {
  data: ObjType;
}
export const Card = ({ data }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const dataArr = useSelector((state: RootState) => state.employees.employeesArr);
  const { id, full_name, role, photo } = data;
  async function deleteData(id: string) {
    try {
      setLoading(true);
      await deleteEmployee(id)
        .then(() => {
          toast.success('Ishchi muvaffaqiyatli o`chirildi');
        })
        .catch(() => {
          toast.error('Something went wrong');
        });
      dispatch(dataValue(dataArr.filter((item) => item.id !== id)));
    } catch (err) {
      console.error('Error deleting employee:', err);
    } finally {
      setLoading(false);
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
        <Ellipsis className="cursor-pointer" onClick={() => setPopupActive((c) => !c)} />
        {popupActive && (
          <div className="absolute top-8 p-4 bg-stone-200 rounded-md ">
            <div
              className=" flex items-center gap-4 mb-4 cursor-pointer"
              onClick={() => editFun(id)}>
              <PenSquareIcon />
              <p>Tahrirlash</p>
            </div>
            <button
              className={`flex items-center gap-4 cursor-pointer ${loading && 'opacity-20'} `}
              onClick={() => deleteData(id)}
              disabled={loading}>
              <Trash2 color="red" />
              <p className="text-red-500">O'chirish</p>
            </button>
          </div>
        )}
      </div>
      <div className="w-[120px] rounded-lg h-[120px] mb-4">
        <img src={photo} alt="user photo" className="w-full h-full rounded-full" />
      </div>
      <h2 className="text-[24px] font-semibold text-[#303972] mb-2">{full_name}</h2>
      <p className="mb-4">{role}</p>
      <div className="flex gap-4 items-center text-[#303972]">
        <PhoneCall />
        <Mail />
      </div>
    </div>
  );
};
