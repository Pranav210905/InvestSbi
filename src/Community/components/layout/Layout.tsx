import { Sidebar } from "./Sidebar";
import { TrendingPanel } from "./TrendingPanel";
import { useTheme } from "../../../contexts/ThemeContext";
import { cn } from "../../lib/utils";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen flex w-full ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <Sidebar />
      <main className="flex-1 min-h-screen border-l border-r border-border">
        <div className="max-w-screen-xl mx-auto">
          {children}
        </div>
      </main>
      <TrendingPanel />
    </div>
  );
}