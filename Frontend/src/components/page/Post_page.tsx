
import { Sheet, SheetTrigger } from "../ui/sheet";
import { Comment_Post } from "../Blog_ui/modal_Comment_post";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { DateFormat, getTimeDifference } from "../Config/DateFormat";


interface LikeProp{
  Liked:Boolean,
  LikeCount:number,
  success:boolean
}


const Post_Page = () => {


  const [like, setLike] = useState<LikeProp>({ Liked: false, LikeCount: 0 ,success:false});
  

interface postData {
  title:string,
  content:string,
  category:string,
  createdAt:string,
 

}


const { id } = useParams()||undefined;
const Domain = import.meta.env.VITE_DOMAIN;

  
const [post,setPost]=useState <postData>({
  title:"",
  content:"",
  category:"",
  createdAt:"",
});



  useEffect(()=>{
    
    async function FetchPostData() {

      try {
      const res = (await axios.get(`${Domain}/api/v1/blog/${id}`)).data.blog
      setPost(res);

      const res_likes = await axios.get(`${Domain}/api/v1/blog/getLikes/${id}`)
      setLike(res_likes.data)

        
      console.log(res_likes.data.LikeCount )
   

    
    }
    catch(e)
    {
        console.log("error in fetching Posts" + e)
    }
    
    }
    FetchPostData()
  },[Domain])


  async function handleLikeEvents() { 
    try {
      const userId = "5fd76463-536d-43a1-a2c8-f3b7854fe67f";
      let res;
      if (!like.success) {
        res = await axios.post(`${Domain}/api/v1/blog/likes/${id}`, { userId });
      } else {
      
        setLike(prevLike => ({ ...prevLike, LikeCount: prevLike.LikeCount - 1 }));
        res = await axios.put(`${Domain}/api/v1/blog/likes/${id}`, { userId });

      }
      setLike(res.data);  
      console.log(res.data)
      console.log("Likes", like);
    } catch (error) {
      console.error("Error handling like:", error);
      
    }
  }
  






  return (
    <div className=" flex flex-col justify-center container mx-auto mt-8 p-2 md:w-[680px] w-[452px]">
      <div className="md:text-4xl text-3xl  font-bold">
        {post.title}
      </div>

      <div className="mt-14 flex  items-center ">
        <div>
          <img
            src="https://picsum.photos/seed/picsum/200/300"
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
              <span className="text-gray-400 ">Published in </span>{post.category}
           
            </div>
            <div className="space-x-2">
              <span className="text-gray-400">.</span>
              <span className="text-gray-400">{getTimeDifference(post.createdAt)}</span>
              <span className="text-gray-400">.</span>
              <span className="text-gray-400">{DateFormat(post.createdAt.toString())}</span>
            </div>
          </div>
        </div>
      </div>

      <div className=" flex mt-5 border-y items-center p-3 justify-between ">
        <div className="flex space-x-8 ">
          <div className="flex space-x-2 items-center cursor-pointer" onClick={handleLikeEvents}> 
            
            
            {like.Liked === true ? 
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
            <path d="M7.493 18.5c-.425 0-.82-.236-.975-.632A7.48 7.48 0 0 1 6 15.125c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75A.75.75 0 0 1 15 2a2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23h-.777ZM2.331 10.727a11.969 11.969 0 0 0-.831 4.398 12 12 0 0 0 .52 3.507C2.28 19.482 3.105 20 3.994 20H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 0 1-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227Z" />
          </svg>
            :
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
            </svg>}
            <span className="text-gray-400 text-sm font-extralight">{like.LikeCount}</span>
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
              
              <Comment_Post PostId={id}  />


          
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
          src="https://picsum.photos/seed/picsum/200/300"
          alt="Title Image"
          className="w-[680px] h-[388px]"
        />
      </div>
    <div className="flex justify-center">
    <div 
        className="mt-10 md:w-[680px] md:h-[388px] w-[300px]  font-sans  "
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </div>
      </div>
  );
};

export default Post_Page;






