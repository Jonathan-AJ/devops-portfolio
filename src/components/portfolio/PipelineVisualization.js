import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '../ui/card';
import { ChevronRight, Play, Check } from 'lucide-react';

export default function PipelineVisualization({ 
  process, 
  activeStage, 
  onStageClick, 
  isPipelineRunning, 
  animatedStageIndex, 
  completedStages 
}) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const stageVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <div id="pipeline-section" className="mb-16">
      {/* Pipeline Flow */}
      <motion.div
        className="relative"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Desktop Flow */}
        <div className="hidden lg:block">
          <div className="flex items-stretch justify-between space-x-4">
            {process.stages.map((stage, index) => {
              const isStageSelected = !isPipelineRunning && activeStage === stage.id;
              const isStageAnimated = isPipelineRunning && animatedStageIndex === index;
              const isStageCompleted = completedStages.includes(stage.id);

              return (
              <React.Fragment key={stage.id}>
                <motion.div
                  variants={stageVariants}
                  className="flex-1"
                >
                  <Card
                    className={`h-full cursor-pointer transition-all duration-500 border-2 ${
                      isStageAnimated
                        ? `border-green-400 bg-slate-800 shadow-2xl shadow-green-500/20`
                        : isStageSelected
                        ? `border-gradient bg-gradient-to-br ${process.color} bg-slate-800 shadow-2xl`
                        : isStageCompleted
                        ? `border-green-500 bg-slate-800/80`
                        : 'border-slate-700 bg-slate-800/50 hover:border-slate-600 hover:bg-slate-800'
                    }`}
                    onClick={() => onStageClick(stage.id)}
                  >
                    <CardContent className="p-6 text-center h-full flex flex-col justify-between">
                      <div className="flex flex-col items-center">
                        <motion.div
                          className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center transition-colors relative ${
                            isStageAnimated || isStageSelected
                              ? 'bg-white/20 backdrop-blur-sm'
                              : isStageCompleted
                              ? 'bg-green-500/20'
                              : 'bg-slate-700'
                          }`}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          {isStageCompleted ? (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring", stiffness: 300 }}
                              className="absolute inset-0 flex items-center justify-center"
                            >
                              <Check className="w-8 h-8 text-green-400" />
                            </motion.div>
                          ) : (
                            <stage.icon className={`w-8 h-8 transition-colors ${
                              isStageAnimated || isStageSelected ? 'text-white' : 'text-slate-300'
                            }`} />
                          )}
                          
                          {/* Pulsing animation for currently executing stage */}
                          {isStageAnimated && (
                            <motion.div
                              className="absolute inset-0 rounded-2xl bg-green-400/30"
                              animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            />
                          )}
                        </motion.div>
                        
                        <h3 className={`text-lg font-semibold mb-2 transition-colors min-h-[2.5rem] flex items-center ${
                          isStageAnimated || isStageSelected ? 'text-white' : 
                          isStageCompleted ? 'text-green-300' : 'text-slate-200'
                        }`}>
                          {stage.name}
                        </h3>
                        
                        <p className={`text-sm transition-colors mb-4 min-h-[3rem] flex items-center text-center leading-tight ${
                          isStageAnimated || isStageSelected ? 'text-slate-200' : 
                          isStageCompleted ? 'text-green-400' : 'text-slate-400'
                        }`}>
                          {stage.description}
                        </p>
                      </div>
                      
                      {/* Status indicator */}
                      <motion.div className="flex items-center justify-center space-x-2 mt-auto">
                        {isStageCompleted && !isPipelineRunning && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-green-400 text-xs font-medium"
                          >
                            ✓ PASSED
                          </motion.div>
                        )}
                        {isStageAnimated && (
                          <motion.div
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 1, repeat: Infinity }}
                            className="text-green-400 text-xs font-medium"
                          >
                            EXECUTING...
                          </motion.div>
                        )}
                        {!isPipelineRunning && !isStageCompleted && (
                          <div className="text-slate-400 text-xs flex items-center">
                            <Play className="w-3 h-3 mr-1" />
                            Click to view code
                          </div>
                        )}
                      </motion.div>
                    </CardContent>

                    {/* Glow effect for active stage */}
                    {(isStageSelected || isStageAnimated) && (
                      <motion.div
                        className={`absolute -inset-1 rounded-xl opacity-30 blur-lg ${
                          isStageAnimated ? 'bg-green-400' : `bg-gradient-to-r ${process.color}`
                        }`}
                        animate={{ opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                  </Card>
                </motion.div>

                {/* Arrow connector */}
                {index < process.stages.length - 1 && (
                  <motion.div
                    className="flex items-center justify-center"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 + 0.5 }}
                  >
                    <motion.div
                      animate={{ x: [0, 10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                    >
                      <ChevronRight className={`w-8 h-8 transition-colors duration-500 ${
                        isPipelineRunning && animatedStageIndex > index ? 'text-green-400' : 
                        completedStages.includes(process.stages[index].id) && completedStages.includes(process.stages[index + 1]?.id) ? 'text-green-400' :
                        'text-slate-500'
                      }`} />
                    </motion.div>
                  </motion.div>
                )}
              </React.Fragment>
            )})}
          </div>
        </div>

        {/* Mobile Flow */}
        <div className="block lg:hidden space-y-4">
          {process.stages.map((stage, index) => {
            const isStageSelected = !isPipelineRunning && activeStage === stage.id;
            const isStageAnimated = isPipelineRunning && animatedStageIndex === index;
            const isStageCompleted = completedStages.includes(stage.id);
            
            return (
            <React.Fragment key={stage.id}>
              <motion.div variants={stageVariants}>
                <Card
                  className={`cursor-pointer transition-all duration-500 border-2 ${
                    isStageAnimated
                      ? `border-green-400 bg-slate-800 shadow-xl`
                      : isStageSelected
                      ? `border-gradient bg-gradient-to-r ${process.color} bg-slate-800 shadow-xl`
                      : isStageCompleted
                      ? `border-green-500 bg-slate-800/80`
                      : 'border-slate-700 bg-slate-800/50 hover:border-slate-600'
                  }`}
                  onClick={() => onStageClick(stage.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <motion.div
                        className={`w-14 h-14 rounded-xl flex items-center justify-center transition-colors relative flex-shrink-0 ${
                          isStageAnimated || isStageSelected
                            ? 'bg-white/20 backdrop-blur-sm'
                            : isStageCompleted
                            ? 'bg-green-500/20'
                            : 'bg-slate-700'
                        }`}
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {isStageCompleted ? (
                          <Check className="w-7 h-7 text-green-400" />
                        ) : (
                          <stage.icon className={`w-7 h-7 transition-colors ${
                            isStageAnimated || isStageSelected ? 'text-white' : 'text-slate-300'
                          }`} />
                        )}
                        
                        {isStageAnimated && (
                          <motion.div
                            className="absolute inset-0 rounded-xl bg-green-400/30"
                            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          />
                        )}
                      </motion.div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className={`text-lg font-semibold mb-1 transition-colors ${
                          isStageAnimated || isStageSelected ? 'text-white' :
                          isStageCompleted ? 'text-green-300' : 'text-slate-200'
                        }`}>
                          {stage.name}
                        </h3>
                        <p className={`text-sm transition-colors ${
                          isStageAnimated || isStageSelected ? 'text-slate-200' :
                          isStageCompleted ? 'text-green-400' : 'text-slate-400'
                        }`}>
                          {stage.description}
                        </p>
                      </div>
                      
                      <div className="text-right flex-shrink-0">
                        {isStageCompleted && !isPipelineRunning ? (
                          <div className="text-green-400 text-xs font-medium">✓ PASSED</div>
                        ) : isStageAnimated ? (
                          <motion.div
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 1, repeat: Infinity }}
                            className="text-green-400 text-xs font-medium"
                          >
                            EXECUTING...
                          </motion.div>
                        ) : (
                          <Play className="w-5 h-5 text-slate-400" />
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Mobile connector */}
              {index < process.stages.length - 1 && (
                <motion.div
                  className="flex justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.2 + 0.3 }}
                >
                  <motion.div
                    className={`w-px h-8 bg-gradient-to-b transition-colors duration-500 ${
                      isPipelineRunning && animatedStageIndex > index ? 'from-green-500 to-green-600' :
                      completedStages.includes(process.stages[index].id) && completedStages.includes(process.stages[index + 1]?.id) ? 'from-green-500 to-green-600' :
                      'from-slate-600 to-slate-700'
                    }`}
                    animate={{ scaleY: [0, 1] }}
                    transition={{ delay: index * 0.2 + 0.5, duration: 0.3 }}
                  />
                </motion.div>
              )}
            </React.Fragment>
          )})}
        </div>
      </motion.div>
    </div>
  );
}