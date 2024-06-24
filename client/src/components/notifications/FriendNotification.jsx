import { acceptFriendRequest } from "../../redux/feature/friendSlice";
import { timeAgo } from "../../utils/dateHelper";
import { useDispatch } from "react-redux";

export default function CommentNotification({ notification }) {
  const dispatch = useDispatch();
  const accept = async () => {
    await dispatch(
      acceptFriendRequest({
        id: notification.id,
        follower_id: notification.data.user.id,
        auth_id: notification.data.auth_user.id
      })
    );
  };
  return (
    <div className="border-b-[1px] w-full p-2 bg-white flex justify-between items-center">
      <div className="flex items-center">
        <div className="font-semibold mr-1">{notification.data.user.name} {notification.id}</div>
        <span className="text-gray-600">has sent a request.</span>
        <div className="ml-2">
          <button
            onClick={() => accept()}
            className="bg-black text-white ml-2 px-2 py-1 rounded-md hover:bg-gray-500"
          >
            Accept
          </button>
          <button className="bg-slate-700 hover:bg-slate-500 text-white ml-2 px-2 py-1 rounded-md">
            Remove
          </button>
        </div>
      </div>
      <span className="text-gray-500 text-sm">
        {timeAgo(notification.created_at)}
      </span>
    </div>
  );
}
