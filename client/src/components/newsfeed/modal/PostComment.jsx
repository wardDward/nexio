import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useRef, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import { useDispatch, useSelector } from "react-redux";
import {
  createComment,
  fetchComment,
  pushComment,
} from "../../../redux/feature/commentSlice/commentSlice";
import CommentCard from "../CommentCard";
import { v4 as uuidv4 } from "uuid";

export default function PostComment({ post, toggleComment }) {
  const dispatch = useDispatch();
  const { comments } = useSelector((state) => state.comments);
  const { user } = useSelector((state) => state.users);

  const [comment, setComment] = useState("");
  const commentContainerRef = useRef(null);

  useEffect(() => {
    const body = document.querySelector("body");
    body.classList.add("no-scroll");

    return () => {
      body.classList.remove("no-scroll");
    };
  }, []);

  useEffect(() => {
    const getComment = async () => {
      await dispatch(fetchComment({ post_id: post.id }));
    };
    getComment();
  }, [dispatch, post.id]);

  useEffect(() => {
    const scrollToBottom = () => {
      commentContainerRef.current?.scrollTo({
        top: commentContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    };
    scrollToBottom();
  }, [comments]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await dispatch(
      createComment({ post_id: post.id, comment })
    );
    if (response.meta.requestStatus === "fulfilled") {
      setComment("");
    }
  };

  useEffect(() => {
    Echo.private(`comments.${user.id}`).listen("CommentEvent", (data) => {
      const unformattedData = data;
      const transformData = [
        {
          author: {
            id: unformattedData["author"]["id"],
            name: unformattedData["author"]["name"],
            username: unformattedData["author"]["username"],
          },
          id: unformattedData["comment"]["id"],
          user_id: unformattedData["comment"]["user_id"],
          post_id: unformattedData["comment"]["post_id"],
          comment: unformattedData["comment"]["comment"],
          created_at: unformattedData["comment"]["created_at"],
          updated_at: unformattedData["comment"]["updated_at"],
        },
      ];
      dispatch(pushComment(transformData));
    });
  });

  return (
    <>
      <div
        className="bg-white z-[99999999] fixed inset-0 opacity-[0.5] "
        onClick={() => toggleComment()}
      />
      <div
        className="text-black absolute top-4 z-[99999999] right-4 hover:text-red-500 cursor-pointer"
        onClick={() => toggleComment()}
      >
        <CloseIcon sx={{ fontSize: 30 }} />
      </div>
      <div className="w-full md:w-[60%] xl:w-[30%] bg-white fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-[1px] border-gray-300 z-[9999999999] h-[70%] rounded-lg  flex flex-col">
        <div className="text-center border-b-[2px] border-gray-400s py-4">
          <h2 className="text-black font-medium">Comments</h2>
        </div>
        <div
          className="flex flex-col overflow-y-scroll h-[70%] commnent-container flex-grow"
          ref={commentContainerRef}
        >
          {comments.map((comment) => (
            <CommentCard key={comment.id + uuidv4()} comment={comment} />
          ))}
        </div>
        <form
          className="border-t-[2px] px-3 py-2 h-[15%] flex"
          onSubmit={handleSubmit}
        >
          <img
            src="https://images.unsplash.com/photo-1642649149963-0ef6779df6c6?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="w-[40px] h-[40px] rounded-full border-[3px] border-gray-200"
            alt=""
          />
          <div className="w-full relative  bg-slate-200/70 ml-1 ">
            <textarea
              name="comment"
              id="comment"
              className="w-[90%] bg-transparent h-full overflow-y-scroll p-2 rounded-md text-gray-900 text-sm outline-none"
              placeholder="Write a comment..."
              onChange={(e) => setComment(e.target.value)}
              value={comment}
            ></textarea>
            <button
              type="submit"
              className="absolute top-[65%] z-[9999999] w-[10%] bg-transparent hover:text-amber-700"
            >
              <SendIcon />
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
