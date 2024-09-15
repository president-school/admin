import { NavLink } from "react-router-dom";
import { Logo, sidebarList } from "../../utils/constants";
import { useTranslation } from "react-i18next";
import { Select } from "antd";
import i18n from "i18next";
const langue = [
  {
    value: "uz",
    label: "uzbek",
  },
  {
    value: "en",
    label: "english",
  },
  {
    value: "ru",
    label: "russian",
  },
];
export const Sidebar = () => {
  const onChangeLangue = (value: string) => {
    localStorage.setItem("langue", value);
    i18n.changeLanguage(value);
  };
  const { t } = useTranslation();
  return (
    <article className="w-80 h-screen bg-[#4D44B5] p-10 pr-0 pt-8">
      <div className="flex items-center gap-4 mb-11">
        <img src={Logo} alt="" />
        <h1 className="text-[32px]  font-bold text-white">Akademi</h1>
      </div>
      <div className="flex flex-col">
        {sidebarList.map((item) => (
          <NavLink to={item.url} key={item.id}>
            <div
              className={`flex items-center gap-4 p-4 cursor-pointer btn text-white`}
            >
              <item.Icon />
              <p> {t(`sidebar.${item.label}`)}</p>
            </div>
          </NavLink>
        ))}
      </div>
      <Select
        className=" h-12 bg-[#4d44b5] absolute bottom-5 w-52"
        onChange={onChangeLangue}
        defaultValue={localStorage.getItem("langue") ||"uz"}
        options={langue}
      ></Select>
    </article>
  );
};
