import { Link, NavLink, useLocation } from "react-router-dom";
import Nexio from "../../assets/images/image_icon/nexio.png";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import { navItemsData } from "../../constants/navItemsData";
import { Menu } from "@headlessui/react";
import { useDispatch } from "react-redux";

const MenuLink = ({ toggleSearch, toggleNotification }) => {
  const { navItems } = navItemsData(toggleSearch, toggleNotification);

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
            className="w-full py-3 first-line:md:py-2 px-6 hover:bg-slate-100 rounded-md flex items-center"
            onClick={item.onClick}
          >
            {getIcon(item.icon)}
            <span className="text-sm block md:hidden ml-3 md:ml-0">
              {item.name}
            </span>
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

export default function NavigationBar({ toggleSearch, toggleNotification }) {
  const location = useLocation();
  return (
    <nav
      className={`${
        location.pathname === "/profile" ? "lg:flex" : "lg:hidden"
      } flex justify-between items-center h-[60px] bg-red-500 fixed inset-x-0 w-full z-[99999] px-10 border-b-[1px]`}
    >
      <div>
        <Link to="/">
          <img src={Nexio} alt="nexio_logo" className="h-[40px] w-[40px]" />
        </Link>
      </div>
      <div className="flex items-center justify-between flex-none md:flex-1">
        <div className="block md:hidden">
          <Menu>
            <Menu.Button className="hover:text-gray-700 p-2 hover:bg-slate-100 rounded-full">
              <MenuIcon />
            </Menu.Button>
            <Menu.Items className="flex flex-col absolute top-full inset-x-0 bg-white z-[9999999] items-center ">
              <MenuLink
                toggleSearch={toggleSearch}
                toggleNotification={toggleNotification}
              />
            </Menu.Items>
          </Menu>
        </div>
        <div className="hidden md:flex mx-auto">
          <MenuLink
            toggleSearch={toggleSearch}
            toggleNotification={toggleNotification}
          />
        </div>
        <div className="hidden md:flex text-red-500">testsss</div>
      </div>
    </nav>
  );
}
