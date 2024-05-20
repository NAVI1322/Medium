const Comments_Card = () => {
    return ( 
    <div className="flex  flex-col p-4 dark:shadow-gray-50 hover:shadow-sm">
    <div className="flex items-center">
    <div>
      <img
        src="https://source.unsplash.com/random"
        alt=""
        className="rounded-full w-9 h-9"
      />
    </div>
    <div className=" ml-4 flex-col flex">
      <div className="flex space-x-2">
        <span className=" text-xs  ">Navneet Sharma </span>

      </div>
      <div className="flex flex-col md:flex-row text-sm md:space-x-2">
        <div className="space-x-2">
          <span className="text-gray-400 text-xs  ">5 min ago</span>
        </div>
      </div>
    </div>
    </div>
    <div className="mt-2 ">
      <p className="text-xs text-gray-600 w-[300px] line-clamp-5 ">hi you are doing great sadfalsdflka  sjdflkajslkdfjlkajsflkjasljflkajsklfdjalkjdflkdajskfjdsakjlkdsfjlkajsdl</p>
    </div>
    <div className="flex justify-between mt-3 ">
    <div className="flex space-x-2 items-center cursor-pointer p-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1"
              stroke="currentColor"
              className="w-4 h-4  "
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
              />
            </svg>
            <span className="text-gray-400 text-xs font-extralight">2.2k</span>
          </div>
          <div className=" cursor-pointer   p-1 ">
          <div className="rounded-3xl  hover:bg-accent hover:text-accent-foreground flex items-end space-x-1 px-2 py-1">
          <span className="text-sm  font-light ">Replay</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" className="w-4 h-4">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
</svg>
          </div>

          </div>
    </div>
    </div> );
}
 
export default Comments_Card;



