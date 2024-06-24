import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getPostAttachment } from "../../redux/feature/attachmentSlice";

export default function ViewMedia() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id, "*": path } = useParams();

  useEffect(() => {
    const fetchMedia = async () => {
      await dispatch(getPostAttachment({ id, path }));
    };
    fetchMedia();
  }, [id, path, dispatch]);

  const { attachment, attachments, isLoading, errorMessage } = useSelector(
    (state) => state.attachments
  );

  let currentIndex = attachments.findIndex(
    (item) => item.attachment === attachment?.attachment
  );

  const prevMedia = () => {
    if (currentIndex > 0) {
      const prevAttachment = attachments[currentIndex - 1].attachment;
      navigate(`/media/attachments/${id}/${prevAttachment}`);
    }
  };

  const nextMedia = () => {
    if (currentIndex < attachments.length - 1) {
      const nextAttachment = attachments[currentIndex + 1].attachment;
      navigate(`/media/attachments/${id}/${nextAttachment}`);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/95 z-[9999999]"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-2 z-[999999999] w-full">
        <div className="relative">
          <div className="overflow-hidden rounded-lg">
            <div className="flex transition-transform duration-500 ease-in-out">
              <div className="w-full flex-shrink-0">
                {isLoading && (
                  <div className="flex justify-center items-center">
                    <span className="text-white loading loading-infinity loading-lg"></span>
                  </div>
                )}
                {!isLoading && attachment && (
                  <>
                    {["jpg", "jpeg", "png"].includes(
                      attachment.attachment.split(".").pop().toLowerCase()
                    ) && (
                      <img
                        src={`http://api.nexio.test/api/storage/${attachment.attachment}`}
                        alt="Post Attachment"
                        className="h-[500px] w-full object-contain"
                      />
                    )}
                    {["mp4", "mov"].includes(
                      attachment.attachment.split(".").pop().toLowerCase()
                    ) && (
                      <div className="flex justify-center">
                        <video
                          controls
                          className="h-[500px] w-[80%] object-contain"
                        >
                          <source
                            src={`http://api.nexio.test/api/storage/${attachment.attachment}`}
                            type="video/mp4"
                          />
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
          <div className=" absolute inset-y-0 left-0 flex items-center ">
            {currentIndex > 0 && (
              <button
                onClick={() => prevMedia()}
                role="button"
                type="button"
                className="text-white hover:bg-slate-50/50 rounded-full"
              >
                <ChevronLeftIcon sx={{ fontSize: 45 }} />
              </button>
            )}
          </div>
          <div className="text-white absolute inset-y-0 right-0 flex items-center">
            {currentIndex < attachments.length - 1 && (
              <button
                onClick={nextMedia}
                role="button"
                type="button"
                className="text-white hover:bg-slate-50/50 rounded-full"
              >
                <ChevronRightIcon sx={{ fontSize: 45 }} />
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
