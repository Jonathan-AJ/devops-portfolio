import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Code, 
  Server, 
  GitBranch, 
  Shield, 
  Monitor,
  Container,
  Cloud,
  Settings,
  Terminal,
  Zap,
  Mail,
  Linkedin,
  Github,
  MapPin,
  Phone
} from 'lucide-react';
import { Button } from '../components/ui/button';

import HeroSection from '../components/portfolio/HeroSection';
import PipelineVisualization from '../components/portfolio/PipelineVisualization';
import CodeViewer from '../components/portfolio/CodeViewer';
import SkillsShowcase from '../components/portfolio/SkillsShowcase';

const devopsProcesses = [
  {
    id: 'cicd',
    title: 'CI/CD Pipeline',
    description: 'Automated build, test, and deployment workflows inspired by production medical systems',
    icon: GitBranch,
    color: 'from-blue-500 to-cyan-500',
    stages: [
      { id: 'source', name: 'Source Control', icon: Code, description: 'Git workflows with feature branches and PR reviews' },
      { id: 'build', name: 'Build & Test', icon: Settings, description: 'Automated testing and compilation with quality gates' },
      { id: 'security', name: 'Security Scan', icon: Shield, description: 'Vulnerability assessment and compliance checks' },
      { id: 'deploy', name: 'Deploy', icon: Cloud, description: 'Blue-green deployment to staging and production' },
      { id: 'monitor', name: 'Monitor', icon: Monitor, description: 'Real-time monitoring and alerting systems' }
    ]
  },
  {
    id: 'iac',
    title: 'Infrastructure as Code',
    description: 'Scalable infrastructure automation using Terraform and cloud-native services',
    icon: Server,
    color: 'from-purple-500 to-pink-500',
    stages: [
      { id: 'planning', name: 'Planning', icon: Code, description: 'Infrastructure requirements and resource planning' },
      { id: 'coding', name: 'Code Infrastructure', icon: Terminal, description: 'Terraform templates with modular architecture' },
      { id: 'validation', name: 'Validate', icon: Shield, description: 'Policy validation and cost estimation' },
      { id: 'provision', name: 'Provision', icon: Cloud, description: 'Automated infrastructure deployment' },
      { id: 'manage', name: 'Manage', icon: Settings, description: 'Lifecycle management and cost optimization' }
    ]
  },
  {
    id: 'containers',
    title: 'Container Orchestration',
    description: 'Kubernetes-based container management with auto-scaling and service mesh',
    icon: Container,
    color: 'from-green-500 to-teal-500',
    stages: [
      { id: 'containerize', name: 'Containerize', icon: Container, description: 'Multi-stage Docker builds with security hardening' },
      { id: 'orchestrate', name: 'Orchestrate', icon: Settings, description: 'Kubernetes manifests with best practices' },
      { id: 'scale', name: 'Auto-Scale', icon: Zap, description: 'HPA and VPA for dynamic resource management' },
      { id: 'loadbalance', name: 'Load Balance', icon: Server, description: 'Service mesh with traffic management' },
      { id: 'observe', name: 'Observe', icon: Monitor, description: 'Comprehensive logging, metrics, and tracing' }
    ]
  }
];

export default function Portfolio() {
  const [activeProcess, setActiveProcess] = useState('cicd');
  const [activeStage, setActiveStage] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPipelineRunning, setIsPipelineRunning] = useState(false);
  const [animatedStageIndex, setAnimatedStageIndex] = useState(-1);
  const [showCodeExecution, setShowCodeExecution] = useState(false);
  const [currentExecutingCode, setCurrentExecutingCode] = useState(null);
  const [completedStages, setCompletedStages] = useState([]);

  const currentProcess = devopsProcesses.find(p => p.id === activeProcess);

  const handleProcessChange = (processId) => {
    if (processId !== activeProcess) {
      setIsAnimating(true);
      setCompletedStages([]);
      setTimeout(() => {
        setActiveProcess(processId);
        setActiveStage(null);
        setIsAnimating(false);
      }, 300);
    }
  };

  const handleStageClick = (stageId) => {
    if (isPipelineRunning) return;
    setActiveStage(activeStage === stageId ? null : stageId);
  };

  const startPipelineAnimation = () => {
    if (isPipelineRunning) return;
    setActiveStage(null);
    setIsPipelineRunning(true);
    setAnimatedStageIndex(0);
    setShowCodeExecution(true);
    setCompletedStages([]);
    setCurrentExecutingCode(currentProcess.stages[0]);
  };

  useEffect(() => {
    if (!isPipelineRunning || animatedStageIndex === -1) return;

    if (animatedStageIndex >= currentProcess.stages.length) {
      setTimeout(() => {
        setIsPipelineRunning(false);
        setAnimatedStageIndex(-1);
        setShowCodeExecution(false);
        setCurrentExecutingCode(null);
      }, 1000);
      return;
    }

    const currentStage = currentProcess.stages[animatedStageIndex];
    setCurrentExecutingCode(currentStage);

    // Simulate code execution time (3 seconds per stage)
    const timer = setTimeout(() => {
      // Mark current stage as completed
      setCompletedStages(prev => [...prev, currentStage.id]);
      // Move to next stage
      setAnimatedStageIndex(prevIndex => prevIndex + 1);
    }, 3000);

    return () => clearTimeout(timer);
  }, [isPipelineRunning, animatedStageIndex, currentProcess.stages]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800">
      <HeroSection />
      
      {/* Navigation */}
      <motion.div
        id='selection-bar' 
        className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-slate-700"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-center">
            <div className="flex bg-slate-800/50 rounded-full p-2 space-x-2">
              {devopsProcesses.map((process) => (
                <Button
                  key={process.id}
                  variant={activeProcess === process.id ? "default" : "ghost"}
                  className={`rounded-full transition-all duration-300 ${
                    activeProcess === process.id 
                      ? `bg-gradient-to-r ${process.color} text-white shadow-lg` 
                      : "text-slate-300 hover:text-white hover:bg-slate-700"
                  }`}
                  onClick={() => handleProcessChange(process.id)}
                >
                  <process.icon className="w-4 h-4 mr-2" />
                  {process.title}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <AnimatePresence mode="wait">
          {!isAnimating && (
            <motion.div
              key={activeProcess}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {/* Process Header */}
              <div className="text-center mb-12">
                <motion.div
                  className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-r ${currentProcess.color} mb-6`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <currentProcess.icon className="w-10 h-10 text-white" />
                </motion.div>
                <h2 className="text-4xl font-bold text-white mb-4">{currentProcess.title}</h2>
                <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-8">{currentProcess.description}</p>
                <Button
                  onClick={startPipelineAnimation}
                  disabled={isPipelineRunning}
                  className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Play className={`w-5 h-5 mr-2 ${isPipelineRunning ? 'animate-pulse' : ''}`} />
                  {isPipelineRunning ? 'Pipeline Running...' : 'Run Pipeline Simulation'}
                </Button>
              </div>

              {/* Pipeline Visualization */}
              <PipelineVisualization 
                process={currentProcess}
                activeStage={activeStage}
                onStageClick={handleStageClick}
                isPipelineRunning={isPipelineRunning}
                animatedStageIndex={animatedStageIndex}
                completedStages={completedStages}
              />

              {/* Code Execution Viewer */}
              <AnimatePresence>
                {showCodeExecution && currentExecutingCode && (
                  <CodeViewer 
                    processId={activeProcess}
                    stageId={currentExecutingCode.id}
                    isExecuting={true}
                    stageName={currentExecutingCode.name}
                    onClose={() => {
                      setShowCodeExecution(false);
                      setIsPipelineRunning(false);
                      setAnimatedStageIndex(-1);
                      setCurrentExecutingCode(null);
                    }}
                  />
                )}
              </AnimatePresence>

              {/* Manual Code Viewer */}
              <AnimatePresence>
                {activeStage && !showCodeExecution && (
                  <CodeViewer 
                    processId={activeProcess}
                    stageId={activeStage}
                    isExecuting={false}
                    onClose={() => setActiveStage(null)}
                  />
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <SkillsShowcase />

      {/* About Section */}
      <section className="py-20 bg-slate-800/30">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-white mb-8">About My Journey</h2>
            <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700">
              <p className="text-lg text-slate-300 leading-relaxed mb-6">
                I am a seasoned technical professional with over 15 years of experience ensuring the reliability and performance of 
                mission-critical healthcare systems across 30+ hospitals and clinics. In my current role as a Field Support Engineer, I design 
                automation tools, streamline server deployments, and lead incident management processes that directly improve uptime,
                efficiency, and service continuity.
              </p>
              <p className="text-lg text-slate-300 leading-relaxed mb-6">
                Today, I am channeling this foundation into <span className="text-green-400 font-semibold">Site Reliability Engineering (SRE)</span> and 
                <span className="text-blue-400 font-semibold"> DevOps</span>. With hands-on 
                expertise in AWS, Kubernetes, Terraform, CI/CD pipelines, observability tools, and SQL/VMware environments, I specialize 
                in building scalable, resilient, and automated infrastructures that bridge the gap between engineering and operations.
              </p>
              <p className="text-lg text-slate-300 leading-relaxed mb-6">
                What sets me apart is my ability to translate real-world operational challenges into practical, automated solutions. 
                Whether developing Python/PowerShell scripts that cut setup times by 50%, implementing end-to-end monitoring with 
                Prometheus and Grafana, or integrating healthcare IT workflows, I focus on delivering solutions that are both technically
                robust and business-aligned.
              </p>
              <p className="text-lg text-slate-300 leading-relaxed">
                I thrive at the intersection of reliability, innovation, and customer value - and I am driven to contribute these strengths to
                organizations looking to scale their systems and improve operational excellence.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-slate-900/50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-white mb-8">Let's Connect</h2>
            <p className="text-xl text-slate-300 mb-12">
              Ready to discuss DevOps strategies, SRE practices, or potential opportunities in cloud infrastructure.
            </p>

            {/* Contact Info */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <motion.div
                className="bg-slate-800/30 rounded-xl p-6 border border-slate-700"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <MapPin className="w-8 h-8 text-cyan-400 mx-auto mb-4" />
                <h3 className="text-white font-semibold mb-2">Location</h3>
                <p className="text-slate-300">Center, Israel</p>
              </motion.div>
              
              <motion.div
                className="bg-slate-800/30 rounded-xl p-6 border border-slate-700"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Mail className="w-8 h-8 text-green-400 mx-auto mb-4" />
                <h3 className="text-white font-semibold mb-2">Email</h3>
                <a href="mailto:jaharoni@proton.me" className="text-slate-300 hover:text-green-400 transition-colors">
                  jaharoni@proton.me
                </a>
              </motion.div>
              
              <motion.div
                className="bg-slate-800/30 rounded-xl p-6 border border-slate-700"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Phone className="w-8 h-8 text-purple-400 mx-auto mb-4" />
                <h3 className="text-white font-semibold mb-2">Phone</h3>
                <a href="tel:+972-54-5528-681" className="text-slate-300 hover:text-purple-400 transition-colors">
                  +972-54-5528-681
                </a>
              </motion.div>
            </div>

            {/* Social Links */}
            <div className="flex justify-center items-center space-x-6">
              <motion.a
                href="https://www.linkedin.com/in/jonathan-aharoni/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Linkedin className="w-5 h-5" />
                <span>LinkedIn</span>
              </motion.a>
              <motion.a
                href="https://github.com/Jonathan-AJ"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 bg-slate-800 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:bg-slate-700"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github className="w-5 h-5" />
                <span>GitHub</span>
              </motion.a>
              <motion.a
                href="mailto:jaharoni@proton.me"
                className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-teal-500 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-green-500/25"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail className="w-5 h-5" />
                <span>Email Me</span>
              </motion.a>
            </div>

            {/* Education */}
            <motion.div
              className="mt-16 bg-slate-800/30 rounded-2xl p-8 border border-slate-700"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 className="text-2xl font-bold text-white mb-6">Education</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="text-left">
                  <h4 className="text-lg font-semibold text-cyan-400 mb-2">
                    Practical Engineer in Software Engineering
                  </h4>
                  <p className="text-slate-300 mb-1">ORT Colleges</p>
                  <p className="text-slate-400 text-sm mb-2">2021 - 2024</p>
                  <p className="text-green-400 font-semibold">GPA: 97</p>
                </div>
                <div className="text-left">
                  <h4 className="text-lg font-semibold text-cyan-400 mb-2">
                    Practical Engineer in Electrical and Electronics
                  </h4>
                  <p className="text-slate-300 mb-1">Bar-Ilan University</p>
                  <p className="text-slate-400 text-sm">2000 - 2002</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
