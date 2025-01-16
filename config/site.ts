export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "EventZn",
  description: "EvenZn is an event management platform.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Profile",
      href: "/profile",
    },
  ],
  navMenuItems: [
    {
      label: "Home",
      href: "/",
    },
    
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Signout",
      href: "/sign-out",
    },
  ],
  links: {
    github: "https://github.com/FreemindNation/eventzn",
  },
};
