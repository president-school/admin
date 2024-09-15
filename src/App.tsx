import { Route, Routes } from "react-router-dom";
import i18n from "i18next";
import { FormModal, Sidebar } from "./components/shared";
import { Employees, Home, Acceptance } from "./pages";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dataValue } from "./store/employees-slice";
import { RootState } from "./store/store";
import { getEmployees } from "./firebase/services";
import { initReactI18next } from "react-i18next";
import translationEn from "./locale/translationEn";
import translationUz from "./locale/translationUz";
import translationRu from "./locale/translationRu";

function App() {
  
  const langue = localStorage.getItem("langue");
  const dispatch = useDispatch();
  const FormModalActive = useSelector(
    (state: RootState) => state.booleans.fromModal
  );
  i18n.use(initReactI18next).init({
    resources: {
      en: { translation: translationEn },
      uz: { translation: translationUz },
      ru: { translation: translationRu },
    },
    lng: `${langue ||"uz"}`,
    fallbackLng: `${langue ||"uz"}`,
  });

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
