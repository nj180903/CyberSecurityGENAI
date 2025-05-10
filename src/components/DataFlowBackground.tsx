
import React, { useEffect, useRef } from "react";

interface DataFlowBackgroundProps {
  density?: number;
  className?: string;
}

const DataFlowBackground: React.FC<DataFlowBackgroundProps> = ({
  density = 10,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const width = container.offsetWidth;
    
    // Clear any existing lines
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    
    linesRef.current = [];
    
    // Create new data flow lines
    for (let i = 0; i < density; i++) {
      const line = document.createElement("div");
      line.className = "data-flow-line";
      
      // Random positioning
      line.style.left = `${Math.random() * width}px`;
      line.style.animationDelay = `${Math.random() * 5}s`;
      line.style.height = `${20 + Math.random() * 60}px`;
      line.style.opacity = "0";
      
      container.appendChild(line);
      linesRef.current.push(line);
    }
    
    return () => {
      // Cleanup on unmount
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, [density]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
};

export default DataFlowBackground;
