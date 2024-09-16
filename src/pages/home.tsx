import { UsersRound } from "lucide-react";
import { getEmployees } from "../firebase/services";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ObjType } from "../lib/types";

export const Home = () => {
  const { t } = useTranslation();
  const [employeesLength, setEmployeesLength] = useState<ObjType[]>([]);
  const [teachers, setTeachers] = useState<ObjType[]>([]);
  const fetching = async () => {
    getEmployees().then((data) => setEmployeesLength(data));
    const teacher = employeesLength.filter((item) => item.isTeacher);
    setTeachers(teacher);
  };
  useEffect(() => {
    fetching();
  }, []);

  return (
    <main className="w-full p-10">
      <h1 className="font-semibold text-[36px] text-[#303972] mb-11">
        {t("home.title")}
      </h1>
      <section className="bg-white rounded-2xl p-11 flex gap-10">
        <div className="flex gap-4">
          <div className="rounded-full p-4 bg-purple-950 text-white">
            <UsersRound />
          </div>
          <div className="text-center">
            <p>{t("home.employees")}</p>
            <h3 className="font-bold text-xl">{employeesLength.length}</h3>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="rounded-full p-4 bg-purple-950 text-white">
            <UsersRound />
          </div>
          <div className="text-center">
            <p>{t("home.teachers")}</p>
            <h3 className="font-bold text-xl">{teachers.length}</h3>
          </div>
        </div>
      </section>
    </main>
  );
};
