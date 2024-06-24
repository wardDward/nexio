import SettingsIcon from "@mui/icons-material/Settings";
import MenuIcon from "@mui/icons-material/Menu";
import TimelineIcon from "@mui/icons-material/Timeline";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import ReportIcon from "@mui/icons-material/Report";
import { Menu } from "@headlessui/react";
import { Link } from "react-router-dom";

export default function DropDown() {
  const navItems = [
    { path: "/", icon: <SettingsIcon />, name: "Settings" },
    { path: "/", icon: <TimelineIcon />, name: "Your activity" },
    { path: "/", icon: <BookmarkIcon />, name: "Saved" },
    { path: "/", icon: <WbSunnyIcon />, name: "Switch Apperances" },
    { path: "/", icon: <ReportIcon />, name: "Report a problem" },
  ];
  return (
    <Menu>
      <>
        <Menu.Button role="button" className="hover:bg-slate-100 text-left">
          {/* Added text-left class */}
          <div className="px-3 py-2">
            <MenuIcon />
            <span className="text-sm ml-2">Menu</span>
          </div>
        </Menu.Button>
        <Menu.Items className="absolute top-[65%] bg-white shadow-lg right-1 left-1 border p-1 rounded-t-md">
          {navItems.map((item) => (
            <Menu.Item className="mb-1" key={item.name}>
              <Link
                to={item.path}
                className="hover:bg-slate-100 flex py-2 px-3"
                href="/account-settings"
              >
                {item.icon}
                <span className="ml-2 text-sm">{item.name}</span>
              </Link>
            </Menu.Item>
          ))}
          <div className="bg-slate-100 h-[5px]"></div>
          <a
            href="#"
            className="text-sm hover:bg-slate-100 flex py-2 px-3 mt-2"
          >
            Logout
          </a>
        </Menu.Items>
      </>
    </Menu>
  );
}
