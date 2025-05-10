
import { useState, useEffect } from "react";
import { toast } from "@/components/ui/sonner";

interface QueryHistoryItem {
  id: string;
  query: string;
  timestamp: Date;
}

interface ResponseSection {
  title: string;
  content: string;
}

export const useKnowledgeAgent = () => {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<ResponseSection[] | null>(null);
  const [queryHistory, setQueryHistory] = useState<QueryHistoryItem[]>([]);
  const [isBackendAvailable, setIsBackendAvailable] = useState<boolean | null>(null);

  // Check if backend is available on component mount
  useEffect(() => {
    checkBackendStatus();
  }, []);

  const checkBackendStatus = async () => {
    try {
      const response = await fetch('/api/status');
      const data = await response.json();
      setIsBackendAvailable(data.available);
    } catch (error) {
      console.error("Error checking backend status:", error);
      setIsBackendAvailable(false);
    }
  };

  const handleSubmit = async (userQuery: string) => {
    if (!userQuery.trim()) return;
    
    if (isBackendAvailable === false) {
      toast.error("Backend service is unavailable. Please try again later.");
      return;
    }

    // Set the query
    setQuery(userQuery);

    // Add to history
    const newQueryItem = {
      id: Date.now().toString(),
      query: userQuery.trim(),
      timestamp: new Date(),
    };
    
    setQueryHistory([newQueryItem, ...queryHistory]);
    setIsLoading(true);
    setResponse(null);

    // Make request to backend API
    try {
      const response = await fetch('/api/knowledge-query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: userQuery.trim() }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch response from backend');
      }
      
      const data = await response.json();
      setResponse(data.sections);
      
      if (data.error) {
        toast.error(data.error);
      }
    } catch (error) {
      console.error("Error fetching response:", error);
      setResponse([
        {
          title: "Error",
          content: "There was an error processing your request. Please try again later.",
        },
      ]);
      toast.error("Failed to get a response from the knowledge agent");
    } finally {
      setIsLoading(false);
    }
  };

  const loadHistoryItem = (item: QueryHistoryItem) => {
    setQuery(item.query);
  };

  return {
    query,
    setQuery,
    isLoading,
    response,
    queryHistory,
    isBackendAvailable,
    handleSubmit,
    loadHistoryItem,
    checkBackendStatus,
  };
};
