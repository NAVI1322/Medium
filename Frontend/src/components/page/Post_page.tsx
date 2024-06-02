
import { Sheet, SheetTrigger } from "../ui/sheet";
import { Comment_Post } from "../Blog_ui/modal_Comment_post";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Post_Page = () => {

  const { id } = useParams();
const [post,setPost]=useState({});

  useEffect(()=>{
    
    async function FetchPostData() {

      console.log(id)
      const res = (await axios.get("http://localhost:8787/api/v1/blog/"+id)).data.blog
      setPost(res);
    
    }
    FetchPostData()
  },[])



  return (
    <div className=" flex flex-col justify-center container mx-auto mt-8 p-2 md:w-[680px] w-[452px]">
      <div className="md:text-4xl text-3xl  font-bold">
        {post.title}
      </div>

      <div className="mt-14 flex  items-center ">
        <div>
          <img
            src="https://source.unsplash.com/random"
            alt=""
            className="rounded-full w-16 h-16"
          />
        </div>
        <div className=" ml-6 flex-col flex">
          <div className="flex space-x-2">
            <span className="   ">Navneet Sharma </span>
            <span className="text-gray-400">.</span>
            <span className="text-blue-400 font-light"> Follow</span>
          </div>
          <div className="flex flex-col md:flex-row text-sm mt-1 md:space-x-2">
            <div className="">
              <span className="text-gray-400 ">Published in </span>Level up
              Coding
            </div>
            <div className="space-x-2">
              <span className="text-gray-400">.</span>
              <span className="text-gray-400">5 min ago</span>
              <span className="text-gray-400">.</span>
              <span className="text-gray-400">jan 25,2024</span>
            </div>
          </div>
        </div>
      </div>

      <div className=" flex mt-5 border-y items-center p-3 justify-between ">
        <div className="flex space-x-8 ">
          <div className="flex space-x-2 items-center cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="0.7"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
              />
            </svg>
            <span className="text-gray-400 text-sm font-extralight">2.2k</span>
          </div>
          <div className="flex space-x-2 items-center cursor-pointer">
            <Sheet>
              <SheetTrigger asChild>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="0.7"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                  />
                </svg>
              </SheetTrigger>
              
              <Comment_Post />
          
            </Sheet>

            <span className="text-gray-400 text-sm font-extralight">100</span>
          </div>
        </div>
        <div className="flex space-x-4 cursor-pointer ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="0.8"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
            />
          </svg>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="0.8"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </div>
      </div>
      <div className="mt-10">
        <img
          src="https://source.unsplash.com/random"
          alt="Title Image"
          className="w-[680px] h-[388px]"
        />
      </div>
      <div className="  mt-10 w-[680px] h-[388px] font-light ">
        
        
       {post.content}
      </div>
      
    </div>
    
  );
};

export default Post_Page;
