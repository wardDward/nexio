import CloseIcon from "@mui/icons-material/Close";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNotification } from "../../redux/feature/userSlice";
import PostLikeNotification from "../notifications/PostLikeNotification";
import CommentNotification from "../notifications/CommentNotification";
import FriendNotification from "../notifications/FriendNotification";

export default function NotificationBar({ toggleNotification }) {
  const dispatch = useDispatch();
  const { notifications, isLoading } = useSelector((state) => state.users);
  useEffect(() => {
    const fetchNotification = async () => {
      await dispatch(getNotification());
    };
    fetchNotification();
  }, [dispatch]);

  const renderNotifications = () => {
    if (notifications.length > 0) {
      return notifications.map((notification) => {
        switch (notification.type) {
          case "App\\Notifications\\PostLikeNotification":
            return (
              <PostLikeNotification
                notification={notification}
                key={notification.id}
              />
            );
          case "App\\Notifications\\CommentNotification":
            return (
              <CommentNotification
                notification={notification}
                key={notification.id}
              />
            );
          case "App\\Notifications\\FriendNotification":
            return (
              <FriendNotification
                notification={notification}
                key={notification.id}
              />
            );
          default:
            return null; // Handle other types or return a placeholder
        }
      });
    } else {
      return <div>No notifications</div>;
    }
  };
  
  return (
    <div className="fixed left-0 lg:left-[20%] right-0 xl:left-[15%] bg-white w-full lg:w-[25%] xl:w-[20%] top-[6%] bottom-0 lg:inset-y-0 border-t-[1px] lg:border-t-[0] border-r-[0] lg:border-r-[1px] pt-9 flex flex-col z-[9999999999]">
      <div className="absolute top-3 right-2">
        <CloseIcon
          className="cursor-pointer hover:text-gray-600"
          onClick={() => toggleNotification()}
        />
      </div>
      <h1 className="text-2xl text-gray-900 mb-6 font-semibold px-5">
        Notification
      </h1>
      <div className="mt-[10px]">
        <hr />
        <div className="px-3">
          <h1 className="font-semibold mt-4">Recent</h1>
          <div className="overflow-y-scroll my-2">
            {isLoading ? (
              <div className="loading-dots"></div>
            ) : (
              renderNotifications()
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
