import { Acceptance, Employees, Home } from "../pages";
import { Achievements } from "../pages/achievements";
import { News } from "../pages/news";
import { RoutesType } from "./types";

export const routes: RoutesType[] = [
  { id: "1", path: "/", component: Home },
  { id: "2", path: "/employees", component: Employees },
  { id: "3", path: "/news", component: News },
  { id: "4", path: "/achievements", component: Achievements },
  { id: "5", path: "/acceptance", component: Acceptance },
];
