import React, { useState } from 'react';
import { motion } from 'motion/react';
import { UserCircle } from 'lucide-react';
import { Demographics as DemographicsType } from '../types';

interface DemographicsProps {
  onComplete: (data: DemographicsType) => void;
}

export function Demographics({ onComplete }: DemographicsProps) {
  const [data, setData] = useState<DemographicsType>({
    age: '',
    gender: '',
    race: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (data.age && data.gender && data.race) {
      onComplete(data);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-sm border border-slate-100"
    >
      <div className="flex justify-center mb-6">
        <div className="p-3 bg-indigo-50 rounded-full">
          <UserCircle className="w-8 h-8 text-indigo-600" />
        </div>
      </div>
      
      <h2 className="text-2xl font-semibold text-center text-slate-900 mb-2">
        Demographics
      </h2>
      <p className="text-center text-slate-500 mb-6 text-sm">
        This information is used for NCD risk stratification and specific logic.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Age
          </label>
          <input
            type="number"
            min="1"
            max="120"
            required
            value={data.age}
            onChange={(e) => setData({ ...data, age: parseInt(e.target.value) || '' })}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-shadow"
            placeholder="e.g. 35"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Gender
          </label>
          <div className="grid grid-cols-2 gap-3">
            {['Male', 'Female'].map((gender) => (
              <button
                key={gender}
                type="button"
                onClick={() => setData({ ...data, gender: gender as 'Male' | 'Female' })}
                className={`py-3 px-4 rounded-xl border text-sm font-medium transition-colors ${
                  data.gender === gender
                    ? 'bg-indigo-50 border-indigo-200 text-indigo-700'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {gender}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Race / Ethnicity
          </label>
          <select
            required
            value={data.race}
            onChange={(e) => setData({ ...data, race: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-shadow bg-white"
          >
            <option value="" disabled>Select your ethnicity</option>
            <option value="Chinese">Chinese</option>
            <option value="Malay">Malay</option>
            <option value="Indian">Indian</option>
            <option value="Eurasian">Eurasian</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={!data.age || !data.gender || !data.race}
          className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-colors mt-4"
        >
          Start CCMQ Assessment
        </button>
      </form>
    </motion.div>
  );
}
