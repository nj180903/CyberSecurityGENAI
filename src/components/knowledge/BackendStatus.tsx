
import React from "react";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import CyberCard from "@/components/CyberCard";
import AdminApiConfig from "../AdminApiConfig";

interface BackendStatusProps {
  isBackendAvailable: boolean;
  onRefresh: () => void;
}

const BackendStatus = ({ isBackendAvailable, onRefresh }: BackendStatusProps) => {
  if (isBackendAvailable !== false) {
    return null;
  }

  return (
    <CyberCard className="mb-6" title="Backend Status" icon={<RefreshCw />}>
      <div className="p-4 bg-red-900/30 border border-red-500/50 rounded-md">
        <p className="text-red-300 mb-3">
          Backend service is currently unavailable. The Knowledge Retrieval Agent requires a functioning backend to process queries securely.
        </p>
        <p className="text-gray-300 mb-3 text-sm">
          To configure the backend, either:
          <br />
          1. Create a <code className="bg-gray-800 px-1 py-0.5 rounded">.env</code> file in your project root with <code className="bg-gray-800 px-1 py-0.5 rounded">VITE_GEMINI_API_KEY=your_api_key_here</code>
          <br />
          2. Or use the configuration form below to set the API key directly
        </p>
        <Button 
          onClick={onRefresh}
          variant="outline" 
          className="mt-2 border-cyber text-cyber hover:bg-cyber/10"
        >
          <RefreshCw className="mr-2 h-4 w-4" /> Refresh Status
        </Button>
      </div>
      
      <div className="mt-4">
        <AdminApiConfig onConfigured={onRefresh} />
      </div>
    </CyberCard>
  );
};

export default BackendStatus;
