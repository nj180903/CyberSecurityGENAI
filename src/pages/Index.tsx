
import React from "react";
import { Link } from "react-router-dom";
import { Database, Shield, FileSearch, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import CyberCard from "@/components/CyberCard";
import DataFlowBackground from "@/components/DataFlowBackground";

const Index = () => {
  const features = [
    {
      icon: <Shield className="h-7 w-7" />,
      name: "Knowledge Retrieval",
      description:
        "Get real-time answers to cybersecurity questions using the latest information from trusted sources.",
      path: "/knowledge",
    },
    {
      icon: <FileSearch className="h-7 w-7" />,
      name: "Log Analysis",
      description:
        "Upload and analyze log files to detect threats, identify anomalies, and receive mitigation recommendations.",
      path: "/log-analysis",
    },
    {
      icon: <Terminal className="h-7 w-7" />,
      name: "Penetration Testing",
      description:
        "Run AI-powered penetration tests in a virtual environment to discover vulnerabilities before attackers do.",
      path: "/pentest",
    },
  ];

  return (
    <div className="relative min-h-screen">
      <DataFlowBackground density={15} />
      
      {/* Hero Section */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 md:mb-20">
            <h1 className="text-4xl md:text-6xl font-bold font-mono mb-6">
              <span className="cyber-text-glow">CyberSentinel</span>
              <span className="text-cyber-foreground"> AI Nexus</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
              Advanced AI-powered cybersecurity tools for threat detection, knowledge retrieval, 
              and penetration testing.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="cyber-gradient text-white font-medium text-lg"
              >
                <Link to="/knowledge">Start Exploring</Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-cyber text-cyber hover:bg-cyber/10 font-medium text-lg"
              >
                Learn More
              </Button>
            </div>
          </div>
          
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyber/5 rounded-full blur-[100px] -z-10" />
        </div>
      </section>

      {/* Feature Cards */}
      <section className="py-16 bg-cyber-dark-blue/30 backdrop-blur-sm relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-3xl font-bold font-mono mb-12 text-center cyber-text-glow">
            Our AI Agents
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <CyberCard
                key={feature.name}
                className="flex flex-col h-full"
                glowEffect={true}
              >
                <div className="mb-4 text-cyber">{feature.icon}</div>
                <h3 className="text-xl font-bold font-mono mb-2 text-cyber-foreground">
                  {feature.name}
                </h3>
                <p className="text-gray-300 mb-6 flex-grow">{feature.description}</p>
                <Button
                  asChild
                  variant="outline"
                  className="border-cyber text-cyber hover:bg-cyber/10 mt-auto"
                >
                  <Link to={feature.path}>Explore</Link>
                </Button>
              </CyberCard>
            ))}
          </div>
        </div>
        <div className="scanner-line" />
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-mono mb-4 cyber-text-glow">
              Why Choose CyberSentinel
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our platform combines advanced AI with cybersecurity expertise to provide 
              powerful, accessible security tools.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            <div className="p-6 rounded-lg bg-cyber-dark-blue/30 border border-cyber-muted/20">
              <Database className="h-10 w-10 text-cyber mb-4" />
              <h3 className="text-xl font-bold font-mono mb-2 text-cyber-foreground">
                Real-time Intelligence
              </h3>
              <p className="text-gray-300">
                Access the latest cybersecurity information from trusted sources, not outdated data.
              </p>
            </div>
            
            <div className="p-6 rounded-lg bg-cyber-dark-blue/30 border border-cyber-muted/20">
              <FileSearch className="h-10 w-10 text-cyber mb-4" />
              <h3 className="text-xl font-bold font-mono mb-2 text-cyber-foreground">
                Advanced Analysis
              </h3>
              <p className="text-gray-300">
                Quickly analyze logs with machine learning to identify threats and anomalies.
              </p>
            </div>
            
            <div className="p-6 rounded-lg bg-cyber-dark-blue/30 border border-cyber-muted/20">
              <Terminal className="h-10 w-10 text-cyber mb-4" />
              <h3 className="text-xl font-bold font-mono mb-2 text-cyber-foreground">
                Adaptive Testing
              </h3>
              <p className="text-gray-300">
                AI-powered penetration testing that learns and adapts to find vulnerabilities.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-cyber-muted/10 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-mono mb-6 cyber-text-glow">
            Ready to strengthen your security?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Start using our AI-powered cybersecurity tools today and protect your systems from evolving threats.
          </p>
          <Button
            asChild
            size="lg"
            className="cyber-gradient text-white font-medium text-lg"
          >
            <Link to="/knowledge">Get Started Now</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
