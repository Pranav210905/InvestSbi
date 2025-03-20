
import { Layout } from "../../Community/components/layout/Layout";
import { Card } from "../../Community/components/ui/card";
import { Input } from "../../Community/components/ui/input";
import { Search, TrendingUp, Twitter } from "lucide-react";
import { Post } from "../../Community/components/feed/Post";
import { posts, trendingTopics } from "../utils/mockData";
import { Button } from "../../Community/components/ui/button";
import { useState, useEffect } from "react";
import { cn } from "../lib/utils";
import { fetchTwitterTrends } from "../services/twitterService";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "../../Community/components/ui/skeleton";

interface TwitterTrend {
  name: string;
  url: string;
  tweet_volume: number | null;
}

export default function ExploreX() {
  const [activeTab, setActiveTab] = useState<string>("Trending");
  
  const { data: twitterTrends, isLoading: isLoadingTrends } = useQuery({
    queryKey: ['twitterTrends'],
    queryFn: fetchTwitterTrends,
    staleTime: 1000 * 60 * 15, // 15 minutes
  });

  return (
    <Layout>
      <div className="animate-fade-in">
        <div className="sticky top-0 bg-background/80 backdrop-blur-md z-10 p-4 sm:p-6 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              placeholder="Search for stocks, people, or topics"
              className="pl-10 rounded-full"
            />
          </div>
          
          <div className="mt-4 flex gap-2 overflow-x-auto scrollbar-hide py-1">
            {["Trending", "Twitter Trends", "Stocks", "Crypto", "Real Estate", "ETFs", "Commodities", "People"].map((tab) => (
              <Button
                key={tab}
                variant={activeTab === tab ? "default" : "outline"}
                className="rounded-full whitespace-nowrap"
                onClick={() => setActiveTab(tab)}
              >
                {tab === "Twitter Trends" && <Twitter className="h-4 w-4 mr-1" />}
                {tab}
              </Button>
            ))}
          </div>
        </div>

        {activeTab === "Twitter Trends" && (
          <div className="p-4 sm:p-6 border-b">
            <div className="flex items-center gap-2 mb-4">
              <Twitter className="h-5 w-5 text-[#1DA1F2]" />
              <h2 className="text-xl font-bold">Twitter Trends</h2>
            </div>
            
            {isLoadingTrends ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Card key={i} className="p-4">
                    <Skeleton className="h-4 w-1/3 mb-2" />
                    <Skeleton className="h-6 w-2/3 mb-2" />
                    <Skeleton className="h-4 w-1/4" />
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(twitterTrends || []).slice(0, 10).map((trend, index) => (
                  <Card 
                    key={index} 
                    className="p-4 hover-scale cursor-pointer border"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-xs text-muted-foreground">
                          Trending on Twitter
                        </span>
                        <h3 className="font-medium text-lg mt-1">
                          {trend.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {trend.tweet_volume ? `${trend.tweet_volume.toLocaleString()} tweets` : 'Trending now'}
                        </p>
                      </div>
                      <div className="text-[#1DA1F2]">
                        <Twitter className="h-5 w-5" />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "Trending" && (
          <>
            <div className="p-4 sm:p-6 border-b">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-bold">Trending now</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {trendingTopics.slice(0, 4).map((topic) => (
                  <Card 
                    key={topic.id} 
                    className="p-4 hover-scale cursor-pointer border"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-xs text-muted-foreground">
                          Trending in Finance
                        </span>
                        <h3 className="font-medium text-lg mt-1">
                          #{topic.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {topic.posts.toLocaleString()} posts
                        </p>
                      </div>
                      <div className={cn(
                        "text-sm font-medium",
                        topic.sentiment === 'bullish' ? "text-positive" :
                        topic.sentiment === 'bearish' ? "text-negative" : "text-neutral"
                      )}>
                        {topic.sentiment}
                        {topic.change && (
                          <span> {topic.change > 0 ? "+" : ""}{topic.change}%</span>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
            
            <div className="p-4 sm:p-6 border-b">
              <h2 className="text-xl font-bold mb-4">Top Posts</h2>
              
              <div className="space-y-4">
                {posts.slice(0, 3).map((post) => (
                  <Card key={post.id} className="overflow-hidden">
                    <Post post={post} />
                  </Card>
                ))}
              </div>
            </div>
          </>
        )}
        
        {activeTab !== "Trending" && activeTab !== "Twitter Trends" && (
          <div className="p-4 sm:p-6">
            <h2 className="text-xl font-bold mb-4">{activeTab}</h2>
            <p className="text-muted-foreground">
              Showing top results for {activeTab.toLowerCase()}
            </p>
            
            <div className="mt-4 space-y-4">
              {posts.slice(0, 5).map((post) => (
                <Card key={post.id} className="overflow-hidden">
                  <Post post={post} />
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
