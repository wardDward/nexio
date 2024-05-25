import { useDispatch, useSelector } from "react-redux";
import CreatePostCard from "../components/newsfeed/CreatePostCard";
import PostCard from "../components/newsfeed/PostCard";
import StorySlider from "../components/newsfeed/StorySlider";
import { useEffect } from "react";
import { getPosts } from "../redux/feature/postSlice";

export default function NewsFeed() {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.posts);

  useEffect(() => {
    const fetchPost = async () => {
      await dispatch(getPosts());
    };
    fetchPost();
  }, [dispatch]);

  return (
    <div className="w-full flex flex-col items-center p-5 bg-white">
      <StorySlider />
      <CreatePostCard />
      <div className="mt-[10px] w-full lg:w-[60%] xl:w-[40%] flex justify-center  flex-col ">
        {posts.map((post) => (
          <PostCard post={post} key={post.id} />
        ))}
      </div>
    </div>
  );
}
