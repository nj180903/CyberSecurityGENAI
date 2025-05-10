
import express from 'express';
import { processKnowledgeQuery, setGeminiApiKey, isApiKeyConfigured } from './knowledgeApi';

// In a real application, this would be a server-side Express.js configuration
// Here we're simulating endpoints that would exist on a real backend

// Mock API endpoints
export const mockApiEndpoints = {
  // Status endpoint to check if backend is available and configured
  '/api/status': async () => {
    return {
      available: true,
      keyConfigured: isApiKeyConfigured()
    };
  },
  
  // Configure API key endpoint
  '/api/configure': async (request: any) => {
    const { apiKey } = request.body;
    const success = setGeminiApiKey(apiKey);
    
    return {
      success,
      message: success 
        ? "API key configured successfully" 
        : "Invalid API key format"
    };
  },
  
  // Knowledge query endpoint
  '/api/knowledge-query': async (request: any) => {
    const { query } = request.body;
    
    if (!query || typeof query !== 'string' || query.trim() === '') {
      return {
        sections: [{
          title: "Error",
          content: "Please provide a valid query"
        }],
        error: "Invalid query"
      };
    }
    
    return await processKnowledgeQuery(query);
  }
};

// Mock Express API for development purposes
// In a real implementation, this would be replaced with server-side Express code
export const setupMockApi = () => {
  // Intercept fetch requests to our mock API endpoints
  const originalFetch = window.fetch;
  
  window.fetch = async function(input: RequestInfo | URL, init?: RequestInit) {
    const inputUrl = typeof input === 'string' ? input : input instanceof Request ? input.url : input.toString();
    
    // Check if this is one of our mock API endpoints
    const endpoint = Object.keys(mockApiEndpoints).find(ep => inputUrl.includes(ep));
    
    if (endpoint) {
      console.log(`[MockAPI] Request to ${endpoint}`);
      
      // Parse request body if it exists
      let requestBody = {};
      if (init?.body) {
        try {
          requestBody = JSON.parse(init.body.toString());
        } catch (e) {
          console.error('[MockAPI] Error parsing request body:', e);
        }
      }
      
      // Process the request through our mock handler
      try {
        const responseData = await mockApiEndpoints[endpoint]({ body: requestBody });
        
        // Return a mock Response object
        return new Response(JSON.stringify(responseData), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
      } catch (error) {
        console.error('[MockAPI] Error processing request:', error);
        
        return new Response(JSON.stringify({
          error: 'Internal server error'
        }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }
    
    // For all other requests, use the original fetch
    return originalFetch.apply(window, [input, init]);
  };
};
