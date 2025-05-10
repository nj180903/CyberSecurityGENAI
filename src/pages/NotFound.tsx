
import React from "react";
import { Link } from "react-router-dom";
import { AlertTriangle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import DataFlowBackground from "@/components/DataFlowBackground";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 relative">
      <DataFlowBackground density={8} />
      
      <div className="max-w-md w-full px-6 relative z-10">
        <div className="text-center">
          <div className="inline-flex items-center justify-center h-24 w-24 rounded-full bg-cyber/10 mb-6">
            <AlertTriangle className="h-12 w-12 text-cyber" />
          </div>
          
          <h1 className="text-5xl font-bold font-mono mb-6 cyber-text-glow">404</h1>
          <p className="text-xl text-gray-300 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          
          <Button asChild className="cyber-gradient">
            <Link to="/" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return Home
            </Link>
          </Button>
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-400">
            If you believe this is an error, please contact support.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
