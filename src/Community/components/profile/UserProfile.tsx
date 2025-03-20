import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Badge } from "../../components/ui/badge";
import { Calendar, LinkIcon, MapPin } from "lucide-react";
import { User } from "../../utils/mockData";
import { cn } from "../../lib/utils";
import { useTheme } from "../../../contexts/ThemeContext"; // Import useTheme hook

interface UserProfileProps {
  user: User;
}

export function UserProfile({ user }: UserProfileProps) {
  const { theme } = useTheme(); // Use the useTheme hook to get the current theme

  const getInvestorBadge = (type: User['investorType']) => {
    switch (type) {
      case 'beginner':
        return { label: 'Beginner Investor', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' };
      case 'intermediate':
        return { label: 'Intermediate Investor', color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' };
      case 'expert':
        return { label: 'Expert Investor', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300' };
      case 'verified':
        return { label: 'Verified Financial Advisor', color: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300' };
      default:
        return { label: 'Investor', color: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300' };
    }
  };

  const badge = getInvestorBadge(user.investorType);

  return (
    <div className={`animate-fade-in ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}> {/* Apply conditional styling based on theme */}
      <div className="h-40 bg-gradient-to-r from-blue-500 to-cyan-400 relative">
        <div className="absolute -bottom-16 left-6">
          <Avatar className="h-32 w-32 border-4 border-background">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name[0]}</AvatarFallback>
          </Avatar>
        </div>
      </div>
      
      <div className="mt-20 px-6">
        <div className="flex justify-end mb-4">
          <Button variant="outline" className="rounded-full">
            Edit profile
          </Button>
        </div>
        
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">{user.name}</h1>
            {user.verified && (
              <span className="bg-primary text-white p-1 rounded-full">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" 
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            )}
          </div>
          <p className="text-muted-foreground">@{user.username}</p>
          
          <div className="mt-3">
            <span className={cn("inline-block px-3 py-1 rounded-full text-xs", badge.color)}>
              {badge.label}
            </span>
            <p className="mt-3">{user.bio}</p>
          </div>
          
          <div className="flex gap-4 mt-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>New York, USA</span>
            </div>
            <div className="flex items-center gap-1">
              <LinkIcon className="h-4 w-4" />
              <a href="#" className="text-primary hover:underline">investment-insights.com</a>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>Joined {user.joined}</span>
            </div>
          </div>
          
          <div className="flex gap-5 mt-4">
            <div>
              <span className="font-bold">{user.following.toLocaleString()}</span>
              <span className="text-muted-foreground ml-1">Following</span>
            </div>
            <div>
              <span className="font-bold">{user.followers.toLocaleString()}</span>
              <span className="text-muted-foreground ml-1">Followers</span>
            </div>
          </div>
          
          <div className="mt-6 border-b">
            <div className="flex">
              <button className="flex-1 py-4 text-sm font-medium hover:bg-muted/30 border-b-2 border-primary">
                Posts
              </button>
              <button className="flex-1 py-4 text-sm font-medium hover:bg-muted/30">
                Replies
              </button>
              <button className="flex-1 py-4 text-sm font-medium hover:bg-muted/30">
                Media
              </button>
              <button className="flex-1 py-4 text-sm font-medium hover:bg-muted/30">
                Likes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}