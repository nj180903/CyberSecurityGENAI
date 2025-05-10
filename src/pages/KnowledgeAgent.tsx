
import React from "react";
import { Search } from "lucide-react";
import DataFlowBackground from "@/components/DataFlowBackground";
import QueryForm from "@/components/knowledge/QueryForm";
import QueryResponse from "@/components/knowledge/QueryResponse";
import QueryHistory from "@/components/knowledge/QueryHistory";
import BackendStatus from "@/components/knowledge/BackendStatus";
import { useKnowledgeAgent } from "@/components/knowledge/hooks/useKnowledgeAgent";

const KnowledgeAgent = () => {
  const {
    query,
    isLoading,
    response,
    queryHistory,
    isBackendAvailable,
    handleSubmit,
    loadHistoryItem,
    checkBackendStatus,
  } = useKnowledgeAgent();

  return (
    <div className="min-h-screen py-12 relative">
      <DataFlowBackground density={10} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold font-mono mb-3 cyber-text-glow">
            Knowledge Retrieval Agent
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Ask cybersecurity questions and get accurate, up-to-date answers sourced from trusted security resources.
          </p>
        </div>

        <BackendStatus 
          isBackendAvailable={isBackendAvailable} 
          onRefresh={checkBackendStatus} 
        />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Query Input */}
          <div className="lg:col-span-3 order-2 lg:order-1">
            <QueryForm 
              onSubmit={handleSubmit}
              isLoading={isLoading}
              isBackendAvailable={isBackendAvailable}
            />

            {/* Response Section */}
            <QueryResponse 
              isLoading={isLoading} 
              response={response} 
            />
          </div>

          {/* Query History */}
          <div className="lg:col-span-1 order-1 lg:order-2">
            <QueryHistory 
              history={queryHistory}
              onSelectQuery={loadHistoryItem}
              onCheckBackendStatus={checkBackendStatus}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeAgent;
