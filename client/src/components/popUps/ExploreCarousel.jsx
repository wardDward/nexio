import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

export default function ExploreCarousel({ files, togglePreview, removeFile }) {
  const [currentIndex, setCurrentIndex] = useState(0);

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

  const currentSlide = (index) => {
    setCurrentIndex(index);
  };
  const renderMedia = (media) => {
    return URL.createObjectURL(media);
  };
  return (
    <>
      <div className="absolute inset-0 bg-black/90 z-[999999]"></div>
      <div
        className="z-[999999999] absolute top-7 right-7 text-white p-1 hover:text-red-500 cursor-pointer hover:bg-slate-100 rounded-full"
        onClick={() => togglePreview()}
      >
        <CloseIcon />
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  z-[99999999] w-full flex justify-center">
        {files.length > 1 && (
          <>
            <div className="absolute top-1/2 left-[20px]">
              <button
                role="button"
                type="button"
                onClick={() => prevMedia()}
                className="text-white hover:bg-slate-50 rounded-full p-1 hover:text-black"
              >
                <ChevronLeftIcon sx={{ fontSize: 35 }} />
              </button>
            </div>
            <div className="absolute top-1/2 right-[20px]">
              <button
                role="button"
                type="button"
                onClick={() => nextMedia()}
                className="text-white hover:bg-slate-50 rounded-full p-1 hover:text-black"
              >
                <ChevronRightIcon sx={{ fontSize: 35 }} />
              </button>
            </div>
          </>
        )}

        <div className="relative w-[70%]">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {files.map((file, index) => (
                <div className="w-full flex-shrink-0" key={index}>
                  <div className="flex justify-end mb-3">
                    <button
                      className="text-white bg-gray-900 hover:bg-slate-800 py-1 px-7 rounded-full"
                      onClick={() => removeFile(index)}
                    >
                      Remove
                    </button>
                  </div>
                  {file.type.startsWith("video/") ? (
                    <video
                      key={file.name}
                      controls
                      className="w-full h-[500px] object-contain"
                    >
                      <source src={renderMedia(file)} type={file.type} />
                    </video>
                  ) : (
                    <img
                      src={renderMedia(file)}
                      key={file.name}
                      className="w-full object-contain h-[500px]"
                      alt={file.name}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        {files.length > 0 && (
          <div className="absolute bottom-[-10%] flex">
            {files.map((_, index) => (
              <div
                className={`rounded-full h-[8px] w-[8px] mx-[2px] cursor-pointer hover:bg-slate-700 opacity-[1] ${
                  currentIndex === index ? "bg-white" : "bg-slate-500"
                }`}
                key={index}
                onClick={() => currentSlide(index)}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
