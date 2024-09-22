import { Navigate, Route, Routes } from "react-router-dom";
import i18n from "i18next";
import { FormModal, Sidebar } from "./components/shared";
import { Employees, Home, Acceptance, Login } from "./pages";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dataValue } from "./store/employees-slice";
import { RootState } from "./store/store";
import { getEmployees } from "./firebase/services";
import { initReactI18next } from "react-i18next";
import translationEn from "./locale/translationEn";
import translationUz from "./locale/translationUz";
import translationRu from "./locale/translationRu";
import { setLoading } from "./store/booleans";

function App() {
  const store = useSelector((state: RootState) => state.booleans);
  const { admin } = store;
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
    lng: `${langue || "uz"}`,
    fallbackLng: `${langue || "uz"}`,
  });

  const fetching = async () => {
    try {
      dispatch(setLoading(true));
      const data = await getEmployees();
      dispatch(dataValue(data));
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(setLoading(false));
    }
  };
  useEffect(() => {
    fetching();
  }, []);

  return (
    <div className="flex h-screen w-full relative">
      {admin && <Sidebar />}
      {FormModalActive && <FormModal />}
      <Routes>
        <Route path="/" element={admin ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={admin ? <Home /> : <Login />} />
        <Route
          path="/employees"
          element={admin ? <Employees /> : <Navigate to="/login" />}
        />
        <Route
          path="/acceptance"
          element={admin ? <Acceptance /> : <Navigate to="/login" />}
        />
        <Route
          path="*"
          element={
            admin ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "36px",
                  fontWeight: "900",
                }}
              >
                <p>Not founded page</p>
              </div>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;
