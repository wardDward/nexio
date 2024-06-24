import { Link, NavLink } from "react-router-dom";
import Nexio from "../../assets/images/image_icon/nexio.png";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { navItemsData } from "../../constants/navItemsData";
import MenuIcon from "@mui/icons-material/Menu";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import ProfileMenu from "./ProfileMenu";
import LogoutIcon from "@mui/icons-material/Logout";

const MenuLink = ({ toggleSearch, toggleNotification, notification_count }) => {
  const { navItems } = navItemsData(
    toggleSearch,
    toggleNotification,
    notification_count
  );
  const getIcon = (iconName) => {
    switch (iconName) {
      case "HomeOutlinedIcon":
        return <HomeOutlinedIcon />;
      case "PeopleAltOutlinedIcon":
        return <PeopleAltOutlinedIcon />;
      case "ExploreOutlinedIcon":
        return <ExploreOutlinedIcon />;
      case "SearchIcon":
        return <SearchIcon />;
      case "NotificationsNoneOutlinedIcon":
        return <NotificationsNoneOutlinedIcon />;
      default:
        return null;
    }
  };

  return (
    <>
      {navItems.map((item) =>
        item.isButton ? (
          <a
            key={item.name}
            role="button"
            className="w-full py-3 first-line:md:py-2 px-6 hover:bg-slate-100 rounded-md flex items-center relative"
            onClick={item.onClick}
          >
            {getIcon(item.icon)}
            <span className="text-sm block md:hidden ml-3 md:ml-0">
              {item.name}
            </span>
            {item.count !== 0 && item.name === "Notification" && (
              <div className="bg-red-500 h-[20px] w-[20px] flex justify-center items-center absolute z-[999] top-[8px] right-[12px] rounded-full">
                <span className="text-white text-xs font-bold">
                  {item.count}
                </span>
              </div>
            )}
          </a>
        ) : (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `${
                isActive ? "active border-b-[2px] border-black" : ""
              } py-3 first-line:md:py-2 px-6 hover:bg-slate-100 rounded-md w-full flex items-center`
            }
          >
            {getIcon(item.icon)}
            <span className="text-sm block md:hidden ml-3 md:ml-0">
              {item.name}
            </span>
          </NavLink>
        )
      )}
    </>
  );
};

export default function NavigationBar({
  toggleSearch,
  toggleNotification,
  notification_count,
}) {
  const [menu, setMenu] = useState(false);
  const [profileMenu, setProfileMenu] = useState(false);
  const toggleMenu = () => {
    setMenu(!menu);
  };
  const toggleProfile = () => {
    setProfileMenu(!profileMenu);
  };
  return (
    <nav className="flex lg:hidden justify-between items-center h-[60px] bg-white fixed inset-x-0 w-full z-[99999] border border-b-[1px]">
      <div className="py-2 px-10 ">
        <Link to="/">
          <img src={Nexio} alt="nexio_logo" className="h-[40px] w-[40px]" />
        </Link>
      </div>
      <div className="flex items-center justify-between flex-none md:flex-1  px-8">
        <div
          className="p-2 block md:hidden hover:bg-slate-200 rounded-full cursor-pointer"
          onClick={() => toggleMenu()}
        >
          <MenuIcon />
        </div>
        <div className="hidden md:flex mx-auto">
          <MenuLink
            toggleSearch={toggleSearch}
            toggleNotification={toggleNotification}
            notification_count={notification_count}
          />
        </div>
        <div
          className="hidden md:flex items-center cursor-pointer"
          onClick={() => toggleProfile()}
        >
          <img
            src="https://images.unsplash.com/photo-1642649149963-0ef6779df6c6?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="h-[30px] w-[30px] rounded-full border border-gray-500"
            alt=""
          />
          <ExpandMoreIcon className="mt-[2px]" />
        </div>
      </div>
      {menu && (
        <div className="absolute top-full bg-white w-full z-[999999] border-t-[1px] border-b-[3px] border-black p-2 block md:hidden rounded-b-lg">
          <MenuLink
            toggleSearch={toggleSearch}
            toggleNotification={toggleNotification}
            notification_count={notification_count}
          />
          <a
            href="#"
            className="py-3 first-line:md:py-2 px-6 hover:bg-slate-100 rounded-md w-full flex items-center"
          >
            <LogoutIcon />
            <span className="ml-2">Log out</span>
          </a>
        </div>
      )}
      {profileMenu && <ProfileMenu />}
    </nav>
  );
}
