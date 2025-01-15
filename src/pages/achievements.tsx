import { Button } from "antd";
import { CirclePlus, Loader, SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { GetFirebaseData } from "../firebase/services";
import { NewsData, NewsResData } from "../utils/types";
import { useDebounce } from "../hooks/use-debauce";
import { NewsCard } from "../components/shared/news-card";

import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { setNewsModalFun } from "../utils/dispatch";

export const Achievements = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { data, loading, refresh } =
    GetFirebaseData<NewsResData[]>("achievements");
  const langues: "uz" | "de" | "en" = useSelector(
    (state: RootState) => state.booleans.langue
  );
  const filter = data.map((item) => {
    return { ...item[`${langues}`], id: item.id };
  });

  const modalAction = useSelector(
    (state: RootState) => state.booleans.newsModal
  );
  useEffect(() => {
    if (modalAction.refresh) {
      refresh();
    }
  }, [modalAction.refresh]);
  const searchValue = useDebounce(searchTerm, 500);

  const filteredData = filter.filter((news: NewsData) =>
    news.title.toLowerCase().startsWith(searchValue.toLowerCase())
  );
  const { t } = useTranslation();

  return (
    <main className="w-full p-10">
      <h1 className="font-semibold text-[36px] text-[#303972] mb-4">
        {t("achievements.title")}
      </h1>
      <div className="flex justify-between items-center mb-10">
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
        <Button
          type="primary"
          className="py-6"
          onClick={() =>
            setNewsModalFun({
              id: "",
              open: true,
              role: "add",
              refresh: false,
              path: "achievements",
              title: t("achievements.modal_add"),
            })
          }
        >
          <CirclePlus />
          {t("achievements.modal_add")}
        </Button>
      </div>
      <div>
        <section className="flex gap-10 flex-wrap h-[calc(100vh-200px)] overflow-auto w-full">
          {loading && (
            <div className=" w-full flex justify-center items-center">
              <Loader className="animate-spin" size={40} />
            </div>
          )}
          {loading ||
            filteredData.map((item) => (
              <NewsCard
                key={item.id}
                title={item.title}
                description={item.description}
                img={item.images ? item.images[0] : ""}
                id={item.id}
                refresh={refresh}
                path="achievements"
              />
            ))}
          {!loading && filteredData.length == 0 && (
            <div className="w-full flex justify-center items-center">
              <h2 className="text-3xl">{t("achievements.not_found")}</h2>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};
