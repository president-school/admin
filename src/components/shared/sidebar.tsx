import { NavLink } from "react-router-dom";
import { Logo, sidebarList } from "../../utils/constants";
import { useTranslation } from "react-i18next";
import { Select } from "antd";
import i18n from "i18next";
import { useDispatch, useSelector } from "react-redux";
import { setLangue } from "../../store/booleans";
import { LogOut } from "lucide-react";
import { useAuth } from "../../context/auth-context";
import { RootState } from "../../store/store";
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
    value: "de",
    label: "russian",
  },
];

export const Sidebar = () => {
  const dispatch = useDispatch();
  const onChangeLangue = (value: any) => {
    localStorage.setItem("langue", value);
    dispatch(setLangue(value));
    i18n.changeLanguage(value);
  };

  const { t } = useTranslation();
  const { logout, user } = useAuth();
  const userData = useSelector((state: RootState) => state.booleans.user);
  return (
    <article className="w-80 h-screen bg-[#4D44B5]  pr-0 pt-8 flex flex-col">
      <div className="flex items-center gap-4 mb-11 pl-2">
        <img src={Logo} alt="" className="w-16 h-16 rounded-md" />
        <div>
          <h2 className="text-[15px]  font-bold text-white">{user?.email}</h2>
          <p className="text-white">{userData.role}</p>
        </div>
      </div>
      <div className="flex flex-col  pl-10 flex-1">
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
      <div className="flex flex-col item-center justify-center pl-10">
        <Select
          className=" h-12 bg-[#4d44b5]  w-52"
          onChange={onChangeLangue}
          defaultValue={localStorage.getItem("langue") || "uz"}
          options={langue}
        />
        <div
          className="w-[210px] h-12 bg-white  rounded-md my-4 flex items-center gap-4 justify-center cursor-pointer"
          onClick={() => logout()}
        >
          <LogOut className="rotate-180" /> <p>Logout</p>
        </div>
      </div>
    </article>
  );
};
