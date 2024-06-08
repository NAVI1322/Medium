import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DateFormat, getTimeDifference } from "../ui/DateFormat";




interface Card_Content{
  date: String,
  title: String,
  content: String,
  category: String,
  ClickEvent:()=>void,
}


const BlogCard = ({date,title,content,ClickEvent,category}:Card_Content) => {



  return (
    <Card  onClick={ClickEvent}> 
      <CardHeader className="flex flex-col space-y-3">
        <CardDescription>
          <div className="flex space-x-2 items-center">
            <img
              src="https://source.unsplash.com/random"
              alt=""
              className="rounded-full w-8 h-8"
            />
            <span className="text-lg font-">Navneet Sharma .</span>
            <span className="text-md font-extralight text-gray-300">
              {DateFormat(date.toString())}
            </span>
          </div>
        </CardDescription>
        <CardTitle>{title}</CardTitle>
      </CardHeader> 
      <CardContent>
      <div className=" md:w-[550px] text-ellipsis overflow-hidden mb-5">
  <p className="line-clamp-3" dangerouslySetInnerHTML={{ __html: content }} /> 
  
  
</div>
      </CardContent>

      <CardFooter className=" flex  justify-between items-center">
        
           <div className=" flex space-x-3 items-center">
           <button className="px-2 py-1 opacity-50 bg-gray-50 rounded-2xl text-sm dark:text-black">{category}</button>
            <span className="text-sm text-gray-400 ">{getTimeDifference(date.toString())}</span>
           </div>
           
           <div className="flex space-x-2">
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
           </div>

        
      </CardFooter>
    </Card>
  );
};

export default BlogCard;
