import { useState } from "react";
import { timeAgo } from "../../utils/dateHelper";

export default function CommentCard({ comment }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const longText = `${comment.comment}`;
  const shortText = `${longText.substring(0, 100)}`;

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <div className="flex p-2">
      <img
        src="https://images.unsplash.com/photo-1642649149963-0ef6779df6c6?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        className="w-[40px] h-[40px] rounded-full"
        alt=""
      />
      <div className="ml-2 w-[90%] text-sm flex-col bg-slate-200 p-2 rounded-lg border-b-2">
        <div className="flex justify-between items-center mb-2">
          <a href="#" className="text-blue-500 font-medium hover:underline">
            {comment.author.name}
          </a>
          <span className="text-sm">{timeAgo(comment.created_at)}</span>
        </div>
        <div className="mt-1">
          <p className="break-words">
            {isExpanded ? longText : shortText}
            {longText.length >= 100 && (
              <button
                onClick={toggleReadMore}
                className="text-blue-500 ml-2 hover:font-bold"
              >
                {isExpanded ? "Read Less" : "Read More"}
              </button>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
