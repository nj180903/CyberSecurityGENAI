
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/sonner";
import { LockKeyhole, Shield, CheckCircle, XCircle } from 'lucide-react';
import CyberCard from './CyberCard';

interface AdminApiConfigProps {
  onConfigured?: () => void;
}

const AdminApiConfig = ({ onConfigured }: AdminApiConfigProps) => {
  const [apiKey, setApiKey] = useState('');
  const [isConfiguring, setIsConfiguring] = useState(false);
  const [isKeyConfigured, setIsKeyConfigured] = useState(false);
  
  useEffect(() => {
    checkApiStatus();
  }, []);
  
  const checkApiStatus = async () => {
    try {
      const response = await fetch('/api/status');
      const data = await response.json();
      setIsKeyConfigured(data.keyConfigured);
    } catch (error) {
      console.error("Error checking API status:", error);
      setIsKeyConfigured(false);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!apiKey.trim()) {
      toast.error("Please enter a valid API key");
      return;
    }
    
    setIsConfiguring(true);
    
    try {
      const response = await fetch('/api/configure', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ apiKey }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast.success("API key configured successfully");
        setIsKeyConfigured(true);
        setApiKey('');
        
        if (onConfigured) {
          onConfigured();
        }
      } else {
        toast.error(data.message || "Failed to configure API key");
      }
    } catch (error) {
      console.error("Error configuring API key:", error);
      toast.error("An error occurred while configuring the API key");
    } finally {
      setIsConfiguring(false);
    }
  };
  
  return (
    <CyberCard className="mb-6" title="Admin API Configuration" icon={<LockKeyhole />}>
      {isKeyConfigured ? (
        <div className="p-4 bg-green-900/30 border border-green-500/50 rounded-md flex items-center">
          <CheckCircle className="text-green-500 mr-2" />
          <p className="text-green-300">
            The Gemini API key is successfully configured on the backend server.
          </p>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            <p className="text-gray-300">
              Enter your Gemini API key to enable the Knowledge Retrieval Agent. The key will be securely stored on the backend server.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="password"
                placeholder="Enter your Gemini API key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="border-cyber-muted/30 bg-cyber-dark/50"
              />
              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={isConfiguring || !apiKey.trim()}
                  className="cyber-gradient"
                >
                  {isConfiguring ? "Configuring..." : "Configure API Key"}
                </Button>
              </div>
            </form>
            <div className="flex items-center mt-4 p-3 bg-cyber-dark-blue/50 rounded">
              <Shield className="text-cyber mr-2" />
              <p className="text-xs text-gray-400">
                Your API key will be securely stored on the server and never exposed to client browsers.
              </p>
            </div>
          </div>
        </>
      )}
    </CyberCard>
  );
};

export default AdminApiConfig;
