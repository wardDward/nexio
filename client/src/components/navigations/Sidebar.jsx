import { Link, NavLink } from "react-router-dom";
import Nexio from "../../assets/images/image_icon/nexio.png";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import OndemandVideoOutlinedIcon from "@mui/icons-material/OndemandVideoOutlined";
import PhotoSizeSelectActualOutlinedIcon from "@mui/icons-material/PhotoSizeSelectActualOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import SearchIcon from "@mui/icons-material/Search";

import DropDown from "./DropDown";
import { navItemsData } from "../../constants/navItemsData";

const MenuLink = ({ toggleSearch }) => {
  const { navItems } = navItemsData(toggleSearch);

  const getIcon = (iconName) => {
    switch (iconName) {
      case "HomeOutlinedIcon":
        return <HomeOutlinedIcon />;
      case "PeopleAltOutlinedIcon":
        return <PeopleAltOutlinedIcon />;
      case "OndemandVideoOutlinedIcon":
        return <OndemandVideoOutlinedIcon />;
      case "PhotoSizeSelectActualOutlinedIcon":
        return <PhotoSizeSelectActualOutlinedIcon />;
      case "StorefrontOutlinedIcon":
        return <StorefrontOutlinedIcon />;
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
          <button
            key={item.name}
            role="button"
            className="navlink w-full"
            onClick={item.onClick} // Invoke onClick handler directly
          >
            {getIcon(item.icon)}{" "}
            <span className="ml-2 text-sm">{item.name}</span>
          </button>
        ) : (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `${isActive ? "border-l-[5px] border-black" : ""} navlink`
            }
          >
            {getIcon(item.icon)}{" "}
            <span className="ml-2 text-sm">{item.name}</span>
          </NavLink>
        )
      )}
      <Link className="navlink">
        <img
          src={
            "https://images.unsplash.com/photo-1642649149963-0ef6779df6c6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          className="w-[30px] h-[30px] rounded-full "
        />
        <span className="text-sm max-w[250px] ml-1">Edward Taligatos</span>
      </Link>
    </>
  );
};

export default function Sidebar({ toggleSearch }) {
  return (
    <>
      <div className="hidden lg:flex flex-col justify-between pt-8 w-full md:w-[30%] lg:w-[20%] xl:w-[15%] bg-white fixed inset-y-0 border-r-[1px]">
        <div>
          <Link to="/" className="flex items-center px-8 ">
            <img src={Nexio} alt="nexio_logo" className="h-[50px] w-[50px]" />
            <span className="ml-2 font-bold">Nexio</span>
          </Link>
          <div className="my-[60px]">
            <MenuLink toggleSearch={toggleSearch} />
          </div>
        </div>
        <DropDown />
      </div>
    </>
  );
}
