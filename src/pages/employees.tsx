import { Loader, PlusCircleIcon, SearchIcon } from "lucide-react";
import { Card } from "../components/ui";
import { useSelector } from "react-redux";
import { EmployeesType, ObjType } from "../utils/types";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDebounce } from "../hooks/use-debauce";

import { GetFirebaseData } from "../firebase/services";
import { RootState } from "../store/store";
import { setFormModalFun } from "../utils/dispatch";

export const Employees = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const searchValue = useDebounce(searchTerm, 500);
  const { t } = useTranslation();
  const addEmployees = () => {
    setFormModalFun({
      role: "add",
      id: "",
      open: true,
      refresh: false,
      title: t("employees.modal_add"),
    });
  };
  const formDataAction = useSelector(
    (state: RootState) => state.booleans.fromModal
  );
  const {
    data: testData,
    loading,
    refresh,
  } = GetFirebaseData<EmployeesType[]>("employees");
  useEffect(() => {
    if (formDataAction.refresh) {
      refresh();
    }
  }, [formDataAction.refresh]);
  const langues: "uz" | "de" | "en" = useSelector(
    (state: RootState) => state.booleans.langue
  );
  const filter = testData.map((item) => {
    return { ...item[`${langues}`], id: item.id };
  });

  const filteredData = filter.filter((employee: ObjType) =>
    employee.full_name.toLowerCase().startsWith(searchValue.toLowerCase())
  );
  const sortData = filteredData.sort((a: any, b: any) => b.newDate - a.newDate);

  let newArray: ObjType[] = [];
  sortData.forEach((item) => {
    let index = Number(item.NewDate);
    newArray.splice(index - 1, 0, item);
  });

  return (
    <main className="w-full p-10">
      <h1 className="font-semibold text-[36px] text-[#303972] mb-4">
        {t("employees.title")}
      </h1>
      <div className="flex items-center justify-between mb-4">
        <div className="px-4 py-2 rounded-3xl bg-white flex gap-4 items-center">
          <SearchIcon size={16} className="text-[#303972]" />
          <input
            type="text"
            placeholder={t("employees.search")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="outline-none border-none bg-transparent"
          />
        </div>

        <button
          className="p-4 rounded-2xl bg-[#4D44B5] text-white flex items-center gap-4"
          onClick={addEmployees}
        >
          <PlusCircleIcon />
          {t("employees.add")}
        </button>
      </div>
      <section className="flex gap-10 flex-wrap h-[calc(100vh-200px)] overflow-auto">
        {loading && (
          <div className=" w-full flex justify-center items-center">
            <Loader className="animate-spin" size={40} />
          </div>
        )}
        {loading ||
          newArray.map((item: ObjType) => (
            <Card key={item.id} data={item} refresh={refresh} />
          ))}
        {!loading && newArray.length == 0 && (
          <div className="w-full flex justify-center items-center">
            <h2 className="text-3xl">{t("employees.not_found")}</h2>
          </div>
        )}
      </section>
    </main>
  );
};
