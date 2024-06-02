import { useEffect, useState } from "react";
import BlogCard from "../Blog_ui/blog_card";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export function DashBoard()
{

    const navigator = useNavigate()

    const [card,setCard] = useState([{}]);

useEffect(()=>{

  async function fetchCardData(){
    const res = (await axios.get("http://localhost:8787/api/v1/blog/bulk")).data.blogs;
    setCard(res)
    console.log(card)
  }
  fetchCardData();
},[])
    return <div>
     
{card.map((e:any, index) => (
  <BlogCard
    key={index} 
    title={e.title} 
    content={e.content} 
    date={e.date} 
    ClickEvent={()=>navigator("/Post/"+e.id)}
    
  />
))}
{/* <CreateBlog /> */}
    </div>
}