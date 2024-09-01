import { Route, Routes } from "react-router-dom";
import { FormModal, Sidebar } from "./components/shared";
import { Employees, Home } from "./pages";
import axios from "./service/axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dataValue } from "./store/employees-slice";
import { RootState } from "./store/store";

function App() {
  const dispatch = useDispatch();
  const FormModalActive = useSelector(
    (state: RootState) => state.booleans.fromModal
  );
  const fetching = async () => {
    const { data } = await axios.get("/hodimlar");

    dispatch(dataValue(data));
  };
  useEffect(() => {
    fetching();
  }, []);

  return (
    <div className="flex h-screen w-full">
      <Sidebar />
      {FormModalActive && <FormModal  />}
      <Routes>
        <Route index element={<Home />} />
        <Route path="/employees" element={<Employees />} />
      </Routes>
    </div>
  );
}

export default App;
