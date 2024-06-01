import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import { useState } from "react";
import {
  handleDragEnter,
  handleDragLeave,
  handleDragOver,
  handleDrop,
} from "../../../utils/functionHelper";

export default function Attachments({ files, handleFiles, setFiles }) {
  const [dragging, setDragging] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const dragEnterHelper = (e) => {
    handleDragEnter(e, setDragging);
  };

  const dragLeaveHelper = (e) => {
    handleDragLeave(e, setDragging);
  };

  const dragOverHelper = (e) => {
    handleDragOver(e);
  };

  const dragDropHelper = (e) => {
    handleDrop(e, setDragging, setErrorMessage, setFiles);
  };

  const renderMedia = (file) => {
    return URL.createObjectURL(file);
  };
  return (
    <>
      {files.length === 0 && (
        <div className="h-[250px] border-[3px] rounded-md p-2">
          <label
            className="cursor-pointer bg-slate-200/70 h-full flex flex-col justify-center items-center"
            htmlFor="file"
            onDragEnter={dragEnterHelper}
            onDragOver={dragOverHelper}
            onDragLeave={dragLeaveHelper}
            onDrop={dragDropHelper}
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
            } gap-5 h-full relative`}
          >
            {files.slice(0, 4).map((file, index) => (
              <div
                key={index}
                className={`${
                  files.length === 1 || files.length === 2
                    ? "col-span-1 row-span-1"
                    : files.length === 3 && index === 2
                    ? "col-span-2 row-span-1"
                    : "col-span-1 row-span-1"
                }`}
              >
                {file.type.startsWith("video/") ? (
                  <video controls className="w-full h-full object-contain">
                    <source src={renderMedia(file)} type={file.type} />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <img
                    src={renderMedia(file)}
                    alt={`Media ${index + 1}`}
                    className="w-full h-full object-contain"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
    </>
  );
}
