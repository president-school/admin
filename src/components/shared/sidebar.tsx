import { NavLink } from "react-router-dom";
import { Logo, sidebarList } from "../../utils/constants";

export const Sidebar = () => {
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
              <p>{item.label}</p>
            </div>
          </NavLink>
        ))}
      </div>
    </article>
  );
};
