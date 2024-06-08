import { Button } from "@/components/ui/button"

import {
  

  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  
} from "@/components/ui/sheet"
import { Card, CardDescription, CardFooter, CardHeader } from "../ui/card"
import { Textarea } from "../ui/textarea"
import Comments_Card from "./comments_card"
import { useEffect } from "react"
import axios from "axios"

export function Comment_Post() {



  async function HandleCommentPost()
  {
      const res = axios.post("http://localhost:8787/api/v1/blog/",{

      })
  }


  return (
    
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-2xl">Responses (12)</SheetTitle>
          <SheetDescription>
          <Card className="ml-0 p-0 hover:shadow-sm">
            <CardHeader className="flex flex-row space-x-4 items-center">
            <img
            src="https://source.unsplash.com/random"
            alt=""
            className="rounded-full w-10 h-10"
          />
          <span className="text-sm font-light"> Navneet Sharma</span>
            </CardHeader>

            <CardDescription>
              <Textarea  className="ml-4 " placeholder="What are your thoughts"/>

            </CardDescription>
            <CardFooter className="flex justify-start px-2 items-center">
          
           <Button className="px-4 m-2 bg-green-700 hover:bg-green-600 rounded-3xl text-white text-sm ">Save</Button>
           <SheetClose asChild>
           <Button variant={"ghost"} className="rounded-3xl">Cancel</Button>
           </SheetClose>
            </CardFooter>

          </Card>
      <div className="flex flex-col space-y-4 overflow-y-scroll h-[500px] w-[360px]">
      <Comments_Card />
      <Comments_Card />
      <Comments_Card />
      <Comments_Card />
      <Comments_Card />
      <Comments_Card />
      <Comments_Card />
      <Comments_Card />
      <Comments_Card />
      <Comments_Card />
      <Comments_Card />
      </div>
          </SheetDescription>
        </SheetHeader>  
      </SheetContent>
      
   
  )
}
