import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

export default function Carousel({ files, togglePreview }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  console.log(files);

  const renderMedia = (media) => {
    return URL.createObjectURL(media);
  };

  const prevMedia = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const nextMedia = () => {
    if (currentIndex < files.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <>
      <div className="absolute inset-0 bg-black/60 z-[99999999]"></div>
      <div
        className="absolute top-3 right-4 z-[999999999] text-white hover:text-red-500 hover:bg-white rounded-full p-1 cursor-pointer"
        onClick={() => togglePreview()}
      >
        <CloseIcon sx={{ fontSize: 35 }} />
      </div>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[9999999999] flex w-full h-[70%] justify-center">
        {files.length > 1 && (
          <>
            <div
              className="absolute top-[45%] left-2 cursor-pointer hover:text-black hover:bg-white/70 rounded-full text-white "
              onClick={() => prevMedia()}
            >
              <ChevronLeftIcon sx={{ fontSize: 45 }} />
            </div>
            <div
              className="absolute top-[45%] right-2 cursor-pointer hover:text-black hover:bg-white/70 rounded-full text-white "
              onClick={() => nextMedia()}
            >
              <ChevronRightIcon sx={{ fontSize: 45 }} />
            </div>
          </>
        )}
        <img
          src={renderMedia(files[currentIndex])}
          className="h-auto lg:h-full w-full md:w-[80%] object-contain"
          alt={`Media ${currentIndex}`}
        />
      </div>
    </>
  );
}
