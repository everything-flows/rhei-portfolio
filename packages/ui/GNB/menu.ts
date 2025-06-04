export const MENU = [
  {
    title: "Home",
    link: "/",
    isCurrentTab: () => {
      if (typeof window === "undefined") {
        return false;
      }
      const path = window.location.pathname;
      return path === "/";
    },
  },
  {
    title: "Resume",
    link: "/resume",
    isCurrentTab: () => {
      if (typeof window === "undefined") {
        return false;
      }
      const path = window.location.pathname;
      return path === "/resume";
    },
  },
  {
    title: "Blog",
    link: "/blog",
    isCurrentTab: () => {
      if (typeof window === "undefined") {
        return false;
      }
      const path = window.location.pathname;
      return path.startsWith("/blog");
    },
  },
  {
    title: "Craft",
    link: "/craft",
    isCurrentTab: () => {
      if (typeof window === "undefined") {
        return false;
      }
      const path = window.location.pathname;
      return path === "/craft";
    },
  },
];
