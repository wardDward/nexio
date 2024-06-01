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
      path: "/explore",
      icon: "ExploreOutlinedIcon",
      name: "Video",
    },

  ];

  return { navItems };
};
