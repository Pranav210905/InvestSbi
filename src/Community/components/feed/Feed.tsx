import { Post as PostComponent } from "./Post";
import { CreatePost } from "./CreatePost";
import { posts as mockPosts, investmentCategories } from "../../utils/mockData";
import { Button } from "../../components/ui/button";
import { useState, useEffect } from "react";
import { cn } from "../../lib/utils";
import { Post } from "../../utils/mockData";
import { useTheme } from "../../../contexts/ThemeContext";

export function Feed() {
  const [activeFilter, setActiveFilter] = useState<string>("For you");
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const { theme } = useTheme();
  
  // Function to load posts from localStorage and merge with mock posts
  const loadPosts = () => {
    const storedPosts = localStorage.getItem("userPosts");
    const userPosts = storedPosts ? JSON.parse(storedPosts) : [];
    
    // Combine user posts and mock posts
    setAllPosts([...userPosts, ...mockPosts]);
  };
  
  useEffect(() => {
    // Load posts on initial component mount
    loadPosts();
    
    // Add event listener for new posts
    const handleNewPost = () => {
      loadPosts();
    };
    
    window.addEventListener("newPostAdded", handleNewPost);
    
    // Clean up event listener
    return () => {
      window.removeEventListener("newPostAdded", handleNewPost);
    };
  }, []);

  return (
    <div className={`border-b animate-fade-in ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <div className={`border-b sticky top-0 ${theme === 'dark' ? 'bg-gray-800' : 'bg-background/80'} backdrop-blur-md z-10`}>
        <h1 className="text-xl font-bold p-4 sm:p-6">Home</h1>
        
        <div className="flex border-b">
          <button
            onClick={() => setActiveFilter("For you")}
            className={cn(
              "flex-1 py-4 text-sm font-medium hover:bg-muted/30 transition-all",
              activeFilter === "For you" ? "border-b-2 border-primary" : ""
            )}
          >
            For you
          </button>
          <button
            onClick={() => setActiveFilter("Following")}
            className={cn(
              "flex-1 py-4 text-sm font-medium hover:bg-muted/30 transition-all",
              activeFilter === "Following" ? "border-b-2 border-primary" : ""
            )}
          >
            Following
          </button>
        </div>
        
        <div className="p-3 overflow-x-auto scrollbar-hide">
          <div className="flex gap-2 min-w-max">
            <Button 
              variant="secondary" 
              className="rounded-full text-xs py-1 px-3 h-auto"
            >
              All
            </Button>
            {investmentCategories.map((category, index) => (
              <Button 
                key={index}
                variant="outline"
                className="rounded-full text-xs py-1 px-3 h-auto"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </div>
      
      <CreatePost />
      
      <div className="divide-y">
        {allPosts.map((post) => (
          <PostComponent key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}