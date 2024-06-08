import { useEffect, useState } from "react";
import BlogCard from "../Blog_ui/blog_card";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Combobox } from "../Blog_ui/comboBox";

// Define interface for a single blog entry
interface BlogEntry {
  id: number;
  title: string;
  content: string;
  published: boolean;
  authorid: string;
  category: string;
  createdAt: string;
}

export function DashBoard() {
  const navigator = useNavigate();
  const [card, setCard] = useState<BlogEntry[]>([]); // Define the correct type for card

  const [selectedCategory, setSelectedCategory] = useState<string>("");

  // Function to receive selected category from Combobox
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  
  };

  useEffect(() => {
    async function fetchCardData() {
      const res = (await axios.get("http://localhost:8787/api/v1/blog/bulk")).data.blogs;
      setCard(res);
 
    }
    fetchCardData();
  }, []);

  return (
    <div className="flex flex-row"  >
      <div className="w-[50%] ">
        <div className="flex  flex-col justify-end mt-10">
          {/* Filter the card array to show only the cards with the selected category */}
          {selectedCategory
            ? card
              .filter((e) => e.category.toLowerCase() === selectedCategory.toLowerCase())
               .slice()
                .reverse()
                .map((e: BlogEntry, index) => (
                  <BlogCard
                    key={index}
                    title={e.title}
                    content={e.content}
                    date={e.createdAt} // Assuming createdAt is the date property
                    category={e.category}
                    ClickEvent={() => navigator("/Post/" + e.id)}
                  />
                ))
            : card.slice()
            .reverse()
            .map((e: BlogEntry, index) => (
              <BlogCard
                key={index}
                title={e.title}
                content={e.content}
                date={e.createdAt} // Assuming createdAt is the date property
                category={e.category}
                ClickEvent={() => navigator("/Post/" + e.id)}
              />
            ))
            
                }
        </div>
      </div>
      <div className="w-[50%] border-l ">
        <div className="flex flex-col p-10">
          <label htmlFor="Category" className="text-sm font-extralight mb-2">
            Select Category
          </label>
          <Combobox sendDataToParent={handleCategorySelect} />
        </div>
      </div>
    </div>
  );
}
