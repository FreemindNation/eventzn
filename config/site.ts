export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "EventZn",
  description: "Event Management Platform",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Events",
      href: "/events",
    },
    {
      label: "Profile",
      href: "/profile",
    },
  ],
  navMenuItems: [
    {
      label: "Events",
      href: "/events",
    },
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Projects",
      href: "/projects",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {
    github: "https://github.com/FreemindNation/eventzn",
  },
};
