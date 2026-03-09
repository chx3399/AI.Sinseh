import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Activity, AlertTriangle, HeartPulse, Utensils, Zap, Moon, ChevronDown, ChevronUp, Info } from 'lucide-react';
import { AppState } from '../types';
import { calculateScores, getNCDRisks, getInterventions, validateTongue, NCD_INFO } from '../utils';

interface DashboardProps {
  state: AppState;
  onRestart: () => void;
}

export function Dashboard({ state, onRestart }: DashboardProps) {
  const { demographics, ccmqAnswers, tongueData } = state;
  const [expandedNCD, setExpandedNCD] = useState<string | null>(null);

  const results = useMemo(() => calculateScores(ccmqAnswers), [ccmqAnswers]);
  
  // Primary and Secondary Constitutions
  const primary = results[0];
  const secondary = results[1];

  const confidence = useMemo(() => validateTongue(primary.type, tongueData), [primary.type, tongueData]);
  const ncdRisks = useMemo(() => getNCDRisks(primary.type, secondary.type), [primary.type, secondary.type]);
  const interventions = useMemo(() => getInterventions(primary.type, demographics.race), [primary.type, demographics.race]);

  const toggleNCD = (risk: string) => {
    setExpandedNCD(expandedNCD === risk ? null : risk);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-4xl mx-auto space-y-6"
    >
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
        <div className="flex items-center space-x-4 mb-6">
          <div className="p-3 bg-indigo-50 rounded-2xl">
            <Activity className="w-8 h-8 text-indigo-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Health Dashboard</h1>
            <p className="text-slate-500">
              {demographics.age} years old • {demographics.gender} • {demographics.race}
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Constitution Profile */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">
              Constitution Profile
            </h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-end mb-1">
                  <span className="text-sm font-medium text-slate-500">Primary</span>
                  <span className="text-2xl font-bold text-indigo-600">{primary.type}</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${primary.score}%` }}></div>
                </div>
                <div className="text-right text-xs text-slate-400 mt-1">Score: {primary.score}</div>
              </div>
              
              <div>
                <div className="flex justify-between items-end mb-1">
                  <span className="text-sm font-medium text-slate-500">Secondary</span>
                  <span className="text-lg font-semibold text-slate-700">{secondary.type}</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-1.5">
                  <div className="bg-slate-400 h-1.5 rounded-full" style={{ width: `${secondary.score}%` }}></div>
                </div>
                <div className="text-right text-xs text-slate-400 mt-1">Score: {secondary.score}</div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-200">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-slate-600">Diagnostic Confidence</span>
                <span className="text-lg font-bold text-emerald-600">{confidence}%</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Bolstered by Tongue Analysis ({tongueData.coatingColor} coating, {tongueData.texture}, {tongueData.bodyColor} body)
              </p>
            </div>
          </div>

          {/* NCD Risk Mapping */}
          <div className="bg-rose-50 p-6 rounded-2xl border border-rose-100 flex flex-col">
            <div className="flex items-center space-x-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-rose-500" />
              <h2 className="text-sm font-bold text-rose-800 uppercase tracking-wider">
                NCD Risk Mapping
              </h2>
            </div>
            
            {ncdRisks.length > 0 ? (
              <div className="flex-1">
                <p className="text-sm text-rose-900 mb-3 font-medium">
                  Based on your constitution, you may have a higher risk for:
                </p>
                <ul className="space-y-2">
                  {ncdRisks.map((risk, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-2 flex-shrink-0" />
                      <span className="text-rose-800 font-medium">{risk}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-rose-600 mt-4">
                  Scroll down to the Educational Resources section to learn more about these conditions.
                </p>
              </div>
            ) : (
              <div className="flex-1">
                <p className="text-rose-700 text-sm">
                  Based on your current profile, no high-risk NCD patterns were strongly identified. Maintain a healthy lifestyle.
                </p>
              </div>
            )}
            <p className="text-xs text-rose-600/70 mt-4 italic">
              * Risk identification is based on Latent Class Analysis (LCA) of your constitution. This is not a medical diagnosis.
            </p>
          </div>
        </div>
      </div>

      {/* Personalized Interventions */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
        <h2 className="text-xl font-bold text-slate-900 mb-6">Personalized Interventions</h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          {/* Diet */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3 text-emerald-600">
              <div className="p-2 bg-emerald-50 rounded-xl">
                <Utensils className="w-5 h-5" />
              </div>
              <h3 className="font-semibold">Dietary Advice</h3>
            </div>
            <ul className="space-y-3">
              {interventions.diet.map((item, idx) => {
                const isRecipe = item.startsWith('Recipe:');
                return (
                  <li key={idx} className={`text-sm flex items-start space-x-2 ${isRecipe ? 'bg-emerald-50/50 p-2 rounded-lg border border-emerald-100/50' : 'text-slate-600'}`}>
                    <span className="text-emerald-400 mt-0.5">•</span>
                    <span className={isRecipe ? 'text-emerald-800 font-medium' : ''}>
                      {isRecipe ? item.replace('Recipe: ', '') : item}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Exercise */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3 text-blue-600">
              <div className="p-2 bg-blue-50 rounded-xl">
                <HeartPulse className="w-5 h-5" />
              </div>
              <h3 className="font-semibold">Exercise Routine</h3>
            </div>
            <ul className="space-y-2">
              {interventions.exercise.map((item, idx) => (
                <li key={idx} className="text-sm text-slate-600 flex items-start space-x-2">
                  <span className="text-blue-400 mt-0.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Lifestyle */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3 text-purple-600">
              <div className="p-2 bg-purple-50 rounded-xl">
                <Moon className="w-5 h-5" />
              </div>
              <h3 className="font-semibold">Lifestyle & Sleep</h3>
            </div>
            <ul className="space-y-2">
              {interventions.lifestyle.map((item, idx) => (
                <li key={idx} className="text-sm text-slate-600 flex items-start space-x-2">
                  <span className="text-purple-400 mt-0.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* NCD Educational Content */}
      {ncdRisks.length > 0 && (
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-amber-50 rounded-xl">
              <Info className="w-6 h-6 text-amber-600" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Educational Resources</h2>
          </div>
          <p className="text-sm text-slate-500 mb-6">
            Learn more about the Noncommunicable Diseases (NCDs) associated with your constitution profile.
          </p>

          <div className="space-y-4">
            {ncdRisks.map((risk) => {
              const info = NCD_INFO[risk];
              if (!info) return null;
              const isExpanded = expandedNCD === risk;

              return (
                <div key={risk} className="border border-slate-200 rounded-2xl overflow-hidden">
                  <button
                    onClick={() => toggleNCD(risk)}
                    className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 transition-colors text-left"
                  >
                    <span className="font-semibold text-slate-800">{risk}</span>
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-slate-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-500" />
                    )}
                  </button>
                  
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="bg-white border-t border-slate-100"
                      >
                        <div className="p-5 grid md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Symptoms</h4>
                            <ul className="space-y-1 mb-4">
                              {info.symptoms.map((s, i) => (
                                <li key={i} className="text-sm text-slate-600 flex items-start space-x-2">
                                  <span className="text-slate-300 mt-0.5">-</span>
                                  <span>{s}</span>
                                </li>
                              ))}
                            </ul>
                            
                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Causes</h4>
                            <ul className="space-y-1">
                              {info.causes.map((c, i) => (
                                <li key={i} className="text-sm text-slate-600 flex items-start space-x-2">
                                  <span className="text-slate-300 mt-0.5">-</span>
                                  <span>{c}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Prevention</h4>
                            <ul className="space-y-1 mb-4">
                              {info.prevention.map((p, i) => (
                                <li key={i} className="text-sm text-slate-600 flex items-start space-x-2">
                                  <span className="text-emerald-400 mt-0.5">✓</span>
                                  <span>{p}</span>
                                </li>
                              ))}
                            </ul>
                            
                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Recommended Actions</h4>
                            <ul className="space-y-1">
                              {info.actions.map((a, i) => (
                                <li key={i} className="text-sm text-slate-600 flex items-start space-x-2">
                                  <span className="text-indigo-400 mt-0.5">→</span>
                                  <span>{a}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="flex justify-center pt-4">
        <button
          onClick={onRestart}
          className="px-6 py-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
        >
          Start New Assessment
        </button>
      </div>
    </motion.div>
  );
}
