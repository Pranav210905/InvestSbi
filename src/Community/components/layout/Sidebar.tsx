import { cn } from "../../lib/utils";
import { useTheme } from "../../../contexts/ThemeContext";
import { Link, useLocation } from "react-router-dom";
import { ThemeToggle } from "../../components/ui/ThemeToggle";
import {
  BarChart2,
  Bell,
  BookOpen,
  DollarSign,
  Home,
  MessageSquare,
  Search,
  Settings,
  TrendingUp,
  User,
  Users,
} from "lucide-react";
import { Button } from "../../components/ui/button";

const navigation = [
  { name: "HomeX", href: "/homex", icon: Home },
  { name: "Explore", href: "/explore", icon: Search },
  { name: "Notifications", href: "/notifications", icon: Bell },
  { name: "Messages", href: "/messages", icon: MessageSquare },
  { name: "Portfolio", href: "/portfolio", icon: DollarSign },
  { name: "Analysis", href: "/analysis", icon: BarChart2 },
  { name: "Market Trends", href: "/trends", icon: TrendingUp },
  { name: "Communities", href: "/communities", icon: Users },
  { name: "Learning", href: "/learning", icon: BookOpen },
  { name: "Profile", href: "/profilex", icon: User },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const location = useLocation();
  const { theme } = useTheme();

  return (
    <div
      className={cn(
        "h-screen sticky top-0 w-[70px] md:w-[280px] flex flex-col z-10 border-r border-border",
        "transition-all duration-300 ease-in-out",
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
      )}
    >
      <div className="px-4 md:px-6 py-5 flex items-center">
        {/* Add your logo or brand name here */}
      </div>

      <div className="mt-6 flex flex-col flex-1 gap-2 px-2 md:px-4">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-100 group",
                "hover:bg-muted/30 hover:text-foreground",
                isActive
                  ? "bg-primary text-primary-foreground font-medium"
                  : "text-muted-foreground"
              )}
            >
              <item.icon
                className={cn(
                  "h-5 w-5 shrink-0",
                  isActive
                    ? "text-primary animate-pulse-gentle"
                    : "text-muted-foreground group-hover:text-foreground"
                )}
              />
              <span className="hidden md:block">{item.name}</span>
            </Link>
          );
        })}
      </div>

      <div className="px-4 md:px-6 py-5 mt-auto flex flex-col md:flex-row items-center justify-between">
        <ThemeToggle />
        <Button
          className="mt-3 md:mt-0 w-full hidden md:block"
          size="sm"
        >
          New Post
        </Button>
      </div>
    </div>
  );
}