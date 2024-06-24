import CloseIcon from "@mui/icons-material/Close";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { specificExplores } from "../../redux/feature/exploreSlice";
import ViewExploreCarousel from "./ViewExploreCarousel";

export default function ViewExplore({ closeModal }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const { explore } = useSelector((state) => state.explores);

  const segments = location.search.substring(5 + 1).split("/");
  const path = segments.slice(1).join("/");
  const firstSegment = segments[0];
  // console.log(segments[0]);
  // console.log(path);

  useEffect(() => {
    const body = document.querySelector("body");
    body.classList.add("no-scroll");

    return () => {
      body.classList.remove("no-scroll");
    };
  }, []);

  useEffect(() => {
    dispatch(specificExplores({ firstSegment, path }));
  }, [dispatch, firstSegment, path]);


  return (
    <>
      <div className="fixed inset-0 bg-black/70 z-[9999]"></div>
      <div
        className="fixed top-7 right-7 z-[9999] text-white hover:text-red-500 hover:bg-slate-100 cursor-pointer rounded-full p-1 mt-[40px] lg:mt-0"
        onClick={() => closeModal()}
      >
        <CloseIcon sx={{ fontSize: 29 }} />
      </div>
      <div className="fixed top-[55%] lg:top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  bg-white w-full md:w-[95%] xl:w-[60%] h-[80%] z-[99999999] flex flex-wrap">
        <div className="border-r-[1px] w-full md:w-[60%] flex-grow h-full overfloww-hidden flex justify-center items-center relative">
          <ViewExploreCarousel explore={explore} />
        
        </div>
        <div className="w-full md:w-[40%] hidden md:block">
          <div className="flex flex-col">
            <div className="flex items-center justify-between border-b-[1px] py-[15px] px-[10px] h-[10%]">
              <div className="flex items-center">
                <a href="#">
                  <img
                    src="https://images.unsplash.com/photo-1642649149963-0ef6779df6c6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    className="h-[40px] w-[40px] rounded-full"
                    alt=""
                  />
                </a>
                <Link
                  to="/"
                  className="text-[13px] font-medium ml-2 hover:opacity-[0.50]"
                >
                  {explore.author?.name}
                </Link>
              </div>
              <a
                href="#"
                className="text-sm font-medium text-blue-500 hover:font-bold"
              >
                Follow
              </a>
            </div>
          </div>
          <div className="flex flex-col bg-red-50 overflow-y-scroll h-[90%] commnent-container">
            test
          </div>
        </div>
      </div>
    </>
  );
}
