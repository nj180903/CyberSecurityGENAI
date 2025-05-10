
import React from "react";
import { Clock, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import CyberCard from "@/components/CyberCard";

interface QueryHistoryItem {
  id: string;
  query: string;
  timestamp: Date;
}

interface QueryHistoryProps {
  history: QueryHistoryItem[];
  onSelectQuery: (item: QueryHistoryItem) => void;
  onCheckBackendStatus: () => void;
}

const QueryHistory = ({ 
  history, 
  onSelectQuery, 
  onCheckBackendStatus 
}: QueryHistoryProps) => {
  return (
    <>
      <CyberCard title="Query History" icon={<Clock />}>
        <div className="space-y-4">
          {history.length === 0 ? (
            <p className="text-gray-400 text-center py-4">
              Your query history will appear here.
            </p>
          ) : (
            history.map((item) => (
              <div
                key={item.id}
                className="p-3 bg-cyber-dark-blue/50 rounded cursor-pointer hover:bg-cyber-muted/10 transition-colors"
                onClick={() => onSelectQuery(item)}
              >
                <p className="text-sm text-cyber-foreground mb-1 truncate">
                  {item.query}
                </p>
                <p className="text-xs text-gray-400">
                  {item.timestamp.toLocaleTimeString()}
                </p>
              </div>
            ))
          )}
        </div>
      </CyberCard>
      
      <div className="mt-4">
        <Button 
          onClick={onCheckBackendStatus}
          variant="outline" 
          className="w-full border-cyber text-cyber hover:bg-cyber/10"
        >
          <RefreshCw className="mr-2 h-4 w-4" /> Check Backend Status
        </Button>
      </div>
    </>
  );
};

export default QueryHistory;
