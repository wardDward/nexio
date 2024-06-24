import { useEffect, useState } from "react";
import InteractionBar from "./InteractionBar";
import PostCardCarousel from "./PostCardCarousel";

export default function PostCard({ post }) {
  const [mediaURLs, setMediaURLs] = useState([]);

  useEffect(() => {
    const getMedia = async () => {
      try {
        const mediaURLs = post.post_attachments.map(
          (media) => media.attachment
        );
        setMediaURLs(mediaURLs);
        // console.log(mediaURLs);
      } catch (error) {
        console.error(error);
      }
    };

    getMedia();
  }, [post]);


  return (
    <div className="my-2 bg-white flex flex-col w-full pt-6 shadow-md rounded-lg border">
      <div className="flex items-center px-4">
        <img
          src="https://images.unsplash.com/photo-1642649149963-0ef6779df6c6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          className="h-[40px] w-[40px] rounded-full border border-gray-200"
        />
        <a href="#" className="text-black font-semibold text-sm ml-3">
          {post.post_owner.name}
        </a>
      </div>
      <div className="my-2">
        <p className="text-[13px] text-gray-600 font-[400] line-clamp-2 px-6">
          {post.body}
        </p>
      </div>
      {post.post_attachments.length > 0 && (
        <div className="flex justify-center gap-4 mt-4 px-5">
          <PostCardCarousel post_id={post.id} medias={mediaURLs} />
        </div>
      )}
      <InteractionBar />
    </div>
  );
}
