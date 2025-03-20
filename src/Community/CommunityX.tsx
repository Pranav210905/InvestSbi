
import { Toaster } from "../Community/components/ui/toaster";
import { Toaster as Sonner } from "../Community/components/ui/sonner";
import { TooltipProvider } from "../Community/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "../Community/hooks/useTheme";
const queryClient = new QueryClient();

const CommunityX = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system">
      <TooltipProvider>
        <Toaster />
        <Sonner />
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default CommunityX;
