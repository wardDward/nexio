import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

export default function Carousel({ files, togglePreview, removeFile }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const renderMedia = (media) => {
    console.log(media);
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

  const getToSlide = (index) => {
    setCurrentIndex(index);
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
            <div className="flex absolute z-[9999999999]">
              {files.map((_, index) => (
                <button
                  className={`cursor-pointer w-2 h-2 text-white bg-white rounded-full hover:bg-slate-100 mx-1 t ${
                    index === currentIndex ? "bg-amber-500" : "bg-opacity-25"
                  } focus:outline-none`}
                  key={index}
                  onClick={() => getToSlide(index)}
                />
              ))}
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
                  <div className="flex justify-end">
                    <button
                      className="py-1 px-6 text-white bg-black/50 rounded-full hover:bg-black/90"
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
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <img
                      key={file.name}
                      src={renderMedia(file)}
                      alt={file.name}
                      className="w-full h-[500px] object-contain"
                    />
                  )}
                </div>
              ))}

              {files.length === 0 && (
                <div className="w-full">
                  <p className="text-white text-5xl font-bold">No Media</p>
                  <div className="flex justify-center w-full mt-[40px]">
                    <iframe
                      src="https://giphy.com/embed/W0c3xcZ3F1d0EYYb0f"
                      width="480"
                      height="400"
                      frameBorder="0"
                      className="giphy-embed"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
