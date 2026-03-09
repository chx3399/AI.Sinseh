import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Camera, AlertCircle, Info } from 'lucide-react';
import { TongueData } from '../types';

interface TongueAnalysisProps {
  onComplete: (data: TongueData) => void;
}

export function TongueAnalysis({ onComplete }: TongueAnalysisProps) {
  const [data, setData] = useState<TongueData>({
    coatingColor: '',
    texture: '',
    bodyColor: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (data.coatingColor && data.texture && data.bodyColor) {
      onComplete(data);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-sm border border-slate-100"
    >
      <div className="flex justify-center mb-6">
        <div className="p-3 bg-rose-50 rounded-full">
          <Camera className="w-8 h-8 text-rose-600" />
        </div>
      </div>
      
      <h2 className="text-2xl font-semibold text-center text-slate-900 mb-2">
        Tongue Analysis
      </h2>
      <p className="text-center text-slate-500 mb-6 text-sm">
        Multimodal Diagnostic Bolstering. Please describe your tongue characteristics.
      </p>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 flex items-start space-x-3">
        <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-amber-800">
          In a full clinical setting, this would use AI image analysis. For this prototype, please select the features manually based on the guide below.
        </p>
      </div>

      <div className="mb-8 p-6 bg-slate-50 rounded-2xl border border-slate-200">
        <div className="flex items-center space-x-2 mb-4">
          <Info className="w-5 h-5 text-indigo-600" />
          <h3 className="text-lg font-semibold text-slate-800">Visual Identification Guide</h3>
        </div>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-medium text-slate-900 mb-2">Tongue Body Color</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li className="flex items-start"><span className="font-semibold text-rose-400 w-24 flex-shrink-0">Pale:</span> Looks light pink or whitish (indicates Qi/Blood deficiency).</li>
              <li className="flex items-start"><span className="font-semibold text-red-600 w-24 flex-shrink-0">Red/Crimson:</span> Bright or dark red (indicates Internal Heat).</li>
              <li className="flex items-start"><span className="font-semibold text-purple-600 w-24 flex-shrink-0">Purple/Dusky:</span> Tint of blue or dark spots (indicates Blood Stasis).</li>
            </ul>
          </div>
          
          <div className="border-t border-slate-200 pt-4">
            <h4 className="font-medium text-slate-900 mb-2">Tongue Coating</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li className="flex items-start"><span className="font-semibold text-slate-400 w-24 flex-shrink-0">White/Thin:</span> Normal or early-stage "Cold" pattern.</li>
              <li className="flex items-start"><span className="font-semibold text-amber-500 w-24 flex-shrink-0">Yellow/Thick:</span> Indicates "Heat" or "Dampness."</li>
              <li className="flex items-start"><span className="font-semibold text-slate-500 w-24 flex-shrink-0">Greasy:</span> Looks like a layer of oil or cottage cheese that is hard to scrape off (indicates Phlegm-Dampness).</li>
            </ul>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-3">
            Coating Color
          </label>
          <div className="grid grid-cols-2 gap-3">
            {['White', 'Yellow'].map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => setData({ ...data, coatingColor: color as any })}
                className={`py-3 px-4 rounded-xl border text-sm font-medium transition-colors ${
                  data.coatingColor === color
                    ? 'bg-rose-50 border-rose-200 text-rose-700'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-3">
            Texture
          </label>
          <div className="grid grid-cols-3 gap-3">
            {['Greasy', 'Thin', 'Peeled'].map((texture) => (
              <button
                key={texture}
                type="button"
                onClick={() => setData({ ...data, texture: texture as any })}
                className={`py-3 px-2 rounded-xl border text-sm font-medium transition-colors ${
                  data.texture === texture
                    ? 'bg-rose-50 border-rose-200 text-rose-700'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {texture}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-3">
            Body Color
          </label>
          <div className="grid grid-cols-3 gap-3">
            {['Pale', 'Red', 'Purple'].map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => setData({ ...data, bodyColor: color as any })}
                className={`py-3 px-2 rounded-xl border text-sm font-medium transition-colors ${
                  data.bodyColor === color
                    ? 'bg-rose-50 border-rose-200 text-rose-700'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={!data.coatingColor || !data.texture || !data.bodyColor}
          className="w-full py-3 px-4 bg-rose-600 hover:bg-rose-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-colors mt-4"
        >
          Generate Health Dashboard
        </button>
      </form>
    </motion.div>
  );
}
