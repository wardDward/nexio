import CreatePostCard from "../components/newsfeed/CreatePostCard";
import PostCard from "../components/newsfeed/PostCard";
import StorySlider from "../components/newsfeed/StorySlider";

export default function NewsFeed() {
  return (
    <div className="w-full flex flex-col items-center p-5 ">
      <StorySlider />
      <CreatePostCard />
      <div className="mt-[50px] w-full lg:w-[60%] xl:w-[40%] flex justify-center  flex-col ">
        <PostCard />
      </div>
    </div>
  );
}
