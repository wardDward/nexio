export const navItemsData = (toggleSearch) => {
  const navItems = [
    {
      path: "/",
      icon: "HomeOutlinedIcon",
      name: "Home",
    },
    {
      path: "/search",
      icon: "SearchIcon",
      name: "Search",
      isButton: true,
      onClick: toggleSearch,
    },
    {
      path: "/test",
      icon: "PeopleAltOutlinedIcon",
      name: "Friends",
    },
    {
      path: "/test",
      icon: "OndemandVideoOutlinedIcon",
      name: "Video",
    },
    {
      path: "/test",
      icon: "PhotoSizeSelectActualOutlinedIcon",
      name: "Photos",
    },
    {
      path: "/test",
      icon: "StorefrontOutlinedIcon",
      name: "Marketplace",
    },
  ];

  return { navItems };
};
