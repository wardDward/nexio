import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import SendIcon from "@mui/icons-material/Send";
import { useDispatch } from "react-redux";
import { likePost } from "../../redux/feature/likeSlice";
import { useState } from "react";

export default function InteractionBar({ post, toggleComment }) {
  const dispatch = useDispatch();

  const [liked, setLiked] = useState(post.liked);
  const [likeCount, setLikeCount] = useState(post.likes_count ?? 0);
  const toggleLike = async () => {
    const response = await dispatch(likePost(post));
    setLiked(response.payload.status);
    if (response.meta.requestStatus) {
      setLikeCount(post.likes_count + 1);
    }
  };

  return (
    <div className="py-2 flex items-center px-5 border-t-[1px] mt-4">
      <div className="flex items-center justify-between flex-1">
        <div className="flex">
          <div
            className="mx-2 cursor-pointer hover:text-gray-500 flex items-center"
            onClick={() => toggleLike()}
          >
            <FavoriteOutlinedIcon
              sx={{
                fontSize: 22,
                color: liked ? "red" : "inherit",
              }}
            />
            <span className="text-gray-600 text-sm ml-1">{likeCount}</span>
          </div>
          <div
            className="mx-2 cursor-pointer hover:text-gray-500 flex items-center"
            onClick={() => toggleComment()}
          >
            <ChatBubbleIcon sx={{ fontSize: 22 }} />
            <span className="text-gray-600 text-sm ml-1">{post.comments_count}</span>
          </div>
        </div>
        <div className="mx-2 cursor-pointer hover:text-gray-500">
          <SendIcon sx={{ fontSize: 22 }} />
        </div>
      </div>
    </div>
  );
}
