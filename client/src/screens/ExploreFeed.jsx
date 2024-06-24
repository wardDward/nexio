import AddToPhotosOutlinedIcon from "@mui/icons-material/AddToPhotosOutlined";
import CreateFeed from "../components/exploreFeed/CreateFeed";
import ViewExplore from "../components/exploreFeed/ViewExplore";
import ExploreCard from "../components/exploreFeed/ExploreCard";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getExplores, loadMoreExplore } from "../redux/feature/exploreSlice";
import { useLocation, useNavigate } from "react-router-dom";

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

  const { explores, hasMoreExplores } = useSelector(
    (state) => state.explores
  );

  const [modal, setModal] = useState(false);
  const sentinelRef = useRef(null);

  useEffect(() => {
    if (path) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [path]);

  useEffect(() => {
    const callback = (entries) => {
      if (entries[0].target.id === "sentinel" && entries[0].isIntersecting) {
        console.log(entries);
        dispatch(loadMoreExplore());
      }
    };
    
    let observer = new IntersectionObserver(callback, {
      threshold: 0.5, 
    });

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [dispatch]);

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
      <div className="h-screen py-10  sm:px-8 md:px-16 lg:px-20 xl:px-24 ml-0 lg:ml-[20%] xl:ml-[15%]">
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
        <div className="columns-1 md:columns-2 xl:columns-3 pt-[30px] lg:pt-[50px] px-5 md:px-[50px] xl:px-[90px]">
          {explores && explores.length > 0 && (
            explores.map((item, index) => {
              // console.log(item.attachments[0].attachment);
              const fileUrl = `http://api.nexio.test/api/storage/${item.attachments[0].attachment}`;
              const extension = item.attachments[0].attachment
                .split(".")
                .pop()
                .toLowerCase();
              const isImage = ["jpg", "jpeg", "png"].includes(extension);
              const isVideo = ["mov", "mkv", "mp4"].includes(extension);
              return (
                <ExploreCard
                  key={index}
                  explore={item}
                  isImage={isImage}
                  isVideo={isVideo}
                  fileUrl={fileUrl}
                  extension={extension}
                />
              );
            })
          )}
        </div>
        {hasMoreExplores ? (
            <div
              className="sentinel h-[10px] bg-transparent"
              id="sentinel"
              ref={sentinelRef}
            />
          ) : (
            <div className="flex justify-center items-center text-gray-600">
              No more to load.
            </div>
          )}
      </div>
      {modal && <CreateFeed toggleModal={toggleModal} />}
      {isOpen && <ViewExplore path={path} closeModal={closeModal} />}
    </>
  );
}
