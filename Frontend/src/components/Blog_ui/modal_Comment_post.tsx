import { Button } from "@/components/ui/button";
import {
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Card, CardDescription, CardFooter, CardHeader } from "../ui/card";
import { Textarea } from "../ui/textarea";
import Comments_Card from "./comments_card";
import { useEffect, useState } from "react";
import axios from "axios";
import { AlertS } from "./alert_modal";

interface Comment {
  id: string;
  content: string;
  createdAt: string;
  authorId: string;
}

interface CommentPostProps {
  PostId: string | undefined;
}

export function Comment_Post({ PostId }: CommentPostProps) {
  const [newComment, setNewComment] = useState<string>("");
  const Domain = import.meta.env.VITE_DOMAIN;
  const [comments, setComments] = useState<Comment[]>([]);

  async function handleUploadComment() {
    try {
      const res = await axios.post(`${Domain}/api/v1/blog/postComment/${PostId}`, {
        authorId: "c4ea7b6f-2310-440f-a9de-a83269019a68",
        content: newComment,
      });

      AlertS({ title: 'Success', description: 'Comment is Uploaded Successfully', label: 'Close' });

      // Update the comments list after posting a new comment
      setComments((prevComments) => [
        ...prevComments,
        { id: res.data.data.id, content: newComment, authorId: "c4ea7b6f-2310-440f-a9de-a83269019a68", createdAt: new Date().toISOString() }
      ]);

      // Clear the new comment input
      setNewComment("");
    } catch (e) {
      AlertS({ title: 'Error', description: 'Try Again, Comment is not Uploaded', label: 'Close' });
    }
  }

  useEffect(() => {
    async function fetchComments() {
      try {
        const res = await axios.get(`${Domain}/api/v1/blog/getComments/${PostId}`);
        setComments(res.data.data);
      } catch (e) {
        console.error("Error fetching comments:", e);
      }
    }

    fetchComments();
  }, [Domain, PostId]);

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle className="text-2xl">Responses ({comments.length})</SheetTitle>
        <SheetDescription>
          <Card className="ml-0 p-0 hover:shadow-sm">
            <CardHeader className="flex flex-row space-x-4 items-center">
              <img
                src="https://picsum.photos/seed/picsum/200/300"
                alt=""
                className="rounded-full w-10 h-10"
              />
              <span className="text-sm font-light"> Navneet Sharma</span>
            </CardHeader>
            <CardDescription>
              <Textarea
                className="ml-4"
                placeholder="What are your thoughts"
                value={newComment}
                onChange={e => setNewComment(e.target.value)}
              />
            </CardDescription>
            <CardFooter className="flex justify-start px-2 items-center">
              <Button
                className="px-4 m-2 bg-green-700 hover:bg-green-600 rounded-3xl text-white text-sm"
                onClick={handleUploadComment}
              >
                Save
              </Button>
              <SheetClose asChild>
                <Button variant={"ghost"} className="rounded-3xl">
                  Cancel
                </Button>
              </SheetClose>
            </CardFooter>
          </Card>
          <div className="flex flex-col space-y-4 overflow-y-scroll h-[500px] w-[360px]">
          {comments.slice().reverse().map((c: Comment) => (
    <Comments_Card key={c.id} {...c} />
))}

          </div>
        </SheetDescription>
      </SheetHeader>
    </SheetContent>
  );
}

export default Comment_Post;
