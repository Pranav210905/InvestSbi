import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { Textarea } from "../../components/ui/textarea";
import { BarChart2, Image, MessageSquare, SmilePlus, Tag } from "lucide-react";
import { users, Post } from "../../utils/mockData";
import { toast } from "sonner";
import { v4 as uuidv4 } from 'uuid';
import { useTheme } from "../../../contexts/ThemeContext";

export function CreatePost() {
  const [content, setContent] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const currentUser = users[0]; // Using first mock user for demonstration
  const { theme } = useTheme();

  const handleFocus = () => {
    setIsExpanded(true);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handlePost = () => {
    if (!content.trim()) return;
    
    // Create new post object
    const newPost: Post = {
      id: uuidv4(),
      content: content.trim(),
      user: currentUser,
      timestamp: "Just now",
      likes: 0,
      comments: 0,
      reposts: 0,
      isLiked: false,
      isReposted: false,
      sentiment: "neutral"
    };

    // Get existing posts from localStorage
    const storedPosts = localStorage.getItem("userPosts");
    const userPosts = storedPosts ? JSON.parse(storedPosts) : [];
    
    // Add new post to the beginning of the array
    const updatedPosts = [newPost, ...userPosts];
    
    // Save to localStorage
    localStorage.setItem("userPosts", JSON.stringify(updatedPosts));
    
    // Trigger a custom event to notify Feed component about the new post
    window.dispatchEvent(new CustomEvent("newPostAdded"));
    
    toast.success("Post published successfully!");
    setContent("");
    setIsExpanded(false);
  };

  return (
    <Card className={`border-b rounded-none border-t-0 border-x-0 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
      <div className="p-4 sm:p-6">
        <div className="flex gap-3">
          <Avatar className="h-10 w-10 md:h-12 md:w-12">
            <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
            <AvatarFallback>{currentUser.name[0]}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <Textarea
              placeholder="Share your investment insights..."
              className={`border-0 p-0 resize-none text-base placeholder:text-muted-foreground focus-visible:ring-0 bg-transparent ${theme === 'dark' ? 'text-white' : 'text-black'}`}
              value={content}
              onChange={handleContentChange}
              onFocus={handleFocus}
              rows={isExpanded ? 4 : 1}
            />
            
            {isExpanded && (
              <>
                <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground mt-2">
                  <span className="bg-primary/10 text-primary px-2 py-1 rounded-full">
                    Everyone can reply
                  </span>
                </div>
                
                <div className="flex justify-between mt-4 pt-3 border-t">
                  <div className="flex gap-1">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="rounded-full text-primary h-9 w-9"
                    >
                      <Image className="h-5 w-5" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="rounded-full text-primary h-9 w-9"
                    >
                      <BarChart2 className="h-5 w-5" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="rounded-full text-primary h-9 w-9"
                    >
                      <SmilePlus className="h-5 w-5" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="rounded-full text-primary h-9 w-9"
                    >
                      <Tag className="h-5 w-5" />
                    </Button>
                  </div>
                  
                  <Button 
                    className="rounded-full"
                    disabled={!content.trim()}
                    onClick={handlePost}
                  >
                    Post
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}