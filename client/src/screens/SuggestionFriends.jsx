import { useEffect } from "react";
import FriendCard from "../components/friends/FriendCard";
import { useDispatch, useSelector } from "react-redux";
import { getSuggestions } from "../redux/feature/friendSlice";

export default function SuggestionFriends() {
  const dispatch = useDispatch();
  const { isLoading, friends } = useSelector((state) => state.friends);
  useEffect(() => {
    const fetchSuggetion = async () => {
      await dispatch(getSuggestions());
    };
    fetchSuggetion();
  }, [dispatch]);
  return (
    <div className="h-screen flex flex-col ml-[0px] lg:ml-[20%] xl:ml-[15%]">
      <div className="p-[20px]">
        <h1 className="text-2xl font-semibold tracking-wide">Suggested</h1>
      </div>
      <div className="py-[40px] px-[20px] md:px-[40px] lg:pl-[60px] flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {isLoading && <div>Loading...</div>}
          {friends.map((friend) => (
            <FriendCard key={friend.id} friend={friend} />
          ))}
        </div>
      </div>
    </div>
  );
}
