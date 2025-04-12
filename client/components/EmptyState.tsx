import React from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description: string;
  buttonText: string;
  icon?: React.ReactNode;
  onClick: () => void;
}

const EmptyState = ({
  title,
  description,
  buttonText,
  icon,
  onClick,
}: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 rounded-lg border border-dashed border-[hsl(var(--border))] bg-[hsl(var(--muted))]/40 animate-scale-in transition-all duration-300 hover:shadow-lg hover:bg-[hsl(var(--muted))]/60">
      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4 transition-all duration-500 hover:scale-110 group">
        {icon || (
          <PlusCircle className="h-8 w-8 text-[hsl(var(--muted-foreground))] group-hover:text-primary transition-colors duration-300" />
        )}
      </div>
      <h3 className="text-xl font-medium mb-2 animate-fade-in">{title}</h3>
      <p
        className="text-[hsl(var(--muted-foreground))] mb-6 max-w-md animate-fade-in"
        style={{ animationDelay: "0.1s" }}
      >
        {description}
      </p>
      <Button
        onClick={onClick}
        className="animate-fade-in group"
        style={{ animationDelay: "0.2s" }}
      >
        <PlusCircle className="h-4 w-4 mr-1.5 group-hover:animate-pulse" />
        {buttonText}
      </Button>
    </div>
  );
};

export default EmptyState;
