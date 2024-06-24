import LogoutIcon from "@mui/icons-material/Logout";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function ProfileMenu() {
  const { user } = useSelector((state) => state.users);
  return (
    <div className="hidden md:flex flex-col absolute top-full right-[5px] w-[300px] bg-white p-2 border-x-[4px] border-b-[4px] rounded-b-lg z-[99999] shadow-lg">
      <Link
        to={"/profile"}
        className="m-3 shadow-lg p-2 rounded-lg hover:bg-slate-100"
      >
        <div className="flex items-center">
          <img
            src="https://images.unsplash.com/photo-1642649149963-0ef6779df6c6?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="h-[45px] w-[45px] rounded-full border border-gray-500"
            alt=""
          />
          <span className="ml-3 text-md font-medium w-full truncate">
            {user?.name}
          </span>
        </div>
      </Link>
      <a href="#" className="my-2 p-2 hover:bg-slate-100 rounded-lg">
        <LogoutIcon />
        <span className="ml-2">Log out</span>
      </a>
    </div>
  );
}
