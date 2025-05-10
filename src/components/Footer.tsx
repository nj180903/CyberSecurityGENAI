
import React from "react";
import { Shield } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-cyber-dark-blue border-t border-cyber-muted/30 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Shield className="h-6 w-6 text-cyber mr-2" />
            <span className="text-lg font-bold font-mono cyber-text-glow">
              CyberSentinel
            </span>
          </div>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-8 text-sm text-gray-400">
            <a href="#" className="hover:text-cyber transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-cyber transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-cyber transition-colors">
              Contact Us
            </a>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-cyber-muted/20 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} CyberSentinel AI. All rights reserved.
          </p>
          <p className="text-xs text-gray-500 mt-2 md:mt-0">
            Powered by advanced AI for cybersecurity intelligence.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
