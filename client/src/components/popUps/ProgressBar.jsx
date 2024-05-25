import { useSelector } from "react-redux";

export default function ProgressBar() {
  const { uploadProgress, uploadedBytes, totalBytes } = useSelector(
    (state) => state.posts
  );

  const formatBytes = (bytes) => {
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    if (bytes === 0) return "0 Byte";
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
    if (i === 0) return `${bytes} ${sizes[i]}`;
    return `${(bytes / 1024 ** i).toFixed(1)} ${sizes[i]}`;
  };

  return (
    <div className="bg-white fixed bottom-[1%] right-[2%] w-[60%] sm:w-[50%] md:w-[30%] lg:w-[10%] py-2 px-7 rounded-lg shadow-2xl z-[9999999] flex flex-col">
      <h1 className="animate-pulse text-xs">Uploading...</h1>
      <progress
        className="progress progress-primary animate-pulse"
        value={uploadProgress}
        max={100}
      />
      <span className="flex justify-end animate-pulse text-xs">
        {uploadProgress}% ({formatBytes(uploadedBytes)} /{" "}
        {formatBytes(totalBytes)})
      </span>
    </div>
  );
}
