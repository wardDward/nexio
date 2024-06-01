import { Link, NavLink } from "react-router-dom";
import Nexio from "../../assets/images/image_icon/nexio.png";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';

import SearchIcon from "@mui/icons-material/Search";
import { navItemsData } from "../../constants/navItemsData";
import { Menu } from "@headlessui/react";
import MenuIcon from "@mui/icons-material/Menu";
const MenuLink = ({ toggleSearch }) => {
  const { navItems } = navItemsData(toggleSearch);

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

export default function NavigationBar({ toggleSearch }) {
  return (
    <nav className="flex lg:hidden justify-between items-center h-[60px] bg-white fixed inset-x-0 w-full z-[99999] px-10 border border-b-[1px]">
      <div>
        <Link to="/">
          <img src={Nexio} alt="nexio_logo" className="h-[50px] w-[50px]" />
        </Link>
      </div>
      <div className="flex items-center justify-between flex-none md:flex-1">
        <div className="block md:hidden">
          <Menu>
            <Menu.Button className="hover:text-gray-700 p-2 hover:bg-slate-100 rounded-full">
              <MenuIcon />
            </Menu.Button>
            <Menu.Items className="flex flex-col absolute top-full inset-x-0 bg-white z-[9999999] items-center ">
              <MenuLink toggleSearch={toggleSearch} />
            </Menu.Items>
          </Menu>
        </div>
        <div className="hidden md:flex mx-auto">
          <MenuLink toggleSearch={toggleSearch} />
        </div>
        <div className="hidden md:flex ">test</div>
      </div>
    </nav>
  );
}
