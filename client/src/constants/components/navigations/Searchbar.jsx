import CancelIcon from "@mui/icons-material/Cancel";
import CloseIcon from "@mui/icons-material/Close";

import { Link } from "@mui/material";
import { useEffect, useRef, useState } from "react";

export default function Searchbar({ toggleSearch }) {
  const [search, setSearch] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className="fixed left-0 lg:left-[20%] right-0 xl:left-[15%] bg-white w-full lg:w-[25%] xl:w-[20%] top-[7%] lg:inset-y-0 border-t-[1px] lg:border-t-[0] border-r-[0] lg:border-r-[1px] pt-9 flex flex-col z-[999999]">
      <div className="absolute top-3 right-2">
        <CloseIcon
          className="cursor-pointer hover:text-gray-600"
          onClick={() => toggleSearch()}
        />
      </div>
      <h1 className="text-2xl text-gray-900 mb-6 font-semibold px-5">Search</h1>
      <div className="mt-[10px]">
        <hr />
        <div className="my-5 px-2">
          <form autoComplete="off">
            <div className="flex items-center justify-between relative">
              <input
                name="search"
                id="search"
                ref={inputRef}
                type="text"
                className="text-sm w-full bg-slate-300/40 rounded-md py-2 pl-3 px-6 outline-none"
                placeholder="Search"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
              />
              {search !== "" ? (
                <CancelIcon
                  sx={{ fontSize: 15 }}
                  className="absolute right-2 text-gray-600 cursor-pointer"
                  onClick={() => setSearch("")}
                />
              ) : (
                ""
              )}
            </div>
          </form>
        </div>
        <div className="px-3">
          <h1 className="font-semibold">Recent</h1>
          <div className="overflow-y-scroll max-h-[690px] min-h-[690px] my-2">
            <Link to="" className="flex flex-col"></Link>
          </div>
        </div>
      </div>
    </div>
  );
}
