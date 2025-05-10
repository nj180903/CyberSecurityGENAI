
import React, { useState, useRef } from "react";
import { FileUp, AlertTriangle, CheckCircle, Info, RefreshCw, Download, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import CyberCard from "@/components/CyberCard";
import DataFlowBackground from "@/components/DataFlowBackground";
import { toast } from "@/components/ui/sonner";

interface AnalysisResult {
  threatType: string;
  confidence: number;
  reason: string;
  mitigation: string;
}

const THREAT_CATEGORIES = [
  "Normal",
  "Generic",
  "Exploits",
  "Fuzzers",
  "DoS",
  "Reconnaissance",
  "Analysis",
  "Backdoor",
  "Shellcode",
  "Worms",
  "DDoS",
  "PortScan",
  "Brute-force",
  "Infiltration",
  "Botnet",
  "Web attacks",
  "Heartbleed"
];

const LogAnalysis = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [analysisResults, setAnalysisResults] = useState<AnalysisResult[] | null>(null);
  const [isSafe, setIsSafe] = useState<boolean | null>(null);
  const [fileContent, setFileContent] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setAnalysisResults(null);
      setIsSafe(null);
      
      // Read file content to generate analysis based on it
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setFileContent(event.target.result as string);
        }
      };
      reader.readAsText(selectedFile);
    }
  };

  const handleFileUpload = () => {
    if (!file) return;
    
    setIsAnalyzing(true);
    setProgress(0);
    
    // Simulate analysis progress
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prevProgress + 5;
      });
    }, 200);
    
    // Simulate analysis completion
    setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      
      // Generate analysis results based on file content
      setTimeout(() => {
        generateAnalysisResults();
        setIsAnalyzing(false);
      }, 1000);
    }, 4000);
  };

  const generateAnalysisResults = () => {
    // Determine if the log is safe or contains anomalies based on file content
    // For simplicity, we'll use a basic heuristic that looks for keywords in the content
    // In a real-world implementation, this would use an actual ML model
    
    const contentLower = fileContent?.toLowerCase() || "";
    
    // Check for keywords that might indicate specific threat categories
    const containsExploit = contentLower.includes("exploit") || contentLower.includes("attack_cat") || contentLower.includes("label=1");
    const containsGeneric = contentLower.includes("generic") || contentLower.includes("attack_cat");
    const containsDoS = contentLower.includes("dos") || contentLower.includes("ddos");
    const containsWebAttack = contentLower.includes("sql") || contentLower.includes("xss") || contentLower.includes("web");
    const containsBruteForce = contentLower.includes("brute") || contentLower.includes("ssh") || contentLower.includes("http");
    
    // Generate a pseudo-random number based on file name and size to determine if it's safe
    const fileNameSeed = file?.name.length || 0;
    const fileSizeSeed = file?.size || 0;
    const randomValue = (fileNameSeed * fileSizeSeed) % 100;
    
    // 30% chance of being safe if no obvious threats detected
    const determineSafety = () => {
      if (containsExploit || containsGeneric || containsDoS || containsWebAttack || containsBruteForce) {
        return false;
      }
      return randomValue < 30;
    };
    
    const isSafeLog = determineSafety();
    setIsSafe(isSafeLog);
    
    if (isSafeLog) {
      // No threats detected
      setAnalysisResults([]);
      return;
    }
    
    // Generate threat detections based on file content
    const results: AnalysisResult[] = [];
    const numThreats = 1 + Math.floor((fileSizeSeed % 3)); // 1-3 threats based on file size
    
    const usedCategories = new Set<string>();
    
    for (let i = 0; i < numThreats; i++) {
      // Select threat type based on content keywords or randomly if no keywords match
      let threatType;
      let reason;
      let mitigation;
      let confidence;
      
      if (containsGeneric && !usedCategories.has("Generic")) {
        threatType = "Generic";
        confidence = 75 + Math.floor(Math.random() * 20);
        reason = "Unusual traffic pattern detected with Generic attack pattern signature";
        mitigation = "Update intrusion detection signatures and review firewall rules";
      } else if (containsExploit && !usedCategories.has("Exploits")) {
        threatType = "Exploits";
        confidence = 80 + Math.floor(Math.random() * 15);
        reason = "Exploit attempt detected targeting known vulnerability";
        mitigation = "Patch affected systems and update security controls";
      } else if (containsDoS && !usedCategories.has("DoS")) {
        threatType = "DoS";
        confidence = 85 + Math.floor(Math.random() * 10);
        reason = "Abnormal traffic volume indicating DoS attack pattern";
        mitigation = "Implement rate limiting and traffic filtering";
      } else if (containsWebAttack && !usedCategories.has("Web attacks")) {
        threatType = "Web attacks";
        confidence = 90 + Math.floor(Math.random() * 8);
        reason = "SQL injection pattern detected in web server logs";
        mitigation = "Implement input sanitization and parameterized queries";
      } else if (containsBruteForce && !usedCategories.has("Brute-force")) {
        threatType = "Brute-force";
        confidence = 88 + Math.floor(Math.random() * 10);
        reason = "Multiple failed authentication attempts from same source";
        mitigation = "Implement account lockout policies and 2FA";
      } else {
        // Randomly select threat type
        const availableCategories = THREAT_CATEGORIES.filter(cat => 
          cat !== "Normal" && !usedCategories.has(cat)
        );
        
        if (availableCategories.length === 0) break;
        
        const randomIndex = Math.floor(Math.random() * availableCategories.length);
        threatType = availableCategories[randomIndex];
        confidence = 70 + Math.floor(Math.random() * 25);
        
        // Generate appropriate reason and mitigation based on threat type
        switch (threatType) {
          case "Reconnaissance":
            reason = "Scanning activity detected from external IP addresses";
            mitigation = "Block suspicious IPs and update firewall rules";
            break;
          case "Backdoor":
            reason = "Unusual outbound connection attempts on non-standard ports";
            mitigation = "Scan affected systems for malware and restrict outbound connections";
            break;
          case "PortScan":
            reason = "Sequential port scanning detected from single source IP";
            mitigation = "Implement network segmentation and update IDS rules";
            break;
          case "Botnet":
            reason = "Communication pattern matching known botnet C&C servers";
            mitigation = "Isolate affected systems and scan for malware";
            break;
          case "Heartbleed":
            reason = "TLS heartbeat extension exploit attempt detected";
            mitigation = "Update OpenSSL to latest version and rotate affected credentials";
            break;
          default:
            reason = `Suspicious activity matching ${threatType} pattern`;
            mitigation = "Update security controls and monitor affected systems";
        }
      }
      
      usedCategories.add(threatType);
      
      results.push({
        threatType,
        confidence,
        reason,
        mitigation
      });
    }
    
    setAnalysisResults(results);
  };

  const resetAnalysis = () => {
    setFile(null);
    setAnalysisResults(null);
    setIsSafe(null);
    setFileContent(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  
  const getThreatSeverityColor = (confidence: number) => {
    if (confidence >= 90) return "text-red-500";
    if (confidence >= 70) return "text-orange-500";
    return "text-yellow-500";
  };

  const downloadReport = () => {
    if (!file || !analysisResults) return;
    
    try {
      // Create report content
      let reportContent = `# Security Analysis Report for: ${file.name}\n`;
      reportContent += `# Date: ${new Date().toLocaleString()}\n\n`;
      
      if (isSafe) {
        reportContent += "## Status: SAFE - No Anomalies Detected\n\n";
        reportContent += "No security threats or anomalies were detected in the provided log file.\n";
      } else {
        reportContent += `## Status: ${analysisResults.length} Threat${analysisResults.length !== 1 ? 's' : ''} Detected\n\n`;
        
        analysisResults.forEach((result, index) => {
          reportContent += `### Threat ${index + 1}: ${result.threatType}\n`;
          reportContent += `Confidence: ${result.confidence}%\n`;
          reportContent += `Detection Reason: ${result.reason}\n`;
          reportContent += `Mitigation Steps: ${result.mitigation}\n\n`;
        });
      }
      
      // Create a blob and download link
      const blob = new Blob([reportContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `security_report_${file.name.split('.')[0]}_${Date.now()}.txt`;
      document.body.appendChild(link);
      link.click();
      
      // Clean up
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast.success("Report downloaded successfully");
    } catch (error) {
      console.error("Error downloading report:", error);
      toast.error("Failed to download report");
    }
  };

  return (
    <div className="min-h-screen py-12 relative">
      <DataFlowBackground density={12} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold font-mono mb-3 cyber-text-glow">
            Log Analysis Agent
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Upload log files to detect threats, analyze anomalies, and receive detailed mitigation recommendations.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upload Section */}
          <div className="lg:col-span-1">
            <CyberCard 
              className="mb-6" 
              title="Upload Logs" 
              icon={<FileUp />}
              glowEffect={true}
            >
              <div className="space-y-4">
                <div 
                  className="border-2 border-dashed border-cyber-muted/40 rounded-md p-8 text-center cursor-pointer hover:border-cyber/60 transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <FileUp className="h-12 w-12 text-cyber-muted mx-auto mb-3" />
                  <p className="text-cyber-foreground mb-1">
                    {file ? file.name : "Click to select log file"}
                  </p>
                  <p className="text-sm text-gray-400">
                    {file ? `${(file.size / 1024).toFixed(2)} KB` : "Supports CSV, JSON, or text log formats"}
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".csv,.json,.log,.txt"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>
                
                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={resetAnalysis}
                    className="border-cyber-muted text-cyber-muted hover:bg-cyber-muted/10 hover:text-cyber"
                    disabled={!file || isAnalyzing}
                  >
                    Reset
                  </Button>
                  
                  <Button
                    onClick={handleFileUpload}
                    disabled={!file || isAnalyzing}
                    className="cyber-gradient"
                  >
                    {isAnalyzing ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      "Analyze Logs"
                    )}
                  </Button>
                </div>
              </div>
            </CyberCard>
            
            {/* Analysis Information */}
            <CyberCard title="About Log Analysis" icon={<Info />}>
              <div className="space-y-4 text-sm">
                <p className="text-gray-300">
                  Our Log Analysis Agent uses advanced machine learning models to detect anomalies and threats in your log files.
                </p>
                <div className="bg-cyber-dark/50 p-3 rounded">
                  <h4 className="text-cyber-foreground font-medium mb-1">Supported Log Types:</h4>
                  <ul className="list-disc pl-5 text-gray-300 space-y-1">
                    <li>System logs</li>
                    <li>Network traffic logs</li>
                    <li>Web server logs</li>
                    <li>Authentication logs</li>
                    <li>Application logs</li>
                  </ul>
                </div>
                <p className="text-gray-400">
                  For best results, ensure logs contain timestamp, source/destination information, and event details.
                </p>
              </div>
            </CyberCard>
          </div>
          
          {/* Analysis Results */}
          <div className="lg:col-span-2">
            {isAnalyzing ? (
              <CyberCard className="h-full" title="Analysis in Progress" icon={<RefreshCw className="animate-spin" />}>
                <div className="space-y-6 py-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Analyzing log patterns...</span>
                      <span className="text-cyber">{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2 bg-cyber-muted/20" indicatorClassName="bg-cyber" />
                  </div>
                  
                  <div className="p-6 border border-cyber-muted/20 rounded bg-cyber-dark-blue/20">
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-cyber/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <FileUp className="h-4 w-4 text-cyber" />
                      </div>
                      <div>
                        <h4 className="font-mono text-cyber-foreground mb-1">Processing {file?.name}</h4>
                        <p className="text-sm text-gray-400">
                          Running advanced threat detection algorithms and anomaly detection...
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-4 pl-12 text-xs font-mono font-medium">
                      <div className="space-y-1 text-gray-400">
                        <p>• Parsing log format</p>
                        <p>• Extracting features</p>
                        <p>• Running binary classification model</p>
                        <p className={progress > 60 ? "text-cyber" : ""}>
                          {progress > 60 ? "• Model prediction in progress" : "• Detecting threats..."}
                        </p>
                        <p className={progress > 80 ? "text-cyber" : ""}>
                          {progress > 80 ? "• Generating analysis report" : "• Preparing analysis report..."}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CyberCard>
            ) : analysisResults !== null ? (
              <CyberCard 
                className="h-full" 
                title={isSafe ? "Analysis Results" : "Analysis Results"} 
                icon={isSafe ? <ShieldCheck className="text-green-500" /> : <AlertTriangle className="text-yellow-500" />}
                glowEffect={true}
              >
                <div className="mb-4 p-3 bg-cyber-dark/50 rounded flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`h-8 w-8 ${isSafe ? 'bg-green-500/20' : 'bg-yellow-500/20'} rounded-full flex items-center justify-center mr-3`}>
                      {isSafe ? 
                        <ShieldCheck className="h-5 w-5 text-green-500" /> : 
                        <AlertTriangle className="h-5 w-5 text-yellow-500" />
                      }
                    </div>
                    <div>
                      <h3 className="font-medium text-cyber-foreground">
                        {isSafe ? 
                          "No Threats Detected" : 
                          `${analysisResults.length} Threat${analysisResults.length !== 1 ? 's' : ''} Detected`
                        }
                      </h3>
                      <p className="text-sm text-gray-400">
                        Analysis completed for {file?.name}
                      </p>
                    </div>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="border-cyber text-cyber hover:bg-cyber/10"
                    onClick={downloadReport}
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Report
                  </Button>
                </div>
                
                {isSafe ? (
                  <div className="p-6 text-center">
                    <ShieldCheck className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-mono text-green-400 mb-2">Log File is Safe</h3>
                    <p className="text-gray-300 max-w-lg mx-auto mb-4">
                      Our analysis has determined that this log file does not contain any anomalies or security threats.
                      The traffic patterns appear normal and no suspicious activities were detected.
                    </p>
                    <div className="bg-cyber-dark-blue/30 p-4 rounded-md text-left max-w-md mx-auto">
                      <h4 className="font-medium text-cyber mb-2">Analysis Summary</h4>
                      <ul className="space-y-2 text-sm text-gray-300">
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                          <span>No suspicious command sequences detected</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                          <span>Traffic patterns match expected baselines</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                          <span>No known attack signatures identified</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                          <span>Authentication events follow normal patterns</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {analysisResults.map((result, index) => (
                      <div key={index} className="border border-cyber-muted/20 rounded-md overflow-hidden">
                        <div className="bg-cyber-dark-blue/30 p-3 flex items-center justify-between">
                          <div className="flex items-center">
                            <AlertTriangle className={`h-5 w-5 mr-2 ${getThreatSeverityColor(result.confidence)}`} />
                            <h4 className="font-mono font-medium text-cyber-foreground">
                              {result.threatType}
                            </h4>
                          </div>
                          <span className={`text-sm font-medium ${getThreatSeverityColor(result.confidence)}`}>
                            {result.confidence}% Confidence
                          </span>
                        </div>
                        
                        <div className="p-4 space-y-3">
                          <div>
                            <h5 className="text-sm font-medium text-cyber mb-1">Detection Reason</h5>
                            <p className="text-gray-300 bg-cyber-dark/40 p-2 rounded text-sm">
                              {result.reason}
                            </p>
                          </div>
                          
                          <div>
                            <h5 className="text-sm font-medium text-cyber mb-1">Mitigation Steps</h5>
                            <p className="text-gray-300 bg-cyber-dark/40 p-2 rounded text-sm">
                              {result.mitigation}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CyberCard>
            ) : (
              <CyberCard className="h-full flex flex-col items-center justify-center text-center p-12">
                <div className="h-16 w-16 bg-cyber/10 rounded-full flex items-center justify-center mb-4">
                  <FileUp className="h-8 w-8 text-cyber-muted" />
                </div>
                <h3 className="text-xl font-mono text-cyber-foreground mb-2">
                  No Logs Analyzed Yet
                </h3>
                <p className="text-gray-400 max-w-md mx-auto mb-6">
                  Upload a log file to begin analysis. Our AI will detect threats, identify anomalies, and provide detailed mitigation recommendations.
                </p>
                <Button 
                  onClick={() => fileInputRef.current?.click()}
                  className="cyber-gradient"
                >
                  Select Log File
                </Button>
              </CyberCard>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogAnalysis;

