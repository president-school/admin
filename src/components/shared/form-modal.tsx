import { useSelector } from 'react-redux';
import { ModalForm } from './form';
import { RootState } from '../../store/store';

export const FormModal = () => {
  const editData = useSelector((state: RootState) => state.booleans.edit);
  return (
    <div className="fixed w-full h-screen left-0 top-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
      <ModalForm id={editData ? editData : 0} />
    </div>
  );
};
