import { useEffect } from "react";
import { getTimeDifference } from "../Config/DateFormat";

interface Comment {

  id:string,
  content:string,
  createdAt:string
  authorId:string
}
const Comments_Card = (comment :Comment) => {

  const { content, createdAt} = comment;




  return (
    <div className="flex  flex-col p-4 dark:shadow-gray-50 hover:shadow-sm">
      <div className="flex items-center">
        <div>
          <img
            src="https://picsum.photos/seed/picsum/200/300"
            alt=""
            className="rounded-full w-9 h-9"
          />
        </div>
        <div className="ml-4 flex-col flex">
          <div className="flex space-x-2">
            <span className="text-xs">Navneet Sharma </span>
          </div>
          <div className="flex flex-col md:flex-row text-sm md:space-x-2">
            <div className="space-x-2">
              <span className="text-gray-400 text-xs ">
                {getTimeDifference(createdAt)}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-2">
        <p className="text-xs text-gray-600 w-[300px] line-clamp-5 ">
          {content}
        </p>
      </div>
      <div className="flex justify-between mt-3">
        <div className="flex space-x-2 items-center cursor-pointer p-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1"
            stroke="currentColor"
            className="w-4 h-4"
          >
            {/* Your SVG path */}
          </svg>
          <span className="text-gray-400 text-xs font-extralight">2.2k</span>
        </div>
        <div className="cursor-pointer p-1">
          <div className="rounded-3xl hover:bg-accent hover:text-accent-foreground flex items-end space-x-1 px-2 py-1">
            <span className="text-sm font-light ">Replay</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1"
              stroke="currentColor"
              className="w-4 h-4"
            >
              {/* Your SVG path */}
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comments_Card;
