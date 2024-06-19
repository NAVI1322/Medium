import { useNavigate } from "react-router-dom";
import { ModeToggle } from "../elements/mode_toggle";
import { Input } from "../ui/input";
import { ContextMenuTrigger } from "@radix-ui/react-context-menu";
import { ProfileContectMenu } from "../Profile/Profile_ContextMenu";
import { ContextMenu } from "../ui/context-menu";

const NavBar = () => {
  const navigate = useNavigate();


  const handleRightClick = (event:any) => {
    event.preventDefault(); // Prevent the default context menu
    // Your custom logic here for right-click action
    console.log('Right-clicked on image!');
    // You can add more functionality here, like showing a custom context menu
  };

  return (
    <div className="p-5 flex justify-between m-1 border-b hover:shadow-sm dark:shadow-sm dark:border   dark:hover:shadow-white sticky top-0 z-10">
      <div className="flex space-x-6 font-bold items-center justify-between mr-5 p-3">
        <h1
          className="md:text-2xl text-xl cursor-pointer"
          onClick={() => navigate("/dashboard")}
        >
          Medium
        </h1>
        <div className="rounded-3xl ring-1 ring-gray-200 bg-gray-100 dark:ring-white flex items-center py-0 px-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 font-thin dark:text-black"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>

          <Input
            type="text"
            placeholder="Search"
            className="outline-none ring-0 border-0 font-light bg-gray-100"
          />
        </div>
      </div>
      <div className="flex space-x-3 items-center">
        <div
          className="flex items-center cursor-pointer hover:text-gray-600"
          onClick={() => navigate("/CreateBlog")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="0.5"
            stroke="currentColor"
            className="md:w-6 md:h-6 h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
            />
          </svg>
          <span className="font-thin text-md md:font-lg">Write</span>
        </div>
        <ModeToggle />
        
        <ContextMenu>
        <ContextMenuTrigger>
        <div>
           <img
          src="https://picsum.photos/400/400"
          alt=""
          className="rounded-full w-8 h-8"
         />
        </div>
         <ProfileContectMenu />
         </ContextMenuTrigger>
         </ ContextMenu >
        </div>
      </div>
   
  );
};

export default NavBar;
