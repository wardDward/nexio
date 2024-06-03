import CloseIcon from "@mui/icons-material/Close";
import { useEffect } from "react";

export default function ViewExplore({closeModal}) {

    useEffect(() => {
        const body = document.querySelector("body")
        body.classList.add("no-scroll")
        
        return () => {
            body.classList.remove("no-scroll")
        }
    }, [])

  return (
    <>
      <div className="fixed inset-0 bg-black/70 z-[9999]"></div>
      <div className="absolute top-7 right-7 z-[9999] text-white hover:text-red-500 hover:bg-slate-100 cursor-pointer rounded-full p-1 mt-[40px] lg:mt-0" onClick={() => closeModal()}>
        <CloseIcon sx={{ fontSize: 29 }} />
      </div>
      <div className="absolute top-[55%] lg:top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  bg-white w-full md:w-[80%] xl:w-[60%] h-[80%] z-[99999999] flex">
        <div className="bg-red-50 w-1/2">
            dsadsa
        </div>
        <div className="w-1/2">
            2nd container
        </div>
      </div>
    </>
  );
}
