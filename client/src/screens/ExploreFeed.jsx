import AddToPhotosOutlinedIcon from "@mui/icons-material/AddToPhotosOutlined";
import Test2 from "../assets/test1 (2).mp4";
import Test1 from "../assets/test1 (1).mp4";
import CreateFeed from "../components/exploreFeed/CreateFeed";
import { useState } from "react";

export default function ExploreFeed() {
  const content = [
    { type: "video", src: Test2 },
    { type: "video", src: Test1 },
    { type: "image", src: "https://pagedone.io/asset/uploads/1688031232.jpg" },
    { type: "image", src: "https://pagedone.io/asset/uploads/1688031357.jpg" },
    { type: "image", src: "https://pagedone.io/asset/uploads/1688031375.jpg" },
    { type: "image", src: "https://pagedone.io/asset/uploads/1688031396.jpg" },
    { type: "image", src: "https://pagedone.io/asset/uploads/1688031414.png" },
  ];

  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <>
      <div className="h-screen py-10 px-4 sm:px-8 md:px-16 lg:px-20 xl:px-24 ml-0 lg:ml-[20%] xl:ml-[15%]">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-medium ml-5 sm:ml-0">Explore</h1>
          <button
            onClick={() => toggleModal()}
            role="button"
            type="button"
            className="text-gray-800 hover:bg-gray-300/50 p-2 rounded-lg"
          >
            <AddToPhotosOutlinedIcon />
          </button>
        </div>
        <div className="columns-1 md:columns-2 xl:columns-3  py-[30px] lg:py-[50px] px-5 md:px-[50px] xl:px-[90px]">
          {content.map((item, index) => (
            <div
              key={index}
              className="break-inside-avoid mb-2 flex justify-center"
            >
              {item.type === "video" ? (
                <div
                  className="relative"
                  style={{ height: "600px", width: "400px" }}
                >
                  <video
                    className=" h-full w-full absolute top-0 left-0 object-cover rounded-lg"
                    autoPlay
                    loop
                  >
                    <source src={item.src} type="video/mp4" />
                  </video>
                </div>
              ) : (
                <div
                  className="relative"
                  style={{ height: "400px", width: "400px" }}
                >
                  <img
                    className="h-full w-full rounded-lg absolute top-0 left-0 object-cover"
                    src={item.src}
                    alt="Gallery image"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {modal && <CreateFeed toggleModal={toggleModal}/>}
    </>
  );
}
