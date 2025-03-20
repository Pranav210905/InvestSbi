import * as React from "react";
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio";
import { useTheme } from "../../../contexts/ThemeContext"; // Import useTheme hook
import { cn } from "../../lib/utils";

const AspectRatio = React.forwardRef<
  React.ElementRef<typeof AspectRatioPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AspectRatioPrimitive.Root>
>(({ className, ...props }, ref) => {
  const { theme } = useTheme(); // Use the useTheme hook to get the current theme

  return (
    <AspectRatioPrimitive.Root
      ref={ref}
      className={cn(
        theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black', // Apply conditional styling based on theme
        className
      )}
      {...props}
    />
  );
});
AspectRatio.displayName = AspectRatioPrimitive.Root.displayName;

export { AspectRatio };