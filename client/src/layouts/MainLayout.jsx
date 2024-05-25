import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Sidebar from "../components/navigations/Sidebar";
import OnlineBar from "../components/navigations/OnlineBar";
import NavigationBar from "../components/navigations/NavigationBar";
import Searchbar from "../components/navigations/Searchbar";
import useAuth from "../hooks/useAuth";
import ProgressBar from "../components/popUps/ProgressBar";

export default function MainLayout() {
  const {} = useAuth();

  const [toggleSearchBar, setToggleSearchBar] = useState(false);
  const { showProgress } = useSelector((state) => state.posts);

  const toggleSearch = () => {
    setToggleSearchBar(!toggleSearchBar);
  };

  return (
    <>
      <div className="h-screen flex">
        {/* navigation bar for small to medium screens*/}
        <NavigationBar toggleSearch={toggleSearch} />
        {/* sidebar for lg screens only */}
        <Sidebar toggleSearch={toggleSearch} />
        <div className="mt-[60px] lg:mt-0 w-full md:w-[70%] lg:w-full">
          <Outlet />
        </div>
        <OnlineBar />
        {toggleSearchBar && <Searchbar toggleSearch={toggleSearch} />}
      </div>
      {showProgress && <ProgressBar />}
    </>
  );
}
