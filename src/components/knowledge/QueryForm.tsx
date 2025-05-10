
import React, { useState } from "react";
import { Send, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import CyberCard from "@/components/CyberCard";
import { Search } from "lucide-react";

interface QueryFormProps {
  onSubmit: (query: string) => void;
  isLoading: boolean;
  isBackendAvailable: boolean | null;
}

const QueryForm = ({ onSubmit, isLoading, isBackendAvailable }: QueryFormProps) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSubmit(query.trim());
    }
  };

  return (
    <CyberCard 
      className="mb-6" 
      title="Ask a Question" 
      icon={<Search />}
      glowEffect={true}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Textarea
          placeholder="Enter your cybersecurity question (e.g., 'What are the latest vulnerabilities in Windows 11?')"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          rows={3}
          className="resize-none border-cyber-muted/30 bg-cyber-dark/50 focus:border-cyber"
        />
        <div className="flex justify-end">
          <Button 
            type="submit" 
            disabled={isLoading || !query.trim() || isBackendAvailable === false} 
            className="cyber-gradient"
          >
            {isLoading ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
            {isLoading ? "Processing..." : "Send Query"}
          </Button>
        </div>
      </form>
    </CyberCard>
  );
};

export default QueryForm;
