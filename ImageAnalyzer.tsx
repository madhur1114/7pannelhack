
import React, { useState, useRef } from 'react';
import { Camera, Scan, Loader2, Image as ImageIcon } from 'lucide-react';
import { analyzeGameScreen } from '../services/geminiService';

const ImageAnalyzer: React.FC = () => {
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64 = event.target?.result as string;
      setPreview(base64);
      setAnalyzing(true);
      try {
        const rawBase64 = base64.split(',')[1];
        const res = await analyzeGameScreen(rawBase64);
        setResult(res || 'Analysis complete.');
      } catch (err) {
        setResult('Vision analysis failed.');
      } finally {
        setAnalyzing(false);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-4">
      <div className="glass rounded-3xl border border-white/5 p-6 flex flex-col items-center text-center space-y-4">
        <div className="w-16 h-16 bg-blue-600/10 rounded-2xl flex items-center justify-center border border-blue-600/20">
          <Scan className="w-8 h-8 text-blue-400" />
        </div>
        <div className="space-y-1">
          <h2 className="text-sm font-bold tracking-widest uppercase">AI Vision Analysis</h2>
          <p className="text-[10px] text-slate-500 uppercase">Upload a screenshot of your game for instant pattern extraction</p>
        </div>
        
        <input type="file" ref={fileInputRef} onChange={handleFile} className="hidden" accept="image/*" />
        <button 
          onClick={() => fileInputRef.current?.click()}
          className="w-full bg-blue-600 hover:bg-blue-500 p-3 rounded-2xl flex items-center justify-center gap-2 text-xs font-bold transition-all"
        >
          <Camera className="w-4 h-4" /> {analyzing ? 'Analyzing...' : 'Capture Screenshot'}
        </button>
      </div>

      {preview && (
        <div className="glass rounded-3xl border border-white/5 p-4 space-y-4">
          <img src={preview} className="w-full rounded-2xl border border-white/10" alt="Preview" />
          {analyzing ? (
            <div className="flex items-center gap-3 py-4 text-blue-400">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span className="text-xs font-bold uppercase tracking-widest">Processing Quantum Patterns...</span>
            </div>
          ) : result && (
            <div className="bg-slate-900/50 p-4 rounded-2xl border border-white/5">
              <h4 className="text-[10px] font-bold text-slate-500 uppercase mb-2">Vision Report</h4>
              <p className="text-xs text-slate-300 leading-relaxed italic whitespace-pre-wrap">{result}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageAnalyzer;
