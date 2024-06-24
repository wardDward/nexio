import { useState } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export default function ViewExploreCarousel({ explore }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const prevSlide = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const nextSlide = () => {
    if (currentIndex < explore.attachments.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <>
      <div className="relative">
        <div className="overflow-hidden rounded-lg">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {explore.attachments?.map((attachment) => {
              const fileUrl = `http://api.nexio.test/api/storage/${attachment.attachment}`;
              const extension = attachment.attachment
                .split(".")
                .pop()
                .toLowerCase();
              const isImage = ["jpg", "jpeg", "png"].includes(extension);
              const isVideo = ["mov", "mkv", "mp4"].includes(extension);
              return (
                <div key={attachment.id} className="w-full flex-shrink-0">
                  {isImage && (
                    <div>
                      <img
                        src={fileUrl}
                        className="object-contain w-full h-[500px] cursor-pointer"
                        alt="Post Attachment"
                      />
                    </div>
                  )}
                  {isVideo && (
                    <video
                      controls
                      className="object-contain w-full h-[500px] cursor-pointer"
                    >
                      <source src={fileUrl} type={`video/${extension}`} />
                      Your browser does not support the video tag.
                    </video>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        {explore.attachments?.length > 1 && (
          <>
            <div className="absolute bottom-2 inset-x-0 flex justify-center z-[999999999]">
              {explore.attachments?.map((_, index) => (
                <button
                  key={index}
                  className={`mx-1 w-2 h-2 rounded-full bg-amber-500 ${
                    index === currentIndex ? "bg-opacity-75" : "bg-opacity-25"
                  } focus:outline-none`}
                  onClick={() => goToSlide(index)}
                />
              ))}
            </div>
            <div className="absolute inset-y-0 left-0 flex items-center">
              <button
                className={`text-white bg-black bg-opacity-50 p-2 rounded-full transition-opacity duration-300 ${
                  currentIndex === 0
                    ? "opacity-50 cursor-not-allowed"
                    : "opacity-100 hover:bg-opacity-75"
                }`}
                onClick={prevSlide}
                disabled={currentIndex === 0}
              >
                <ChevronLeftIcon />
              </button>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center">
              <button
                className={`text-white bg-black bg-opacity-50 p-2 rounded-full transition-opacity duration-300 ${
                  currentIndex === explore.attachments?.length - 1
                    ? "opacity-50 cursor-not-allowed"
                    : "opacity-100 hover:bg-opacity-75"
                }`}
                onClick={nextSlide}
                disabled={currentIndex === explore.attachments?.length - 1}
              >
                <ChevronRightIcon />
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
