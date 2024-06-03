import AddToPhotosOutlinedIcon from "@mui/icons-material/AddToPhotosOutlined";
import CreateFeed from "../components/exploreFeed/CreateFeed";
import ViewExplore from "../components/exploreFeed/ViewExplore";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getExplores } from "../redux/feature/exploreSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function ExploreFeed() {
  const dispatch = useDispatch();

  const useQuery = () => {
    return new URLSearchParams(location.search);
  };

  const location = useLocation();
  const navigate = useNavigate();
  
  const query = useQuery();
  const path = query.get("path");
  const [isOpen, setIsOpen] = useState(false);

  const { explores, isLoadingfetching } = useSelector(
    (state) => state.explores
  );
  const [modal, setModal] = useState(false);
  const sentinelRef = useRef(null);

  useEffect(() => {
    const fetchExplores = async () => {
      await dispatch(getExplores());
    };
    fetchExplores();
  }, [dispatch]);

  useEffect(() => {
    if (path) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [path]);

  const closeModal = () => {
    setIsOpen(false);
    // Remove the query parameter
    navigate(location.pathname);
  };

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
        <div className="columns-1 md:columns-2 xl:columns-3 py-[30px] lg:py-[50px] px-5 md:px-[50px] xl:px-[90px]">
          {isLoadingfetching ? (
            <div>Loading ...</div>
          ) : explores && explores.length > 0 ? (
            explores.map((item, index) => {
              const fileUrl = `http://api.nexio.test/api/storage/${item.attachments[0].attachment}`;
              const extension = item.attachments[0].attachment
                .split(".")
                .pop()
                .toLowerCase();
              const isImage = ["jpg", "jpeg", "png"].includes(extension);
              const isVideo = ["mov", "mkv", "mp4"].includes(extension);
              return (
                <Link key={index} to={`/explore?path=test`}>
                  <div
                    key={index}
                    className="break-inside-avoid mb-2 flex justify-center"
                  >
                    {isVideo && (
                      <div
                        className="relative"
                        style={{ height: "600px", width: "400px" }}
                      >
                        <video
                          className="h-full w-full absolute top-0 left-0 object-cover rounded-lg"
                          autoPlay
                          loop
                        >
                          <source src={fileUrl} type={`video/${extension}`} />
                        </video>
                      </div>
                    )}
                    {isImage && (
                      <div
                        className="relative"
                        style={{ height: "400px", width: "400px" }}
                      >
                        <img
                          className="h-full w-full rounded-lg absolute top-0 left-0 object-cover"
                          src={fileUrl}
                          alt="image"
                        />
                      </div>
                    )}
                  </div>
                </Link>
              );
            })
          ) : (
            <div>No post</div>
          )}
          <div
            className="sentinel h-[1px] bg-red-500"
            id="sentinel"
            ref={sentinelRef}
          ></div>
        </div>
      </div>
      {modal && <CreateFeed toggleModal={toggleModal} />}
      {isOpen && <ViewExplore path={path} closeModal={closeModal} />}
    </>
  );
}
