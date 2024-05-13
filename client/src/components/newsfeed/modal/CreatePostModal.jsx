import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import CollectionsIcon from "@mui/icons-material/Collections";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import { useDispatch, useSelector } from "react-redux";
import { clearState, createPost } from "../../../redux/feature/postSlice";

export default function CreatePostModal({ closeModal }) {
  const [dragging, setDragging] = useState(false);
  const [files, setFiles] = useState([]);

  const dispatch = useDispatch();
  const { isLoading, errorMessage } = useSelector((state) => state.posts);

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

  // draggable function
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const droppedFiles = [...e.dataTransfer.files];
    setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);

    setDragging(false);
  };

  const handleFiles = (e) => {
    const chosenFiles = [...e.target.files];
    setFiles((prevFiles) => [...prevFiles, ...chosenFiles]);
  };

  useEffect(() => {
    console.log(files);
  }, [files]);

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

  const renderImage = (file) => {
    return URL.createObjectURL(file);
  };

  const submitPost = async (e) => {
    e.preventDefault();
    const res = await dispatch(createPost({ body: "test", attachment: files }));
    console.log(res);
    console.log(errorMessage);

    if (res.meta.requestStatus === "fulfilled") {
      setFiles([]);
      // put a toast after
    }
  };

  return (
    <>
      <div
        className="absolute inset-0 bg-black/50 z-[99999999]"
        onClick={closePostModal}
      ></div>
      <div className="bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[9999999999] w-full md:w-[60%] lg:w-[30%] rounded-md flex flex-col">
        <div className="p-2 relative flex items-center justify-center">
          <h1 className="font-bold mt-[5px] text-lg">Create Post</h1>
          <div
            className="absolute right-4 bg-slate-100 p-2 top-[8px] rounded-full cursor-pointer"
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
            name="body"
            id="body"
            className="w-full mt-[10px] text-sm resize-none max-h-[100px] p-2 overflow-y-scroll outline-none"
            placeholder="What's on your mind, Edward?"
          ></textarea>
          {files.length === 0 && (
            <div className="h-[250px] border-[3px] rounded-md p-2">
              <label
                className="cursor-pointer bg-slate-200/70 h-full flex flex-col justify-center items-center"
                htmlFor="file"
                onDragEnter={handleDragEnter}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <CloudDownloadIcon sx={{ fontSize: 60 }} />
                <span className="text-gray-600 text-sm">
                  Drag & Drop files here or click to browse
                </span>
                <input
                  onChange={(e) => handleFiles(e)}
                  className="hidden"
                  type="file"
                  name="file"
                  id="file"
                  multiple
                />
              </label>
            </div>
          )}
          {files.length > 0 && (
            <div className="w-full max-w-5xl p-2 mx-auto h-[500px]">
              <div
                className={`grid ${
                  files.length === 1
                    ? "grid-cols-1 grid-rows-1"
                    : files.length === 2
                    ? "grid-cols-2 grid-rows-1"
                    : files.length === 3
                    ? "grid-cols-2 grid-rows-2"
                    : "grid-cols-2 grid-rows-2"
                } gap-5 h-full`}
              >
                {files.map((image, index) => (
                  <div
                    key={index}
                    className={`${
                      files.length === 1
                        ? "col-span-1 row-span-1"
                        : files.length === 2
                        ? "col-span-1 row-span-1"
                        : files.length === 3
                        ? index === 2
                          ? "col-span-2 row-span-1"
                          : "col-span-1 row-span-1"
                        : index === 3
                        ? "col-span-1 row-span-1"
                        : "col-span-1 row-span-1"
                    }`}
                  >
                    <img
                      src={renderImage(image)}
                      alt={`Image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center justify-between my-4 px-2 border-[1px] border-slate-400 py-3 rounded-md">
            <h5 className="text-sm font-medium">Add to your post</h5>
            <div>
              <CollectionsIcon
                className="text-green-500 cursor-pointer mx-2"
                titleAccess="Add image or video"
              />
              <LocalOfferOutlinedIcon
                className="text-blue-500 cursor-pointer mx-2"
                titleAccess="Tag people"
              />
            </div>
          </div>
          {errorMessage["attachment.0"] && (
            <p className="text-red-500 text-sm mb-2">
              {`File type of : jpg, jpeg, png, pdf. are allowed`}
            </p>
          )}
          <button
            type="submit"
            className="w-full text-gray-700 bg-gray-300 py-2 rounded-lg"
          >
            Post
          </button>
        </form>
      </div>
    </>
  );
}
