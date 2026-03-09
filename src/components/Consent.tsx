import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck } from 'lucide-react';

interface ConsentProps {
  onConsent: () => void;
}

export function Consent({ onConsent }: ConsentProps) {
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim().toLowerCase() === 'i consent') {
      onConsent();
    } else {
      setError(true);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-sm border border-slate-100"
    >
      <div className="flex justify-center mb-6">
        <div className="p-3 bg-emerald-50 rounded-full">
          <ShieldCheck className="w-8 h-8 text-emerald-600" />
        </div>
      </div>
      
      <h2 className="text-2xl font-semibold text-center text-slate-900 mb-4">
        PDPA Consent
      </h2>
      
      <div className="prose prose-sm text-slate-600 mb-6">
        <p>
          Welcome to TCM-Vital. Before we begin the Clinical-Grade Constitution & NCD Prediction assessment, 
          we require your consent under the Personal Data Protection Act (PDPA).
        </p>
        <p>
          Your data, including demographics, questionnaire responses, and tongue analysis, will be used 
          exclusively for health profiling and research purposes to generate your personalized health dashboard.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Please type <span className="font-bold text-slate-900">"I Consent"</span> to proceed:
          </label>
          <input
            type="text"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setError(false);
            }}
            placeholder="I Consent"
            className={`w-full px-4 py-3 rounded-xl border ${
              error ? 'border-red-300 focus:ring-red-500' : 'border-slate-200 focus:ring-emerald-500'
            } focus:outline-none focus:ring-2 transition-shadow`}
          />
          {error && (
            <p className="mt-2 text-sm text-red-600">
              You must type exactly "I Consent" to continue.
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-xl transition-colors"
        >
          Continue
        </button>
      </form>
    </motion.div>
  );
}
