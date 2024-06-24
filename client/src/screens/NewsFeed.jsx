import { useDispatch, useSelector } from "react-redux";
import CreatePostCard from "../components/newsfeed/CreatePostCard";
import PostCard from "../components/newsfeed/PostCard";
import StorySlider from "../components/newsfeed/StorySlider";
import { useEffect, useRef } from "react";
import { loadMorePost } from "../redux/feature/postSlice";
import { v4 as uuidv4 } from "uuid";

export default function NewsFeed() {
  const dispatch = useDispatch();
  const { posts, hasMorePosts, isLoading } = useSelector(
    (state) => state.posts
  );

  const sentinelRef = useRef(null);

  useEffect(() => {
    const callback = (entries) => {
      if (entries[0].target.id === "sentinel" && entries[0].isIntersecting) {
        dispatch(loadMorePost());
      }
    };

    let observer = new IntersectionObserver(callback, {
      threshold: 0.02,
    });

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [dispatch]);

  return (
  <>
    <div className="w-full flex flex-col items-center p-5 bg-white">
      <StorySlider />
      <CreatePostCard />
      <div className="mt-[10px] w-full lg:w-[60%] xl:w-[40%] flex justify-center flex-col ">
        {posts.map((post) => (
          <PostCard post={post} key={`${post.id}_${uuidv4()}`}/>
        ))}
        {isLoading && (
          <div className="flex justify-center items-center">
            <span className="loading loading-bars loading-sm"></span>
          </div>
        )}
      </div>
      {hasMorePosts ? (
        <div
          className="sentinel h-[1px] bg-red-500"
          id="sentinel"
          ref={sentinelRef}
        />
      ) : (
        <div className="flex justify-center items-center text-gray-600">
          No more post to load.
        </div>
      )}
    </div>
  </>
  );
}
