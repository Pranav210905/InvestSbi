import { Badge } from "../../components/ui/badge";
import { Card } from "../../components/ui/card";
import { marketData, trendingTopics } from "../../utils/mockData";
import { ChevronUp, ChevronDown, Hash, TrendingUp, BarChart2 } from "lucide-react";
import { useState } from "react";
import { cn } from "../../lib/utils";
import { useTheme } from "../../../contexts/ThemeContext";

export function TrendingPanel() {
  const [view, setView] = useState<'trends' | 'markets'>('trends');
  const { theme } = useTheme(); // Use the useTheme hook to get the current theme

  return (
    <div className={`h-screen sticky top-0 w-full lg:w-[350px] hidden md:flex flex-col gap-4 pl-4 py-4 overflow-y-auto scrollbar-hide ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <Card className={`w-full overflow-hidden bg-card/80 backdrop-blur-sm border transition-all duration-300 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="flex border-b">
          <button
            onClick={() => setView('trends')}
            className={cn(
              "flex-1 py-3 text-sm font-medium transition-all duration-200 hover:bg-accent/30",
              view === 'trends' ? "border-b-2 border-primary" : ""
            )}
          >
            Trending Topics
          </button>
          <button
            onClick={() => setView('markets')}
            className={cn(
              "flex-1 py-3 text-sm font-medium transition-all duration-200 hover:bg-accent/30",
              view === 'markets' ? "border-b-2 border-primary" : ""
            )}
          >
            Market Data
          </button>
        </div>

        <div className="p-4">
          {view === 'trends' ? (
            <div className="space-y-4 animate-fade-in">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">What's trending</h3>
              </div>
              {trendingTopics.map((topic) => (
                <div 
                  key={topic.id} 
                  className="group hover-scale cursor-pointer pb-3 border-b last:border-0 border-border/40"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-1">
                        <Hash className="h-3.5 w-3.5 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          Trending in Finance
                        </span>
                      </div>
                      <h4 className="font-medium mt-1 group-hover:text-primary transition-colors">
                        {topic.name}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        {topic.posts.toLocaleString()} posts
                      </p>
                    </div>
                    <Badge 
                      variant={
                        topic.sentiment === 'bullish' 
                          ? 'outline'
                          : topic.sentiment === 'bearish'
                            ? 'destructive'
                            : 'secondary'
                      }
                      className={cn(
                        "ml-2",
                        topic.sentiment === 'bullish' ? "border-positive text-positive" :
                        topic.sentiment === 'bearish' ? "" : "text-neutral"
                      )}
                    >
                      {topic.sentiment === 'bullish' && (
                        <ChevronUp className="h-3.5 w-3.5 mr-1" />
                      )}
                      {topic.sentiment === 'bearish' && (
                        <ChevronDown className="h-3.5 w-3.5 mr-1" />
                      )}
                      {topic.sentiment}
                      {topic.change && ` ${Math.abs(topic.change)}%`}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4 animate-fade-in">
              <div className="flex items-center gap-2 mb-4">
                <BarChart2 className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">Market Indexes</h3>
              </div>
              {marketData.map((market, i) => (
                <div 
                  key={i} 
                  className="group hover-scale cursor-pointer pb-3 border-b last:border-0 border-border/40"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium group-hover:text-primary transition-colors">
                        {market.index}
                      </h4>
                      <p className="text-lg font-semibold mt-1">
                        {market.price.toLocaleString()}
                      </p>
                    </div>
                    <div className={cn(
                      "flex items-center gap-1 text-sm font-medium",
                      market.changePercent > 0 ? "text-positive" : 
                      market.changePercent < 0 ? "text-negative" : "text-neutral"
                    )}>
                      {market.changePercent > 0 ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : market.changePercent < 0 ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : null}
                      <span>
                        {market.changePercent > 0 ? "+" : ""}
                        {market.changePercent.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>

      <Card className={`w-full overflow-hidden bg-card/80 backdrop-blur-sm border ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="p-4">
          <h3 className="font-semibold mb-4">Who to follow</h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full overflow-hidden">
                  <img 
                    src="https://i.pravatar.cc/150?img=4" 
                    alt="Avatar" 
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium text-sm">Emma Wilson</h4>
                  <p className="text-xs text-muted-foreground">@emmafinance</p>
                </div>
              </div>
              <Button size="sm" variant="outline">Follow</Button>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full overflow-hidden">
                  <img 
                    src="https://i.pravatar.cc/150?img=7" 
                    alt="Avatar" 
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium text-sm">Robert Chen</h4>
                  <p className="text-xs text-muted-foreground">@robinvestments</p>
                </div>
              </div>
              <Button size="sm" variant="outline">Follow</Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

function Button({ 
  children, 
  size = "default", 
  variant = "default", 
  className = ""
}: { 
  children: React.ReactNode; 
  size?: "default" | "sm" | "lg"; 
  variant?: "default" | "outline" | "ghost"; 
  className?: string;
}) {
  return (
    <button 
      className={cn(
        "inline-flex items-center justify-center rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
        size === "default" && "h-10 px-4 py-2",
        size === "sm" && "h-8 px-3 py-1 text-xs",
        size === "lg" && "h-12 px-6 py-3",
        variant === "default" && "bg-primary text-primary-foreground hover:bg-primary/90",
        variant === "outline" && "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        variant === "ghost" && "hover:bg-accent hover:text-accent-foreground",
        className
      )}
    >
      {children}
    </button>
  );
}