import { Link } from "react-router-dom";
import { timeAgo } from "../../utils/dateHelper";

export default function PostLikeNotification({ notification }) {
  return (
    <Link
      to="/testt"
      className="border-b-[1px] w-full p-2 bg-white hover:bg-slate-200 flex justify-between items-center"
    >
      <div className="flex items-center">
        <div className="font-semibold mr-1">{notification.data.user.name}</div>
        <span className="text-gray-600">has liked your post.</span>
      </div>
      <span className="text-gray-500 text-sm">
        {timeAgo(notification.created_at)}
      </span>
    </Link>
  );
}
