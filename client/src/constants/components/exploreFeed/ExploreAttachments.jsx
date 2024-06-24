import PermMediaIcon from "@mui/icons-material/PermMedia";
import {
  handleDragEnter,
  handleDragLeave,
  handleDragOver,
  handleDrop,
  handleFiles,
} from "../../utils/functionHelper";
import { useState } from "react";

export default function ExploreAttachments({
  files,
  setFiles,
  errorMessage,
  setErrorMessage,
}) {
  const [dragging, setDragging] = useState(false);

  const renderMedia = (file) => {
    return URL.createObjectURL(file);
  };
  return (
    <>
      <div className="w-full p-2">
        {files.length === 0 && (
          <label
            htmlFor="media"
            className="cursor-pointer h-full w-full bg-slate-100/70 flex justify-center items-center flex-col rounded-md p-2 hover:bg-slate-200 border-[3px] max-h-[300px] min-h-[300px]  border-gray-400"
            onDragEnter={(e) => handleDragEnter(e, setDragging)}
            onDragLeave={(e) => handleDragLeave(e, setDragging)}
            onDragOver={(e) => handleDragOver(e)}
            onDrop={(e) =>
              handleDrop(e, setDragging, setErrorMessage, setFiles)
            }
            onChange={(e) => handleFiles(e,setFiles, setErrorMessage)}
          >
            <PermMediaIcon sx={{ fontSize: 60, color: "gray" }} />
            <span className="text-gray-600 text-sm mt-[5px]">
              Drap & Drop file here.
            </span>
            <input
              type="file"
              name="media"
              id="media"
              multiple
              className="hidden"
            />
          </label>
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
      </div>
    </>
  );
}
