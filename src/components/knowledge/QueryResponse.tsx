
import React from "react";
import { RefreshCw } from "lucide-react";
import CyberCard from "@/components/CyberCard";

interface ResponseSection {
  title: string;
  content: string;
}

interface QueryResponseProps {
  response: ResponseSection[] | null;
  isLoading: boolean;
}

const QueryResponse = ({ response, isLoading }: QueryResponseProps) => {
  if (isLoading) {
    return (
      <div className="cyber-card p-6 text-center">
        <RefreshCw className="h-10 w-10 text-cyber mx-auto animate-spin mb-4" />
        <p className="text-cyber-foreground text-lg">
          Analyzing cybersecurity sources...
        </p>
        <p className="text-gray-400 mt-2">
          Fetching the latest information for your query.
        </p>
      </div>
    );
  }

  if (!response) {
    return null;
  }

  return (
    <CyberCard 
      className="transition-all duration-300"
      glowEffect={true}
    >
      <h2 className="text-xl font-bold font-mono mb-6 text-cyber">
        Knowledge Response
      </h2>
      
      <div className="space-y-6">
        {response.map((section, index) => (
          <div key={index} className="border-l-2 border-cyber pl-4">
            <h3 className="text-lg font-mono font-medium mb-2 text-cyber-foreground">
              {section.title}
            </h3>
            <p className="text-gray-300 whitespace-pre-line">
              {section.content}
            </p>
          </div>
        ))}
      </div>
    </CyberCard>
  );
};

export default QueryResponse;
