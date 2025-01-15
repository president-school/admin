import { Route, Routes } from "react-router-dom";
import i18n from "i18next";

import { initReactI18next } from "react-i18next";
import translationEn from "./locale/translationEn";
import translationUz from "./locale/translationUz";
import translationRu from "./locale/translationRu";

import { Layout } from "./layouts/layout";
import { routes } from "./utils/routes";
import { Login } from "./pages";

function App() {
  const langue = localStorage.getItem("langue");

  i18n.use(initReactI18next).init({
    resources: {
      en: { translation: translationEn },
      uz: { translation: translationUz },
      de: { translation: translationRu },
    },
    lng: `${langue || "uz"}`,
    fallbackLng: `${langue || "uz"}`,
  });
  if (typeof global === "undefined") {
    window.global = window;
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {routes.map((item) => {
          const Component = item.component;
          return (
            <Route key={item.id} path={item.path} element={<Component />} />
          );
        })}
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
