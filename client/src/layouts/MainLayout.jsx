import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../components/navigations/Sidebar";
import OnlineBar from "../components/navigations/OnlineBar";
import NavigationBar from "../components/navigations/NavigationBar";
import Searchbar from "../components/navigations/Searchbar";
import useAuth from "../hooks/useAuth";
import ProgressBar from "../components/popUps/ProgressBar";
import Toast from "../components/popUps/Toast";
import NotificationBar from "../components/navigations/NotificationBar";
import {
  clearNotification,
  countUnreadNotification,
  getNotification,
  incrementNotification,
  readNotitication,
} from "../redux/feature/userSlice";

export default function MainLayout() {
  const {} = useAuth();
  const location = useLocation();
  const dispatch = useDispatch();

  const [toggleSearchBar, setToggleSearchBar] = useState(false);
  const [notificationBar, setNotificationBar] = useState(false);

  const { showProgress } = useSelector((state) => state.posts);
  const { user, notification_count } = useSelector((state) => state.users);

  const [message, setMessage] = useState("");
  const [data, setData] = useState([]);
  const [showToast, setShowToast] = useState(false);

  const toggleSearch = () => {
    setToggleSearchBar(!toggleSearchBar);
  };

  const toggleNotification = async () => {
    setNotificationBar(!notificationBar);
    const res = await dispatch(readNotitication());
    if (res.meta.requestStatus === "fulfilled") {
      dispatch(clearNotification());
    }
  };

  useEffect(() => {
    if (user && user.id) {
      Echo.private(`explores.${user.id}`).listen("ExploreCreateFailed", (e) => {
        setMessage(e.message);
        setData((prevFiles) => [...prevFiles, ...e.failed_path]);
      });
    }

    return () => {
      if (user && user.id) {
        Echo.private(`explores.${user.id}`).stopListening(
          "ExploreCreateFailed"
        );
      }
    };
  }, [user]);

  useEffect(() => {
    if (user && user.id) {
      Echo.private(`posts.${user.id}`).listen("PostCreationFailed", (e) => {
        setMessage(e.message);
        setData((prevFiles) => [...prevFiles, ...e.failed_path]);
      });
    }

    return () => {
      if (user && user.id) {
        Echo.private(`posts.${user.id}`).stopListening("PostCreationFailed");
      }
    };
  }, [user]);

  useEffect(() => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  }, [message]);

  useEffect(() => {
    const getNotificationCount = async () => {
      await dispatch(countUnreadNotification());
    };
    getNotificationCount();
  }, [dispatch]);

  useEffect(() => {
    const getNotifications = async () => {
      await dispatch(getNotification());
    };
    getNotifications();
  }, [dispatch]);

  useEffect(() => {
    if (user && user.id) {
      Echo.private(`App.Models.User.${user.id}`).notification(
        (notification) => {
          console.log(notification);

          dispatch(incrementNotification());
          var audio = new Audio(
            "http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/alien_shoot.wav"
          );
          audio.play();
        }
      );
    }
  });
  const fullWidthPaths = ["/explore", "/suggestions", "/profile"];

  return (
    <>
      <div className="h-screen flex">
        {/* navigation bar for small to medium screens*/}
        <NavigationBar
          toggleSearch={toggleSearch}
          toggleNotification={toggleNotification}
          notification_count={notification_count}
        />
        {/* sidebar for lg screens only */}
        {location.pathname !== "/profile" && (
          <Sidebar
            toggleSearch={toggleSearch}
            toggleNotification={toggleNotification}
            notification_count={notification_count}
          />
        )}

        <div
          className={`mt-[60px] lg:mt-0 w-full ${
            fullWidthPaths.includes(location.pathname)
              ? "md:w-full"
              : "md:w-[70%]"
          } lg:w-full`}
        >
          <Outlet />
        </div>
        {location.pathname !== "/explore" &&
          location.pathname !== "/suggestions" &&
          location.pathname !== "/profile" && <OnlineBar />}
        {toggleSearchBar && <Searchbar toggleSearch={toggleSearch} />}
        {notificationBar && (
          <NotificationBar toggleNotification={toggleNotification} />
        )}
      </div>
      {showProgress && <ProgressBar />}
      {showToast && <Toast message={message} data={data} />}
    </>
  );
}
