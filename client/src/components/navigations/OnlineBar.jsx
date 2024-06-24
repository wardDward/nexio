import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";

const MessageCard = () => {
  return (
    <div className="flex items-center py-3 my-1 hover:bg-slate-100 cursor-pointer">
      <img
        src="https://images.unsplash.com/photo-1642649149963-0ef6779df6c6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt=""
        className="h-[40px] w-[40px] rounded-full"
      />
      <div className="flex flex-col max-w-[150px] min-w-[150px] ml-2">
        <span className="text-sm truncate font-semibold">Edward Taligatos</span>
        <p className="text-xs text-gray-400 truncate line-clamp-1">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor optio
          architecto quia repellat eveniet, soluta consequuntur fugiat quibusdam
          facilis, fuga sequi ad, officiis nam illo! Eveniet atque consequatur
          dicta et?
        </p>
      </div>
      <div className="flex flex-col justify-center items-center">
        <span className="text-gray-500 text-xs">10:30 AM</span>
        <div className="bg-red-500 text-white h-[18px] w-[18px] text-center rounded-full mt-1 text-[13px]">
          1
        </div>
      </div>
    </div>
  );
};

export default function OnlineBar() {
  return (
    <div className="hidden md:flex flex-col justify-between w-full md:w-[30%] lg:w-[20%] xl:w-[15%] bg-white fixed inset-y-0 right-0 border-r-[1px] border-l-[1px] mt-[60px] lg:mt-0 pt-0 lg:pt-[30px] z-[9999]">
      <div className="flex flex-col p-2 h-full">
        <form autoComplete="off">
          <div className="relative flex items-center">
            <SearchIcon
              className="absolute left-[7px] text-gray-600"
              sx={{ fontSize: 20 }}
            />
            <input
              type="text"
              placeholder="Search"
              name="search"
              id="search"
              className="border w-full bg-slate-200 py-[5px] pl-7 pr-2 rounded-md outline-none"
            />
          </div>
        </form>
        <hr className="my-5" />
        <div className="flex items-center justify-between">
          <h1 className="font-bold">Message</h1>
          <Link to="/" className="text-sm text-gray-500">
            See All
          </Link>
        </div>
        <div className="max-h-full min-h-full overflow-y-scroll message-container flex flex-col">
          <MessageCard />
          <MessageCard />
          <MessageCard />
          <MessageCard />
          <MessageCard />
          <MessageCard />
          <MessageCard />
          <MessageCard />
          <MessageCard />
          <MessageCard />
        </div>
      </div>
    </div>
  );
}
