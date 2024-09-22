import { PlusCircleIcon, SearchIcon } from "lucide-react";
import { Card } from "../components/ui";
import { useDispatch, useSelector } from "react-redux";
import { ObjType } from "../lib/types";
import { RootState } from "../store/store";
import { setFromModal, setMethod } from "../store/booleans";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDebounce } from "../hooks/use-debauce";
import MyLoader from "../components/ui/card-loader";

export const Employees = () => {
  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.employees.employeesArr);
  const loading = useSelector((state: RootState) => state.booleans.loading);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const searchValue = useDebounce(searchTerm, 500);
  const { t } = useTranslation();
  const addEmployees = () => {
    dispatch(setFromModal());
    dispatch(setMethod("post"));
  };

  const filteredData = data.filter((employee: ObjType) =>
    employee.full_name.toLowerCase().startsWith(searchValue.toLowerCase())
  );
  const sortData = filteredData.sort((a: any, b: any) => a.newDate - b.newDate);
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
          className="p-4 rounded-2xl bg-purple-800 text-white flex items-center gap-4"
          onClick={addEmployees}
        >
          <PlusCircleIcon />
          {t("employees.add")}
        </button>
      </div>
      <section className="flex gap-10 flex-wrap h-[calc(100vh-200px)] overflow-auto">
        {loading &&
          new Array(8).fill(0).map((_, index) => <MyLoader key={index} />)}
        {loading ||
          sortData.map((item: ObjType) => <Card key={item.id} data={item} />)}
      </section>
    </main>
  );
};
