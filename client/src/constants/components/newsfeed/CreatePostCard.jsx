import PhotoSizeSelectActualOutlined from "@mui/icons-material/PhotoSizeSelectActualOutlined";
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";
import CreatePostModal from "./modal/CreatePostModal";
import { useState } from "react";

export default function CreatePostCard() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <div className="min-h-[150px] bg-white my-[20px] w-full lg:w-[60%] xl:w-[40%] py-7 px-6 rounded-md border shadow-md">
        <div className="flex flex-col">
          <div className="flex items-center">
            <img
              src="https://images.unsplash.com/photo-1642649149963-0ef6779df6c6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              className="h-[40px] w-[40px] rounded-full"
            />
            <div
              className="flex-1 bg-slate-100 py-2 px-3 rounded-full cursor-pointer"
              onClick={() => openModal()}
            >
              <span className="text-sm text-gray-500">
                What{"'s"} on your mind...
              </span>
            </div>
          </div>
          <hr className="my-5" />
          <div className="">
            <div
              className="w-[200px] flex justify-center cursor-pointer"
              onClick={() => openModal()}
            >
              <span>
                <PhotoSizeSelectActualOutlined /> Photo {" / "}
                <VideoLibraryOutlinedIcon /> Video
              </span>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && <CreatePostModal closeModal={closeModal} />}
    </>
  );
}
