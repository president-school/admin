import { UsersRound } from "lucide-react";
import { getEmployees } from "../firebase/services";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ObjType } from "../lib/types";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const Home = () => {
  const { t } = useTranslation();
  const [employeesLength, setEmployeesLength] = useState<ObjType[]>([]);
  const [employees, setEmployees] = useState<ObjType[]>([]);
  const [teachers, setTeachers] = useState<ObjType[]>([]);
  const fetching = async () => {
    await getEmployees().then((data) => {
      setEmployees(data);
      setEmployeesLength(
        data.filter((item) => item.role.toLowerCase() !== "teacher")
      );

      setTeachers(data.filter((item) => item.role.toLowerCase() == "teacher"));
    });
  };
  const fetchData = async () => {
    await fetching();
  };
  useEffect(() => {
    fetchData();
    const showToast = localStorage.getItem('showToast');
    if (showToast) {
      toast.success(t("success"), {
        theme: 'colored'
      });
      setTimeout(() => {
        localStorage.removeItem('showToast');
      }, 4000);
    }
  }, []);


  return (
    <main className="w-full p-10">
      <ToastContainer
        theme='colored'
        pauseOnHover = {false}
        autoClose={3000}
      />
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
        <div className="flex gap-4">
          <div className="rounded-full p-4 bg-purple-950 text-white">
            <UsersRound />
          </div>
          <div className="text-center">
            <p>{t("home.all_employees")}</p>
            <h3 className="font-bold text-xl">{employees.length}</h3>
          </div>
        </div>
      </section>
    </main>
  );
};
