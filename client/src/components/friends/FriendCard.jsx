import { useDispatch } from "react-redux";
import { sendFriendRequest } from "../../redux/feature/friendSlice";
import { useState, useEffect } from "react";
export default function FriendCard({ friend }) {
  const dispatch = useDispatch();
  console.log(friend);
  const [status, setStatus] = useState(friend.status);

  useEffect(() => {
    if (friend.status === null) setStatus("Add Friend");
  }, [friend]);

  const sendRequest = async () => {
    const response = await dispatch(
      sendFriendRequest({ follower_id: friend.id })
    );

    if (response.meta.requestStatus === "fulfilled") {
      setStatus("pending");
    }
  };

  return (
    <div className="max-h-[360px] min-h-[360px] bg-white w-[320px] lg:min-w-[320px] shadow-lg rounded-md py-5 px-[10px] overflow-hidden flex flex-col m-2 border-[1px] border-slate-200">
      <div className="flex flex-col items-center">
        <img
          src="https://images.unsplash.com/photo-1642649149963-0ef6779df6c6?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          className="w-[150px] h-[150px] rounded-full border-[2px] borde-slate-900"
          alt=""
        />
      </div>
      <div className="flex justify-center flex-col items-center">
        <a
          href="#"
          className="text-center mt-[10px] text-md font-medium hover:underline max-w-[200px]"
        >
          Edward Taligatos
        </a>
        <div className="mt-[50px] w-full px-[30px]">
          <button
            className={`${
              status == "pending" ? "bg-slate-500" : "bg-black"
            } text-white w-full text-center py-2 text-md font-medium rounded-lg hover:bg-slate-800`}
            role="button"
            onClick={() => sendRequest()}
          >
            {status}
          </button>
        </div>
      </div>
    </div>
  );
}
