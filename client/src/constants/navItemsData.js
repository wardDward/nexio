export const navItemsData = (
  toggleSearch,
  toggleNotification,
  notification_count
) => {
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
      path: "/suggestions",
      icon: "PeopleAltOutlinedIcon",
      name: "Friends",
    },
    {
      path: "/explore",
      icon: "ExploreOutlinedIcon",
      name: "Video",
    },
    {
      path: "/notification",
      icon: "NotificationsNoneOutlinedIcon",
      name: "Notification",
      isButton: true,
      onClick: toggleNotification,
      count: notification_count,
    },
  ];

  return { navItems };
};
