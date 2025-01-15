import { Home, Users, UserPlus, NewspaperIcon, Award } from "lucide-react";

export const Logo = "/logo.jpg";

export const sidebarList = [
  { id: 1, Icon: Home, label: "home", url: "/" },
  { id: 2, Icon: Users, label: "employees", url: "/employees" },
  { id: 3, Icon: NewspaperIcon, label: "news", url: "/news" },
  { id: 4, Icon: Award, label: "achievements", url: "/achievements" },
  { id: 5, Icon: UserPlus, label: "acceptance", url: "/acceptance" },
];

export const admins = [
  {
    id: 1,
    name: "Shahzod",
    login: "admin123",
    password: "123789",
    role: "ADMIN",
  },
];
