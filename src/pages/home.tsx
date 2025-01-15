import { Award, NewspaperIcon, UsersRound } from "lucide-react";

import { useTranslation } from "react-i18next";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GetFirebaseData } from "../firebase/services";
import { EmployeesType } from "../utils/types";

export const Home = () => {
  const { t } = useTranslation();
  const { data: employees } = GetFirebaseData<EmployeesType[]>("employees");
  const { data: news } = GetFirebaseData<EmployeesType[]>("news");
  const { data: achievements } =
    GetFirebaseData<EmployeesType[]>("achievements");
  return (
    <main className="w-full p-10">
      <ToastContainer theme="colored" pauseOnHover={false} autoClose={3000} />
      <h1 className="font-semibold text-[36px] text-[#303972] mb-11">
        {t("home.title")}
      </h1>
      <section className="bg-white rounded-2xl p-11 flex  justify-between items-center">
        <div className="flex gap-4">
          <div className="rounded-full p-4 bg-purple-950 text-white">
            <UsersRound />
          </div>
          <div className="text-center">
            <p>{t("home.employees")}</p>
            <h3 className="font-bold text-xl">
              {employees?.filter((data) => !data.uz.isTeacher).length}
            </h3>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="rounded-full p-4 bg-purple-950 text-white">
            <UsersRound />
          </div>
          <div className="text-center">
            <p>{t("home.teachers")}</p>
            <h3 className="font-bold text-xl">
              {employees?.filter((data) => data.uz.isTeacher).length}
            </h3>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="rounded-full p-4 bg-purple-950 text-white">
            <UsersRound />
          </div>
          <div className="text-center">
            <p>{t("home.all_employees")}</p>
            <h3 className="font-bold text-xl">{employees?.length}</h3>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="rounded-full p-4 bg-purple-950 text-white">
            <NewspaperIcon />
          </div>
          <div className="text-center">
            <p>{t("news.title")}</p>
            <h3 className="font-bold text-xl">{news?.length}</h3>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="rounded-full p-4 bg-purple-950 text-white">
            <Award />
          </div>
          <div className="text-center">
            <p>{t("achievements.title")}</p>
            <h3 className="font-bold text-xl">{achievements?.length}</h3>
          </div>
        </div>
      </section>
    </main>
  );
};
