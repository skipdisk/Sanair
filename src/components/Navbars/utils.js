import { logout } from "config/auth";

export const hamburgerLinks = [
  {
    title: <span>My profile</span>,
    icon: <i className="ni ni-single-02" />,
    layout: "/admin",
    path: "/user-profile",
  },
  {
    title: <span>Settings</span>,
    icon: <i className="ni ni-settings-gear-65" />,
    layout: "/admin",
    path: "/user-profile",
  },
  {
    title: <span>Activity</span>,
    icon: <i className="ni ni-calendar-grid-58" />,
    layout: "/admin",
    path: "/user-profile",
  },
  {
    title: <span>Support</span>,
    icon: <i className="ni ni-support-16" />,
    layout: "/admin",
    path: "/user-profile",
  },
  {
    title: <span>Logout</span>,
    icon: <i className="ni ni-user-run" />,
    onClick: (e) => {
      e.preventDefault();
      logout();
    },
  },
];
