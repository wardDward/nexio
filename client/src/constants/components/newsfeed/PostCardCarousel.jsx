import { useState } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Link } from "react-router-dom";
export default function PostCardCarousel({ post_id, medias }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const nextSlide = () => {
    if (currentIndex < medias.length - 1) {
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
            {medias.map((url, index) => {
              const fileUrl = `http://api.nexio.test/api/storage/${url}`;
              const extension = url.split(".").pop().toLowerCase();
              const isImage = ["jpg", "jpeg", "png"].includes(extension);
              const isVideo = ["mp4", "mov"].includes(extension);
              const linkUrl = `/media/attachments/${post_id}/${url}`;
              return (
                <div key={index} className="w-full flex-shrink-0">
                  {isImage && (
                    <Link
                      to={linkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={fileUrl}
                        className="object-contain w-full h-[500px] cursor-pointer hover:opacity-[0.4]"
                        alt="Post Attachment"
                      />
                    </Link>
                  )}
                  {isVideo && (
                    <video
                      controls
                      className="object-contain w-full h-[500px] cursor-pointer hover:opacity-[0.4]"
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
        {medias.length > 1 && (
          <>
            <div className="absolute bottom-2 inset-x-0 flex justify-center z-[999999999]">
              {medias.map((_, index) => (
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
                  currentIndex === medias.length - 1
                    ? "opacity-50 cursor-not-allowed"
                    : "opacity-100 hover:bg-opacity-75"
                }`}
                onClick={nextSlide}
                disabled={currentIndex === medias.length - 1}
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
