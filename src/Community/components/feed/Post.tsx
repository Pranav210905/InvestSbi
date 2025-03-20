import { Post as PostType } from "../../utils/mockData";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Card } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { 
  ChevronUp, 
  ChevronDown, 
  Heart, 
  MessageSquare, 
  BarChart2, 
  Share2, 
  Check, 
  MoreHorizontal 
} from "lucide-react";
import { cn } from "../../lib/utils";
import { useState } from "react";
import { Button } from "../../components/ui/button";
import { useTheme } from "../../../contexts/ThemeContext";

interface PostProps {
  post: PostType;
  isDetailed?: boolean;
}

export function Post({ post, isDetailed = false }: PostProps) {
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [isReposted, setIsReposted] = useState(post.isReposted);
  const [repostCount, setRepostCount] = useState(post.reposts);
  const { theme } = useTheme();

  const handleLike = () => {
    if (isLiked) {
      setLikeCount(prev => prev - 1);
    } else {
      setLikeCount(prev => prev + 1);
    }
    setIsLiked(!isLiked);
  };

  const handleRepost = () => {
    if (isReposted) {
      setRepostCount(prev => prev - 1);
    } else {
      setRepostCount(prev => prev + 1);
    }
    setIsReposted(!isReposted);
  };

  // Function to format ticker symbols in the content
  const formatContent = (content: string) => {
    if (!post.tickers || post.tickers.length === 0) return content;
    
    let formattedContent = content;
    post.tickers.forEach(ticker => {
      formattedContent = formattedContent.replace(
        `$${ticker}`,
        `<span class="text-primary font-semibold">$${ticker}</span>`
      );
    });
    
    return formattedContent;
  };

  return (
    <Card 
      className={cn(
        "border-b rounded-none border-t-0 border-x-0 hover:bg-muted/30 transition-colors duration-200",
        isDetailed && "hover:bg-transparent",
        theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'
      )}
    >
      <div className="p-4 sm:p-6">
        <div className="flex gap-3">
          <div>
            <Avatar className="h-10 w-10 md:h-12 md:w-12">
              <AvatarImage src={post.user.avatar} alt={post.user.name} />
              <AvatarFallback>{post.user.name[0]}</AvatarFallback>
            </Avatar>
          </div>
          
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-1.5 flex-wrap">
                <h3 className="font-medium text-base hover:underline cursor-pointer">
                  {post.user.name}
                </h3>
                {post.user.verified && (
                  <Check className="h-4 w-4 text-primary bg-primary/10 rounded-full p-[2px]" />
                )}
                <span className="text-muted-foreground text-sm">@{post.user.username}</span>
                <span className="text-muted-foreground text-sm">·</span>
                <span className="text-muted-foreground text-sm">{post.timestamp}</span>
                
                {post.sentiment && (
                  <Badge 
                    variant={
                      post.sentiment === 'bullish' 
                        ? 'outline'
                        : post.sentiment === 'bearish'
                          ? 'destructive'
                          : 'secondary'
                    }
                    className={cn(
                      "ml-1",
                      post.sentiment === 'bullish' ? "border-positive text-positive" :
                      post.sentiment === 'bearish' ? "" : "text-neutral"
                    )}
                  >
                    {post.sentiment === 'bullish' && (
                      <ChevronUp className="h-3.5 w-3.5 mr-1" />
                    )}
                    {post.sentiment === 'bearish' && (
                      <ChevronDown className="h-3.5 w-3.5 mr-1" />
                    )}
                    {post.sentiment}
                  </Badge>
                )}
              </div>
              
              <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 text-muted-foreground">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="mt-2">
              <div 
                className="text-balance"
                dangerouslySetInnerHTML={{ __html: formatContent(post.content) }} 
              />
            </div>
            
            {post.image && (
              <div className="mt-3 rounded-xl overflow-hidden">
                <img 
                  src={post.image} 
                  alt="Post attachment" 
                  className="w-full h-auto max-h-[350px] object-cover"
                />
              </div>
            )}
            
            {post.poll && (
              <div className="mt-4 space-y-2">
                {post.poll.options.map((option, index) => {
                  const percentage = Math.round((option.votes / post.poll!.totalVotes) * 100);
                  return (
                    <div key={index} className="relative">
                      <div 
                        className="bg-primary/10 rounded-full h-10 absolute top-0 left-0"
                        style={{ width: `${percentage}%` }}
                      />
                      <div className="relative flex items-center justify-between h-10 px-4 rounded-full border">
                        <span className="font-medium">{option.text}</span>
                        <span className="text-sm">{percentage}%</span>
                      </div>
                    </div>
                  );
                })}
                <p className="text-sm text-muted-foreground mt-2">
                  {post.poll.totalVotes.toLocaleString()} votes · Ends {post.poll.endsAt}
                </p>
              </div>
            )}
            
            <div className="flex justify-between mt-4">
              <Button 
                variant="ghost" 
                size="sm" 
                className="rounded-full text-muted-foreground hover:text-foreground hover:bg-primary/10 gap-2 p-2"
              >
                <MessageSquare className="h-5 w-5" />
                <span>{post.comments}</span>
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className={cn(
                  "rounded-full gap-2 p-2",
                  isReposted 
                    ? "text-positive hover:text-positive hover:bg-positive/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-primary/10"
                )}
                onClick={handleRepost}
              >
                <BarChart2 className="h-5 w-5" />
                <span>{repostCount}</span>
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className={cn(
                  "rounded-full gap-2 p-2",
                  isLiked 
                    ? "text-negative hover:text-negative hover:bg-negative/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-primary/10"
                )}
                onClick={handleLike}
              >
                <Heart className={cn("h-5 w-5", isLiked && "fill-current")} />
                <span>{likeCount}</span>
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="rounded-full text-muted-foreground hover:text-foreground hover:bg-primary/10 p-2"
              >
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}