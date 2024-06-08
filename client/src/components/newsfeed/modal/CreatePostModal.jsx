import { useEffect, useRef, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import CollectionsIcon from "@mui/icons-material/Collections";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import { useDispatch, useSelector } from "react-redux";
import { clearState, createPost } from "../../../redux/feature/postSlice";
import Attachments from "./Attachments";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import Carousel from "../../popUps/Carousel";
export default function CreatePostModal({ closeModal }) {
  const [caption, setCaption] = useState("");
  const [files, setFiles] = useState([]);
  const [disableBtn, setDisableBtn] = useState(true);
  const [showMedia, setShowMedia] = useState(false);
  const { isLoading, errorMessage } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const captionRef = useRef();

  useEffect(() => {
    captionRef.current.focus();
  }, []);

  useEffect(() => {
    const body = document.querySelector("body");
    body.classList.add("no-scroll");

    return () => {
      body.classList.remove("no-scroll");
    };
  }, []);

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
    if (caption === "" && files.length === 0) {
      setDisableBtn(true);
    } else {
      setDisableBtn(false);
    }
  }, [caption, files]);

  const handleFiles = (e) => {
    const chosenFiles = [...e.target.files];
    setFiles((prevFiles) => [...prevFiles, ...chosenFiles]);
  };

  const closePostModal = () => {
    if (files.length > 0) {
      const confirmClose = window.confirm(
        "Changes you made may not be saved. Are you sure you want to close?"
      );
      if (confirmClose) {
        dispatch(clearState());
        closeModal();
      }
    } else {
      closeModal();
    }
  };

  const submitPost = async (e) => {
    e.preventDefault();
    dispatch(clearState());
    closeModal();

    const res = await dispatch(
      createPost({ body: caption, attachment: files })
    );

    if (res.meta.requestStatus === "fulfilled") {
      setCaption("");
      setFiles([]);
    }
  };

  const togglePreview = () => {
    setShowMedia(!showMedia);
  };

  const removeFile = (indexToRemove) => {
    // console.log(indexToRemove);
    setFiles((prevFiles) =>
      prevFiles.filter((_, index) => index !== indexToRemove)
    );
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-[9999999]"
        onClick={closePostModal}
      ></div>
      <div className="bg-white fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[9999999] w-full md:w-[60%] lg:w-[30%] rounded-md flex flex-col">
        <div className="p-2 relative flex items-center justify-center">
          <h1 className="font-bold mt-[5px] text-lg">Create Post</h1>
          <div
            className="fixed right-4 bg-slate-100 p-2 top-[8px] rounded-full cursor-pointer"
            onClick={closePostModal}
          >
            <CloseIcon sx={{ fontSize: 22 }} className="text-gray-900" />
          </div>
        </div>
        <hr className="bg-black my-2" />
        <form
          className="flex flex-col p-4"
          onSubmit={submitPost}
          encType="multipart/form-data"
        >
          <div className="flex">
            <div>
              <img
                src="https://images.unsplash.com/photo-1642649149963-0ef6779df6c6?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className="h-[50px] w-[50px] rounded-full border border-slate-300"
                alt=""
              />
            </div>
            <div className="flex flex-col ml-[10px] w-full">
              <h5 className="text-xs font-bold">Edward Taligatos</h5>
              <select className="bg-gray-200 text-sm mt-[5px] px-1 py-[1px] rounded-md w-[100px]">
                <option value="public">public</option>
                <option value="only me">only me</option>
              </select>
            </div>
          </div>
          <textarea
            ref={captionRef}
            name="body"
            id="body"
            onChange={(e) => setCaption(e.target.value)}
            value={caption}
            className="w-full mt-[10px] text-sm resize-none max-h-[100px] p-2 overflow-y-scroll outline-none bg-white text-black"
            placeholder="What's on your mind, Edward?"
          ></textarea>
          <hr className="mb-2" />
          <Attachments
            files={files}
            setFiles={setFiles}
            handleFiles={handleFiles}
          />
          <div className="flex items-center justify-between my-4 px-2 border-[1px] border-slate-400 py-3 rounded-md">
            <h5 className="text-sm font-medium">Add to your post</h5>
            <div>
              <label htmlFor="add_media">
                <CollectionsIcon
                  className="text-green-500 cursor-pointer mx-2"
                  titleAccess="Add image or video"
                />
                <input
                  type="file"
                  name="add_media"
                  id="add_media"
                  multiple
                  className="hidden"
                  onChange={(e) => handleFiles(e)}
                />
              </label>
              <LocalOfferOutlinedIcon
                className="text-blue-500 cursor-pointer mx-2"
                titleAccess="Tag people"
              />
              {files.length !== 0 && (
                <RemoveRedEyeOutlinedIcon
                  onClick={() => togglePreview()}
                  className="text-black cursor-pointer mx-2"
                  titleAccess="View All Media"
                />
              )}
            </div>
          </div>
          {errorMessage["attachment.0"] && (
            <p className="text-red-500 text-sm mb-2">
              {`File type of : jpg, jpeg, png, pdf. are allowed`}
            </p>
          )}
          <button
            disabled={disableBtn}
            type="submit"
            className={`w-full py-2 rounded-lg flex justify-center items-center ${
              disableBtn ? "text-gray-700 bg-gray-300 cursor-not-allowed" : "bg-black text-white"
            }`}
          >
            {isLoading && (
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            )}
            <span>Post</span>
          </button>
        </form>
      </div>
      {showMedia && (
        <Carousel
          files={files}
          togglePreview={togglePreview}
          removeFile={removeFile}
        />
      )}
    </>
  );
}
