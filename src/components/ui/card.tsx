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
import ConfirmationModal from '../shared/confirmation-modal';

interface Props {
  data: ObjType;
}

export const Card = ({ data }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const dispatch = useDispatch();
  const dataArr = useSelector((state: RootState) => state.employees.employeesArr);
  const { id, full_name, role, photo } = data;

  const deleteData = async (id: string | undefined | number) => {
    if (id !== undefined) {
      try {
        setLoading(true);
        await deleteEmployee(id)
          .then(() => {
            toast.success('Ishchi muvaffaqiyatli o`chirildi');
            dispatch(dataValue(dataArr.filter((item) => item.id !== id)));
          })
          .catch(() => {
            toast.error('Something went wrong');
          });
      } catch (err) {
        console.error('Error deleting employee:', err);
      } finally {
        setLoading(false);
      }
    } else {
      console.error('id is undefined');
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
  };

  const [popupActive, setPopupActive] = useState<boolean>(false);

  return (
    <div className="w-[338px] h-auto bg-white p-6 flex flex-col items-center border border-gray-200 shadow-sm relative">
      <div className="flex justify-end w-full">
        <Ellipsis
          className="cursor-pointer"
          onClick={() => setPopupActive((c) => !c)}
          style={{ color: '#606060' }}
        />
        {popupActive && (
          <div className="absolute top-8 right-4 p-4 bg-gray-50 border border-gray-200 rounded-md shadow-md">
            <div
              className="flex items-center gap-4 mb-4 cursor-pointer hover:bg-gray-200 p-2 rounded transition"
              onClick={() => editFun(id)}>
              <PenSquareIcon />
              <p className="text-sm">Tahrirlash</p>
            </div>
            <button
              className={`flex items-center gap-4 cursor-pointer ${
                loading ? 'opacity-50' : ''
              } hover:bg-gray-200 p-2 rounded transition`}
              onClick={handleDeleteClick}
              disabled={loading}>
              <Trash2 color="red" />
              <p className="text-red-500 text-sm">O'chirish</p>
            </button>
          </div>
        )}
      </div>
      <div className="w-full mb-4">
        <img src={photo} alt="user photo" className="w-full h-[300px]" />
      </div>
      <h2 className="text-[24px] font-semibold text-[#303972] mb-2">{full_name}</h2>
      <p className="text-sm text-gray-500 mb-4">
        {role.toLowerCase() === 'worker' ? 'Employee' : role}
      </p>
      <div className="flex gap-4 items-center text-[#303972]">
        <PhoneCall className="hover:text-[#4b5563] cursor-pointer transition transform hover:scale-105" />
        <Mail className="hover:text-[#4b5563] cursor-pointer transition transform hover:scale-105" />
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
        employeeName={full_name}
      />
    </div>
  );
};
