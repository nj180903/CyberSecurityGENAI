
import React from "react";
import { cn } from "@/lib/utils";

interface CyberCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  icon?: React.ReactNode;
  glowEffect?: boolean;
  children: React.ReactNode;
}

const CyberCard = ({
  title,
  icon,
  glowEffect = false,
  children,
  className,
  ...props
}: CyberCardProps) => {
  return (
    <div
      className={cn(
        "cyber-card p-6",
        glowEffect && "cyber-border-glow",
        className
      )}
      {...props}
    >
      {(title || icon) && (
        <div className="flex items-center mb-4 pb-4 border-b border-cyber-muted/20">
          {icon && <div className="mr-3 text-cyber">{icon}</div>}
          {title && (
            <h3 className="text-lg font-medium font-mono text-cyber-foreground">
              {title}
            </h3>
          )}
        </div>
      )}
      <div>{children}</div>
    </div>
  );
};

export default CyberCard;
