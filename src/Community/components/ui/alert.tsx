import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";
import { useTheme } from "../../../contexts/ThemeContext"; // Import useTheme hook

const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive:
          "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => {
  const { theme } = useTheme(); // Use the useTheme hook to get the current theme

  return (
    <div
      ref={ref}
      role="alert"
      className={cn(
        alertVariants({ variant }),
        theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black', // Apply conditional styling based on theme
        className
      )}
      {...props}
    />
  );
});
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => {
  const { theme } = useTheme(); // Use the useTheme hook to get the current theme

  return (
    <h5
      ref={ref}
      className={cn(
        "mb-1 font-medium leading-none tracking-tight",
        theme === 'dark' ? 'text-white' : 'text-black', // Apply conditional styling based on theme
        className
      )}
      {...props}
    />
  );
});
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { theme } = useTheme(); // Use the useTheme hook to get the current theme

  return (
    <div
      ref={ref}
      className={cn(
        "text-sm [&_p]:leading-relaxed",
        theme === 'dark' ? 'text-gray-300' : 'text-gray-700', // Apply conditional styling based on theme
        className
      )}
      {...props}
    />
  );
});
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };