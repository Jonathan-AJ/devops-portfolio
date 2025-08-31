import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Terminal, Code, Server } from 'lucide-react';

export default function HeroSection() {
  const [typewriterText, setTypewriterText] = useState('');
  const fullText = 'Field Support Engineer → DevOps & SRE';

  useEffect(() => {
    let currentIndex = 0;
    const timer = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypewriterText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, []);

  const scrollToSection = () => {
    const pipelineSection = document.getElementById('pipeline-section');
    if (pipelineSection) {
      pipelineSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const iconVariants = {
    hidden: { opacity: 0, scale: 0, rotate: -180 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-cyan-400/20 rounded-full"
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />

      <motion.div
        className="relative z-10 text-center max-w-6xl mx-auto px-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Floating Icons */}
        <div className="absolute -top-20 -left-20">
          <motion.div
            variants={iconVariants}
            className="w-16 h-16 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl flex items-center justify-center backdrop-blur-sm"
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, 5, 0]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Terminal className="w-8 h-8 text-blue-400" />
          </motion.div>
        </div>

        <div className="absolute -top-16 -right-16">
          <motion.div
            variants={iconVariants}
            className="w-14 h-14 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center backdrop-blur-sm"
            animate={{ 
              y: [0, -15, 0],
              rotate: [0, -5, 0]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
          >
            <Code className="w-7 h-7 text-purple-400" />
          </motion.div>
        </div>

        <div className="absolute top-32 -left-32">
          <motion.div
            variants={iconVariants}
            className="w-12 h-12 bg-gradient-to-r from-green-500/20 to-teal-500/20 rounded-lg flex items-center justify-center backdrop-blur-sm"
            animate={{ 
              y: [0, -8, 0],
              rotate: [0, 8, 0]
            }}
            transition={{ 
              duration: 3.5, 
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          >
            <Server className="w-6 h-6 text-green-400" />
          </motion.div>
        </div>

        {/* Main Content */}
        <motion.div variants={itemVariants}>
          <motion.div
            className="inline-block bg-gradient-to-r from-blue-500/10 to-cyan-500/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-blue-500/20"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <span className="text-cyan-400 font-medium">15+ Years in Field Support | Transitioning to DevOps & SRE</span>
          </motion.div>
        </motion.div>

        <motion.h1 
          variants={itemVariants}
          className="text-4xl md:text-7xl font-bold mb-6"
        >
          <span className="block text-2xl md:text-3xl text-slate-300 mb-4">Jonathan Aharoni</span>
          <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            {typewriterText}
          </span>
          <motion.span
            className="inline-block w-1 h-12 md:h-16 bg-cyan-400 ml-2"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          />
        </motion.h1>

        <motion.p 
          variants={itemVariants}
          className="text-lg md:text-xl text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed"
        >
          Experienced Field Support Engineer at <span className="text-cyan-400 font-semibold">Intuitive Surgical</span> with 15+ years 
          of troubleshooting complex production systems. Passionate about building reliable, automated infrastructure 
          through <span className="text-green-400 font-semibold">AWS</span>, <span className="text-blue-400 font-semibold">Kubernetes</span>, 
          <span className="text-purple-400 font-semibold"> Terraform</span>, and modern DevOps practices.
        </motion.p>

        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6"
        >
          <motion.button
            className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToSection}
          >
            Explore My DevOps Journey
          </motion.button>
          
          <motion.button
            className="flex items-center space-x-2 text-slate-300 hover:text-white transition-colors duration-300"
            whileHover={{ x: 5 }}
            onClick={scrollToSection}
          >
            <span>View Real-World Solutions</span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.div>
          </motion.button>
        </motion.div>

        {/* Quick Stats */}
        <motion.div 
          variants={itemVariants}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto"
        >
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-white mb-2">15+</div>
            <div className="text-slate-400 text-sm">Years Experience</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-cyan-400 mb-2">30+</div>
            <div className="text-slate-400 text-sm">Medical Centers</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-green-400 mb-2">560%</div>
            <div className="text-slate-400 text-sm">Incident Documentation</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-purple-400 mb-2">50%</div>
            <div className="text-slate-400 text-sm">Setup Time Reduction</div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          variants={itemVariants}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-8 h-8 text-slate-400" />
        </motion.div>
      </motion.div>
    </section>
  );
}