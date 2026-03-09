import React, { useState } from 'react';
import { AppState, Demographics as DemographicsType, TongueData } from './types';
import { Consent } from './components/Consent';
import { Demographics } from './components/Demographics';
import { CCMQ } from './components/CCMQ';
import { TongueAnalysis } from './components/TongueAnalysis';
import { Dashboard } from './components/Dashboard';

const initialState: AppState = {
  phase: 'CONSENT',
  consentGiven: false,
  demographics: { age: '', gender: '', race: '' },
  ccmqAnswers: {},
  tongueData: { coatingColor: '', texture: '', bodyColor: '' },
};

export default function App() {
  const [state, setState] = useState<AppState>(initialState);

  const handleConsent = () => {
    setState((prev) => ({ ...prev, consentGiven: true, phase: 'DEMOGRAPHICS' }));
  };

  const handleDemographics = (data: DemographicsType) => {
    setState((prev) => ({ ...prev, demographics: data, phase: 'CCMQ' }));
  };

  const handleCCMQ = (answers: Record<number, number>) => {
    setState((prev) => ({ ...prev, ccmqAnswers: answers, phase: 'TONGUE' }));
  };

  const handleTongue = (data: TongueData) => {
    setState((prev) => ({ ...prev, tongueData: data, phase: 'RESULTS' }));
  };

  const handleRestart = () => {
    setState(initialState);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">TCM-Vital</span>
          </div>
          <div className="text-sm font-medium text-slate-500">
            Clinical-Grade Constitution App
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {state.phase === 'CONSENT' && <Consent onConsent={handleConsent} />}
        {state.phase === 'DEMOGRAPHICS' && <Demographics onComplete={handleDemographics} />}
        {state.phase === 'CCMQ' && <CCMQ onComplete={handleCCMQ} />}
        {state.phase === 'TONGUE' && <TongueAnalysis onComplete={handleTongue} />}
        {state.phase === 'RESULTS' && <Dashboard state={state} onRestart={handleRestart} />}
      </main>
    </div>
  );
}
