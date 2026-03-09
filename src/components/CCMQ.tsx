import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CCMQ_QUESTIONS, Cluster, Question } from '../questions';
import { CheckCircle2, ArrowLeft, ArrowRight, HelpCircle } from 'lucide-react';

interface CCMQProps {
  onComplete: (answers: Record<number, number>) => void;
}

const CLUSTERS: Cluster[] = [
  'Energy & Breathing',
  'Temperature & Sensation',
  'Digestion & Stools',
  'Head, Throat & Mouth',
  'Skin & Physical Appearance',
  'Emotional State',
  'Immunity & General'
];

export function CCMQ({ onComplete }: CCMQProps) {
  const [currentClusterIndex, setCurrentClusterIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [activeTooltip, setActiveTooltip] = useState<number | null>(null);

  const currentCluster = CLUSTERS[currentClusterIndex];
  
  const currentQuestions = useMemo(() => {
    return CCMQ_QUESTIONS.filter(q => q.cluster === currentCluster);
  }, [currentCluster]);

  const handleAnswer = (questionId: number, value: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    if (currentClusterIndex < CLUSTERS.length - 1) {
      setCurrentClusterIndex((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onComplete(answers);
    }
  };

  const handleBack = () => {
    if (currentClusterIndex > 0) {
      setCurrentClusterIndex((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const isClusterComplete = currentQuestions.every((q) => answers[q.id] !== undefined);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900">CCMQ Assessment</h2>
        <p className="text-slate-500 mt-2">
          Please answer the following questions based on how you have felt over the past year.
          (1 = Not at all, 5 = Very much)
        </p>
        <div className="mt-4 h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-indigo-600 transition-all duration-500 ease-out"
            style={{ width: `${((currentClusterIndex + 1) / CLUSTERS.length) * 100}%` }}
          />
        </div>
        <div className="flex justify-between items-center mt-2">
          <span className="text-sm font-semibold text-indigo-600 uppercase tracking-wider">
            {currentCluster}
          </span>
          <span className="text-sm text-slate-400 font-mono">
            Section {currentClusterIndex + 1} of {CLUSTERS.length}
          </span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentClusterIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          {currentQuestions.map((q, idx) => (
            <div
              key={q.id}
              className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100 relative"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-medium text-slate-800 pr-8">
                  <span className="text-indigo-400 mr-2 font-mono text-sm">
                    {idx + 1}.
                  </span>
                  {q.text}
                </h3>
                {q.tooltip && (
                  <div className="relative">
                    <button 
                      onClick={() => setActiveTooltip(activeTooltip === q.id ? null : q.id)}
                      className="text-slate-400 hover:text-indigo-500 transition-colors"
                      aria-label="What does this mean?"
                    >
                      <HelpCircle className="w-5 h-5" />
                    </button>
                    {activeTooltip === q.id && (
                      <div className="absolute right-0 top-8 w-64 p-3 bg-slate-800 text-white text-sm rounded-xl shadow-lg z-10">
                        <div className="absolute -top-2 right-2 w-4 h-4 bg-slate-800 transform rotate-45"></div>
                        <p className="relative z-10">{q.tooltip}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-5 gap-2">
                {[1, 2, 3, 4, 5].map((val) => (
                  <button
                    key={val}
                    onClick={() => handleAnswer(q.id, val)}
                    className={`py-3 rounded-xl border font-medium transition-all ${
                      answers[q.id] === val
                        ? 'bg-indigo-600 border-indigo-600 text-white shadow-md'
                        : 'bg-white border-slate-200 text-slate-600 hover:border-indigo-300 hover:bg-indigo-50'
                    }`}
                  >
                    {val}
                  </button>
                ))}
              </div>
              <div className="flex justify-between text-xs text-slate-400 mt-3 px-1 uppercase tracking-wider">
                <span>Not at all</span>
                <span>Very much</span>
              </div>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>

      <div className="mt-8 flex justify-between items-center">
        <button
          onClick={handleBack}
          disabled={currentClusterIndex === 0}
          className={`flex items-center space-x-2 py-3 px-6 rounded-xl font-medium transition-colors ${
            currentClusterIndex === 0 
              ? 'text-slate-300 cursor-not-allowed' 
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>

        <button
          onClick={handleNext}
          disabled={!isClusterComplete}
          className="flex items-center space-x-2 py-3 px-8 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-colors"
        >
          <span>{currentClusterIndex < CLUSTERS.length - 1 ? 'Next Section' : 'Complete Assessment'}</span>
          {currentClusterIndex < CLUSTERS.length - 1 ? (
            <ArrowRight className="w-5 h-5" />
          ) : (
            isClusterComplete && <CheckCircle2 className="w-5 h-5" />
          )}
        </button>
      </div>
    </div>
  );
}
