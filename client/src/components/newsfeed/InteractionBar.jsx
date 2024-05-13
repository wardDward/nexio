import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import SendIcon from "@mui/icons-material/Send";

export default function InteractionBar() {
  return (
    <div className="py-2 flex items-center px-5 border-t-[1px] mt-4">
      <div className="flex items-center justify-between flex-1">
        <div className="flex">
          <div className="mx-2 cursor-pointer hover:text-gray-500 flex items-center">
            <FavoriteOutlinedIcon sx={{ fontSize: 22 }} />
            <span className="text-gray-600 text-sm ml-1">500</span>
          </div>
          <div className="mx-2 cursor-pointer hover:text-gray-500 flex items-center">
            <ChatBubbleIcon sx={{ fontSize: 22 }} />
            <span className="text-gray-600 text-sm ml-1">500</span>
          </div>
        </div>
        <div className="mx-2 cursor-pointer hover:text-gray-500">
          <SendIcon sx={{ fontSize: 22 }} />
        </div>
      </div>
    </div>
  );
}
