import { Route, Routes } from 'react-router-dom';
import { FormModal, Sidebar } from './components/shared';
import { Employees, Home, Acceptance } from './pages';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dataValue } from './store/employees-slice';
import { RootState } from './store/store';
import { getEmployees } from './firebase/services';

function App() {
  const dispatch = useDispatch();
  const FormModalActive = useSelector((state: RootState) => state.booleans.fromModal);
  const fetching = async () => {
    const data = await getEmployees();

    dispatch(dataValue(data));
  };
  useEffect(() => {
    fetching();
  }, []);

  return (
    <div className="flex h-screen w-full">
      <Sidebar />
      {FormModalActive && <FormModal />}
      <Routes>
        <Route index element={<Home />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/acceptance" element={<Acceptance />} />
      </Routes>
    </div>
  );
}

export default App;
