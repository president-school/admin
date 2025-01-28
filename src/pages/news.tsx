import { Button } from "antd";
import { CirclePlus, Loader, SearchIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { setNewsModalFun } from "../utils/dispatch";
import { NewsData, NewsResData } from "../utils/types";
import { GetFirebaseData } from "../firebase/services";
import { NewsCard } from "../components/shared/news-card";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";
import { useDebounce } from "../hooks/use-debauce";
import { useEffect, useState } from "react";

export const News = () => {
  const { t } = useTranslation();
  const { data, loading, refresh } = GetFirebaseData<NewsResData[]>("news");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const modalAction = useSelector(
    (state: RootState) => state.booleans.newsModal
  );

  useEffect(() => {
    if (modalAction.refresh) {
      refresh();
    }
  }, [modalAction.refresh]);

  const langues: "uz" | "de" | "en" = useSelector(
    (state: RootState) => state.booleans.langue
  );
  const filter = data.map((item) => {
    return { ...item[`${langues}`], id: item.id };
  });
  const searchValue = useDebounce(searchTerm, 500);

  const filteredData = filter.filter((news: NewsData) =>
    news.title.toLowerCase().startsWith(searchValue.toLowerCase())
  );
  const sortData = filteredData.sort((a: any, b: any) => a.date - b.date);

  let newArray: NewsData[] = [];
  sortData.forEach((item) => {
    let index = Number(item.date);
    newArray.splice(index - 1, 0, item);
  });

  return (
    <main className="w-full p-10">
      <h1 className="font-semibold text-[36px] text-[#303972] mb-4">
        {t("news.title")}
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
              path: "news",
              title: t("news.modal_add"),
            })
          }
        >
          <CirclePlus />
          {t("news.add_btn")}
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
            filteredData.map((item, i) => (
              <NewsCard
                key={item.id}
                title={item.title}
                description={item.description}
                img={item.images ? item?.images : ""}
                id={item.id}
                refresh={refresh}
                path="news"
                admin={item.role}
              />
            ))}
          {!loading && filteredData.length == 0 && (
            <div className="w-full flex justify-center items-center">
              <h2 className="text-3xl">{t("news.not_found")}</h2>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};
