
import React, { useState } from "react";
import { Terminal, Play, Pause, AlertTriangle, CheckCircle, RefreshCw, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import CyberCard from "@/components/CyberCard";
import DataFlowBackground from "@/components/DataFlowBackground";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/sonner";

interface Vulnerability {
  id: string;
  type: string;
  severity: "critical" | "high" | "medium" | "low";
  description: string;
  exploited: boolean;
  payload?: string;
  mitigation: string;
}

const PenetrationTesting = () => {
  const [environment, setEnvironment] = useState("webapp");
  const [testRunning, setTestRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [testComplete, setTestComplete] = useState(false);
  const [consoleOutput, setConsoleOutput] = useState<string[]>([]);
  const [vulnerabilities, setVulnerabilities] = useState<Vulnerability[]>([]);
  const [testId, setTestId] = useState<string>(Date.now().toString());
  
  const startTest = () => {
    setTestId(Date.now().toString());
    
    setTestRunning(true);
    setProgress(0);
    setTestComplete(false);
    setVulnerabilities([]);
    setConsoleOutput(["[*] Initializing penetration testing environment...", "[*] Loading AI-powered testing module..."]);
    
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prevProgress + 1;
      });
    }, 200);
    
    simulateConsoleOutput();
    
    setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      setTestRunning(false);
      setTestComplete(true);
      
      setConsoleOutput(prev => [
        ...prev,
        "[+] Penetration test completed",
        "[+] Generating vulnerability report...",
        "[+] Report ready!"
      ]);
      
      generateVulnerabilities();
    }, 20000);
  };

  const simulateConsoleOutput = () => {
    const webappOutput = [
      "[*] Scanning target for open ports and services...",
      "[*] Port 80 (HTTP) open",
      "[*] Port 443 (HTTPS) open",
      "[*] Port 8080 (HTTP-ALT) open",
      "[*] Fingerprinting web server: Apache 2.4.41",
      "[*] Detecting web technologies: PHP, MySQL, WordPress 5.8.2",
      "[+] Starting web application scan...",
      "[*] Crawling website and mapping attack surface...",
      "[*] Testing login form for SQL injection vulnerabilities...",
      "[!] Potential SQL injection vulnerability found in login form",
      "[+] Exploiting SQL injection...",
      "[+] SQL Injection successful with payload: ' OR 1=1--",
      "[+] Authentication bypassed",
      "[*] Testing for XSS vulnerabilities...",
      "[!] Stored XSS vulnerability found in comment section",
      "[*] Testing for CSRF vulnerabilities...",
      "[*] Testing for insecure direct object references...",
      "[!] IDOR vulnerability found in user profile endpoint"
    ];
    
    const networkOutput = [
      "[*] Performing network reconnaissance...",
      "[*] Discovered hosts: 192.168.1.1, 192.168.1.2, 192.168.1.10",
      "[*] Scanning target 192.168.1.10 for open ports...",
      "[*] Port 22 (SSH) open",
      "[*] Port 445 (SMB) open",
      "[*] Port 3389 (RDP) open",
      "[+] Starting SSH brute force attempt...",
      "[*] Trying common username/password combinations...",
      "[!] Weak credentials found - user: admin, password: admin123",
      "[+] SSH access gained with weak credentials",
      "[*] Checking SMB configuration...",
      "[!] Anonymous SMB access allowed",
      "[+] Accessing SMB share without authentication",
      "[!] Sensitive data found in SMB share"
    ];
    
    const systemOutput = [
      "[*] Enumerating system information...",
      "[*] OS: Ubuntu 18.04.5 LTS",
      "[*] Kernel: 5.4.0-81-generic",
      "[*] Checking for outdated software...",
      "[!] Apache version 2.4.29 is outdated (CVE-2021-44228)",
      "[*] Scanning for misconfigurations...",
      "[*] Checking file permissions...",
      "[!] Excessive permissions on /etc/passwd",
      "[!] Writable configuration files found",
      "[+] Exploiting misconfigured permissions...",
      "[+] Successfully modified configuration files"
    ];
    
    let outputArray;
    switch (environment) {
      case "webapp":
        outputArray = webappOutput;
        break;
      case "network":
        outputArray = networkOutput;
        break;
      default:
        outputArray = systemOutput;
    }
    
    let i = 0;
    const interval = setInterval(() => {
      if (i < outputArray.length) {
        setConsoleOutput(prev => [...prev, outputArray[i]]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 1000);
  };
  
  const generateVulnerabilities = () => {
    const seed = parseInt(testId.slice(-8)) + environment.length;
    const randomNum = (max: number) => Math.floor((seed * (max + 1) / 13) % max);
    
    let vulnerabilitiesList: Vulnerability[] = [];
    
    if (environment === "webapp") {
      const webVulnerabilities: Vulnerability[] = [
        {
          id: `VUL-${testId.slice(-3)}-001`,
          type: "SQL Injection",
          severity: "critical",
          description: "SQL injection vulnerability found in login form allowing authentication bypass",
          exploited: true,
          payload: "' OR 1=1--",
          mitigation: "Use parameterized queries and input sanitization to prevent SQL injection attacks"
        },
        {
          id: `VUL-${testId.slice(-3)}-002`,
          type: "Cross-Site Scripting (XSS)",
          severity: "high",
          description: "Stored XSS vulnerability in comment section allowing execution of arbitrary JavaScript",
          exploited: true,
          payload: "<script>alert('XSS')</script>",
          mitigation: "Implement output encoding and content security policies"
        }
      ];
      
      if (seed % 4 === 0) {
        webVulnerabilities.push({
          id: `VUL-${testId.slice(-3)}-003`,
          type: "Insecure Direct Object Reference",
          severity: "medium",
          description: "IDOR vulnerability allows access to other user accounts by changing ID parameter",
          exploited: false,
          mitigation: "Implement proper authorization checks and use indirect references"
        });
      }
      
      if (seed % 5 === 1) {
        webVulnerabilities.push({
          id: `VUL-${testId.slice(-3)}-004`,
          type: "Cross-Site Request Forgery",
          severity: "medium",
          description: "Missing CSRF tokens allow attackers to perform actions on behalf of authenticated users",
          exploited: true,
          payload: "<img src='https://example.com/api/delete-account' style='display:none'>",
          mitigation: "Implement anti-CSRF tokens for all state-changing operations"
        });
      }
      
      if (seed % 3 === 2) {
        webVulnerabilities.push({
          id: `VUL-${testId.slice(-3)}-005`,
          type: "Server-Side Request Forgery",
          severity: "high",
          description: "SSRF vulnerability in image upload feature allows access to internal resources",
          exploited: true,
          payload: "http://169.254.169.254/latest/meta-data/",
          mitigation: "Validate and sanitize URLs, implement allowlists for external resources"
        });
      }
      
      vulnerabilitiesList = webVulnerabilities;
    } else if (environment === "network") {
      const networkVulnerabilities: Vulnerability[] = [
        {
          id: `VUL-${testId.slice(-3)}-001`,
          type: "Weak SSH Password",
          severity: "high",
          description: "SSH server accepting weak/default passwords, allowing brute force attacks",
          exploited: true,
          payload: "Password: admin123",
          mitigation: "Enforce strong password policies and implement fail2ban"
        }
      ];
      
      if (seed % 4 === 0) {
        networkVulnerabilities.push({
          id: `VUL-${testId.slice(-3)}-002`,
          type: "Open SMB Share",
          severity: "medium",
          description: "Anonymous access allowed to SMB share with sensitive data",
          exploited: true,
          mitigation: "Disable anonymous access and implement proper authentication"
        });
      }
      
      if (seed % 5 === 1) {
        networkVulnerabilities.push({
          id: `VUL-${testId.slice(-3)}-003`,
          type: "Unpatched OpenSSL",
          severity: "critical", 
          description: "Heartbleed vulnerability detected in OpenSSL implementation",
          exploited: true,
          payload: "Custom heartbeat packet with malformed length field",
          mitigation: "Update OpenSSL to latest version and reissue certificates"
        });
      }
      
      if (seed % 3 === 2) {
        networkVulnerabilities.push({
          id: `VUL-${testId.slice(-3)}-004`,
          type: "Unnecessary Open Ports",
          severity: "medium",
          description: "Multiple unnecessary services exposed to public network",
          exploited: false, 
          mitigation: "Close unnecessary ports and implement network segmentation"
        });
      }
      
      vulnerabilitiesList = networkVulnerabilities;
    } else {
      const systemVulnerabilities: Vulnerability[] = [
        {
          id: `VUL-${testId.slice(-3)}-001`,
          type: "Outdated Software",
          severity: "high",
          description: "Apache server running version with known vulnerabilities (CVE-2021-44228)",
          exploited: false,
          mitigation: "Update to latest version and apply security patches"
        }
      ];
      
      if (seed % 4 === 0) {
        systemVulnerabilities.push({
          id: `VUL-${testId.slice(-3)}-002`,
          type: "Misconfigured Permissions",
          severity: "medium",
          description: "Excessive file permissions allow unauthorized access to configuration files",
          exploited: true,
          mitigation: "Apply principle of least privilege and review file permissions"
        });
      }
      
      if (seed % 5 === 1) {
        systemVulnerabilities.push({
          id: `VUL-${testId.slice(-3)}-003`,
          type: "Unpatched Kernel",
          severity: "critical",
          description: "Kernel version contains local privilege escalation vulnerability",
          exploited: true,
          payload: "Exploit using CVE-2021-3156 (Sudo Baron Samedit)",
          mitigation: "Update kernel to latest version and apply security patches"
        });
      }
      
      if (seed % 3 === 2) {
        systemVulnerabilities.push({
          id: `VUL-${testId.slice(-3)}-004`,
          type: "Default Credentials",
          severity: "high",
          description: "Default administrator credentials found on multiple services",
          exploited: true,
          payload: "Username: admin, Password: admin",
          mitigation: "Change all default passwords and implement password rotation policy"
        });
      }
      
      vulnerabilitiesList = systemVulnerabilities;
    }
    
    const numVulns = 1 + (seed % 3); // 1-3 vulnerabilities
    vulnerabilitiesList = vulnerabilitiesList.slice(0, numVulns);
    
    setVulnerabilities(vulnerabilitiesList);
  };
  
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "text-red-500";
      case "high":
        return "text-orange-500";
      case "medium":
        return "text-yellow-500";
      case "low":
        return "text-green-500";
      default:
        return "text-gray-400";
    }
  };
  
  const getSeverityBgColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-500/20";
      case "high":
        return "bg-orange-500/20";
      case "medium":
        return "bg-yellow-500/20";
      case "low":
        return "bg-green-500/20";
      default:
        return "bg-gray-400/20";
    }
  };

  const downloadReport = () => {
    if (!vulnerabilities.length) return;
    
    try {
      let reportContent = `# Penetration Test Report\n`;
      reportContent += `# Date: ${new Date().toLocaleString()}\n`;
      reportContent += `# Environment: ${environment}\n\n`;
      
      reportContent += `## Summary\n`;
      reportContent += `${vulnerabilities.length} vulnerabilities were detected.\n\n`;
      
      reportContent += `## Vulnerabilities\n\n`;
      
      vulnerabilities.forEach((vuln, index) => {
        reportContent += `### ${index + 1}. ${vuln.type} (${vuln.severity.toUpperCase()})\n`;
        reportContent += `ID: ${vuln.id}\n`;
        reportContent += `Description: ${vuln.description}\n`;
        
        if (vuln.exploited) {
          reportContent += `Status: Successfully exploited\n`;
          if (vuln.payload) {
            reportContent += `Payload: ${vuln.payload}\n`;
          }
        } else {
          reportContent += `Status: Detected but not exploited\n`;
        }
        
        reportContent += `Mitigation: ${vuln.mitigation}\n\n`;
      });
      
      reportContent += `## Recommendations\n\n`;
      reportContent += `1. Address all critical and high severity issues immediately\n`;
      reportContent += `2. Implement regular security testing\n`;
      reportContent += `3. Update all software to latest versions\n`;
      reportContent += `4. Review access control policies\n`;
      
      const blob = new Blob([reportContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `pentest_report_${environment}_${Date.now()}.txt`;
      document.body.appendChild(link);
      link.click();
      
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
      <DataFlowBackground density={15} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold font-mono mb-3 cyber-text-glow">
            Penetration Testing Agent
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Run AI-powered penetration tests to identify vulnerabilities before attackers do.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Test Configuration */}
          <div className="lg:col-span-1">
            <CyberCard 
              className="mb-6" 
              title="Test Configuration" 
              icon={<Terminal />}
              glowEffect={!testRunning && !testComplete}
            >
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium text-cyber-foreground mb-3">
                    Target Environment
                  </h4>
                  <RadioGroup
                    defaultValue="webapp"
                    value={environment}
                    onValueChange={setEnvironment}
                    className="space-y-3"
                    disabled={testRunning}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="webapp" id="webapp" />
                      <Label
                        htmlFor="webapp"
                        className={`${
                          environment === "webapp" ? "text-cyber" : "text-gray-300"
                        }`}
                      >
                        Web Application
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="network" id="network" />
                      <Label
                        htmlFor="network"
                        className={`${
                          environment === "network" ? "text-cyber" : "text-gray-300"
                        }`}
                      >
                        Network Services
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="system" id="system" />
                      <Label
                        htmlFor="system"
                        className={`${
                          environment === "system" ? "text-cyber" : "text-gray-300"
                        }`}
                      >
                        System Configuration
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <Separator className="bg-cyber-muted/20" />
                
                {!testRunning && !testComplete && (
                  <div>
                    <Button
                      onClick={startTest}
                      className="cyber-gradient w-full"
                    >
                      <Play className="mr-2 h-4 w-4" />
                      Start Penetration Test
                    </Button>
                    <p className="text-xs text-gray-400 mt-2 text-center">
                      The test will run in a safe, simulated environment
                    </p>
                  </div>
                )}
                
                {testRunning && (
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-400">Test progress</span>
                        <span className="text-cyber">{progress}%</span>
                      </div>
                      <Progress value={progress} className="h-2 bg-cyber-muted/20" indicatorClassName="bg-cyber" />
                    </div>
                    
                    <Button
                      variant="outline"
                      className="border-cyber-muted text-cyber-muted hover:bg-cyber-muted/10 hover:text-cyber w-full"
                      disabled
                    >
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Test in Progress...
                    </Button>
                  </div>
                )}
                
                {testComplete && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-center text-cyber">
                      <CheckCircle className="h-8 w-8 mr-2" />
                      <span className="text-lg font-medium">Test Complete</span>
                    </div>
                    
                    <div className="flex space-x-3">
                      <Button
                        variant="outline"
                        className="border-cyber text-cyber hover:bg-cyber/10 flex-1"
                        onClick={() => {
                          setTestComplete(false);
                          setVulnerabilities([]);
                          setConsoleOutput([]);
                        }}
                      >
                        New Test
                      </Button>
                      
                      <Button 
                        className="cyber-gradient flex-1"
                        onClick={downloadReport}
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Report
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </CyberCard>
            
            {/* Test Information */}
            <CyberCard className="hidden lg:block">
              <div className="space-y-4">
                <h3 className="text-lg font-medium font-mono text-cyber-foreground">
                  About Penetration Testing
                </h3>
                <p className="text-sm text-gray-300">
                  Our AI-powered penetration testing agent simulates various attack vectors to identify vulnerabilities in your systems before malicious actors can exploit them.
                </p>
                <div className="space-y-2">
                  <div className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-cyber/20 flex items-center justify-center flex-shrink-0 mt-0.5 mr-2">
                      <span className="text-cyber text-xs">1</span>
                    </div>
                    <p className="text-sm text-gray-400">
                      Selects attack vectors based on environment
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-cyber/20 flex items-center justify-center flex-shrink-0 mt-0.5 mr-2">
                      <span className="text-cyber text-xs">2</span>
                    </div>
                    <p className="text-sm text-gray-400">
                      Tests multiple exploits adaptively
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-cyber/20 flex items-center justify-center flex-shrink-0 mt-0.5 mr-2">
                      <span className="text-cyber text-xs">3</span>
                    </div>
                    <p className="text-sm text-gray-400">
                      Provides detailed vulnerability report with fixes
                    </p>
                  </div>
                </div>
              </div>
            </CyberCard>
          </div>
          
          {/* Terminal Output */}
          <div className="lg:col-span-2">
            <CyberCard 
              className="mb-6" 
              title="Terminal Output" 
              icon={<Terminal className="text-cyber" />}
              glowEffect={testRunning || testComplete}
            >
              <div className="font-mono text-sm bg-cyber-dark-blue/50 rounded-md p-4 h-80 overflow-y-auto">
                {consoleOutput.map((line, index) => (
                  <div key={index} className="mb-1">
                    {line && line.startsWith("[+]") ? (
                      <span className="text-green-500">{line}</span>
                    ) : line && line.startsWith("[!]") ? (
                      <span className="text-yellow-500">{line}</span>
                    ) : line && line.startsWith("[-]") ? (
                      <span className="text-red-500">{line}</span>
                    ) : (
                      <span className="text-cyber-foreground">{line || ""}</span>
                    )}
                  </div>
                ))}
                {testRunning && (
                  <div className="animate-pulse">
                    <span className="text-cyber">$</span>{" "}
                    <span className="inline-block h-4 w-2 bg-cyber/80 animate-pulse-cyber"></span>
                  </div>
                )}
              </div>
            </CyberCard>
            
            {/* Vulnerabilities */}
            {testComplete && vulnerabilities.length > 0 && (
              <CyberCard 
                title="Detected Vulnerabilities" 
                icon={<AlertTriangle className="text-yellow-500" />}
                glowEffect={true}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-lg font-medium text-cyber-foreground">
                        {vulnerabilities.length} vulnerabilities found
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <div className="flex items-center">
                        <div className="h-3 w-3 rounded-full bg-red-500 mr-1"></div>
                        <span className="text-xs text-gray-400">Critical</span>
                      </div>
                      <div className="flex items-center">
                        <div className="h-3 w-3 rounded-full bg-orange-500 mr-1"></div>
                        <span className="text-xs text-gray-400">High</span>
                      </div>
                      <div className="flex items-center">
                        <div className="h-3 w-3 rounded-full bg-yellow-500 mr-1"></div>
                        <span className="text-xs text-gray-400">Medium</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {vulnerabilities.map((vuln) => (
                      <div key={vuln.id} className="border border-cyber-muted/20 rounded-md overflow-hidden">
                        <div className="bg-cyber-dark-blue/30 p-3 flex items-center justify-between">
                          <div className="flex items-center">
                            <div className={`h-4 w-4 rounded-full ${getSeverityBgColor(vuln.severity)} flex items-center justify-center mr-2`}>
                              <AlertTriangle className={`h-2.5 w-2.5 ${getSeverityColor(vuln.severity)}`} />
                            </div>
                            <h4 className="font-mono font-medium text-cyber-foreground">
                              {vuln.type}
                            </h4>
                          </div>
                          <div className="flex items-center">
                            <span className={`text-xs font-medium px-2 py-1 rounded ${getSeverityBgColor(vuln.severity)} ${getSeverityColor(vuln.severity)} mr-2`}>
                              {vuln.severity.toUpperCase()}
                            </span>
                            <span className="text-xs text-gray-400">
                              {vuln.id}
                            </span>
                          </div>
                        </div>
                        
                        <div className="p-4 space-y-3">
                          <div>
                            <h5 className="text-sm font-medium text-cyber-foreground mb-1">Description</h5>
                            <p className="text-sm text-gray-300">
                              {vuln.description}
                            </p>
                          </div>
                          
                          {vuln.exploited && vuln.payload && (
                            <div>
                              <h5 className="text-sm font-medium text-red-400 flex items-center mb-1">
                                <AlertTriangle className="h-3 w-3 mr-1" />
                                Exploited
                              </h5>
                              <div className="bg-cyber-dark-blue/50 p-2 rounded font-mono text-xs text-red-300">
                                {vuln.payload}
                              </div>
                            </div>
                          )}
                          
                          <div>
                            <h5 className="text-sm font-medium text-green-400 mb-1">Mitigation</h5>
                            <p className="text-sm text-gray-300">
                              {vuln.mitigation}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CyberCard>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PenetrationTesting;
