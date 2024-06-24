import CloseIcon from "@mui/icons-material/Close";
import ExploreAttachments from "./ExploreAttachments";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleFiles } from "../../utils/functionHelper";
import PermMediaOutlinedIcon from "@mui/icons-material/PermMediaOutlined";
import RemoveRedEyeOutlined from "@mui/icons-material/RemoveRedEyeOutlined";
import { clearExplores, storeExplore } from "../../redux/feature/exploreSlice";
import ExploreCarousel from "../popUps/ExploreCarousel";

export default function CreateFeed({ toggleModal }) {
  const dispatch = useDispatch();

  const [caption, setCaption] = useState("");
  const [files, setFiles] = useState([]);
  const [disabledButton, setDisabledButton] = useState(true);
  const [preview, setPreview] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { isLoadingStoring } = useSelector((state) => state.explores);

  const captionRef = useRef(null);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (files.length > 0) {
        const confirmationMessage =
          "You have unsaved changes. Are you sure you want to leave?";
        event.returnValue = confirmationMessage;
        return confirmationMessage;
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [files]);

  useEffect(() => {
    const body = document.querySelector("body");
    body.classList.add("no-scroll");
    captionRef.current.focus();
    return () => {
      body.classList.remove("no-scroll");
    };
  }, []);

  useEffect(() => {
    if (caption === "" && files.length === 0) {
      setDisabledButton(true);
    } else {
      setDisabledButton(false);
    }
  }, [caption, files]);

  const handleFileChange = (e) => {
    handleFiles(e, setFiles, setErrorMessage);
  };

  const togglePreview = () => {
    setPreview(!preview);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(storeExplore({ caption, attachment: files }));
    toggleModal();

    if (res.meta.requestStatus === "fulfilled") {
      setCaption("");
      setFiles([]);
    }
  };

  const closePostModal = () => {
    if (files.length > 0) {
      const confirmClose = window.confirm(
        "Changes you made may not be saved. Are you sure you want to close?"
      );
      if (confirmClose) {
        dispatch(clearExplores());
        toggleModal();
      }
    } else {
      toggleModal();
    }
  };

  const removeFile = (indexRemove) => {
    console.log(indexRemove);
    setFiles((prevFiles) =>
      prevFiles.filter((_, index) => index !== indexRemove)
    );
  };

  return (
    <>
      <div
        className="absolute inset-0 bg-black/40 z-[999]"
        onClick={() => closePostModal()}
      ></div>
      <div
        className="absolute top-7 right-7 z-[9999] text-white hover:text-red-500 hover:bg-slate-100 cursor-pointer rounded-full p-1 mt-[60px] lg:mt-0"
        onClick={() => closePostModal()}
      >
        <CloseIcon sx={{ fontSize: 29 }} />
      </div>
      <div className="bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[99999] w-full md:w-[60%] lg:w-[30%] rounded-md flex flex-col py-4">
        <div className="flex flex-col h-full overflow-hidden">
          <div className="text-center p-2 border-b-[2px] border-gray-300">
            <h1 className="text-md capitalize font-medium">Create a Reel</h1>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col"
            encType="multipart/form-data"
          >
            <div className="mt-2 mx-3">
              <textarea
                ref={captionRef}
                onChange={(e) => setCaption(e.target.value)}
                name="caption"
                id="caption"
                className="border-b-[2px] p-2 w-full resize-none max-h-[80px] overflow-y-scroll text-sm outline-none"
                placeholder="Caption here..."
                value={caption}
              ></textarea>
            </div>
            <ExploreAttachments
              files={files}
              setFiles={setFiles}
              setErrorMessage={setErrorMessage}
              errorMessage={errorMessage}
            />
            <p className="text-red-500 text-sm ml-3">{errorMessage}</p>
            <div className="py-2 px-5 mx-2 border border-gray-300 rounded-md flex justify-between items-center">
              <div className="flex items-center">
                <label
                  htmlFor="file"
                  className="cursor-pointer hover:underline"
                >
                  <PermMediaOutlinedIcon
                    sx={{ color: "green" }}
                    titleAccess="Add Media"
                  />
                  <input
                    type="file"
                    name="file"
                    id="file"
                    multiple
                    className="hidden"
                    onChange={(e) => handleFileChange(e)}
                  />
                </label>
                {files.length > 0 && (
                  <div
                    className="ml-3 cursor-pointer"
                    onClick={() => togglePreview()}
                  >
                    <RemoveRedEyeOutlined titleAccess="View Media" />
                  </div>
                )}
              </div>
              <button
                disabled={disabledButton}
                type="submit"
                className={`text-sm hover:underline outline-none font-medium ${
                  disabledButton ? "cursor-not-allowed" : ""
                }`}
              >
                Post
              </button>
            </div>
          </form>
        </div>
      </div>
      {preview && (
        <ExploreCarousel
          files={files}
          togglePreview={togglePreview}
          removeFile={removeFile}
        />
      )}
    </>
  );
}
