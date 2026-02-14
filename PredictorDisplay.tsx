
import React from 'react';
import { PredictionResult, WingoRecord } from '../types';
import { ShieldCheck, Target, Zap, Cpu } from 'lucide-react';

interface Props {
  prediction: PredictionResult | null;
  loading: boolean;
  history: WingoRecord[];
}

const PredictorDisplay: React.FC<Props> = ({ prediction, loading, history }) => {
  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden glass rounded-3xl border border-blue-500/20 p-6 shadow-[0_0_30px_rgba(59,130,246,0.1)]">
        <div className="flex items-center justify-between mb-6">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Target Issue</span>
            <div className="text-lg font-orbitron font-bold text-white">#{prediction?.nextIssue || '-----'}</div>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Confidence</span>
            <div className="text-lg font-orbitron font-bold text-blue-400">{prediction?.prediction.confidence || 0}%</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-slate-900/50 rounded-2xl p-4 border border-white/5 flex flex-col items-center justify-center space-y-1">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Size</span>
            <div className={`text-4xl font-orbitron font-bold ${prediction?.prediction.size === 'Big' ? 'text-rose-500' : 'text-blue-400'}`}>
              {prediction?.prediction.size || '---'}
            </div>
          </div>
          <div className="bg-slate-900/50 rounded-2xl p-4 border border-white/5 flex flex-col items-center justify-center space-y-1">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Color</span>
            <div className="flex items-center gap-2">
              <div className={`w-4 h-4 rounded-full ${prediction?.prediction.color === 'Green' ? 'bg-emerald-500' : 'bg-rose-500'} animate-pulse`} />
              <div className={`text-2xl font-orbitron font-bold ${prediction?.prediction.color === 'Green' ? 'text-emerald-500' : 'text-rose-500'}`}>
                {prediction?.prediction.color || '---'}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-2 mb-6">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
            <Zap className="w-3 h-3 text-amber-400" /> Hot Numbers
          </span>
          <div className="flex gap-3">
            {prediction?.prediction.numbers.map((n, i) => (
              <div key={i} className="flex-1 h-12 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-center text-xl font-orbitron font-bold text-blue-400">
                {n}
              </div>
            )) || [1, 2].map(i => <div key={i} className="flex-1 h-12 bg-slate-900 rounded-xl border border-white/5 animate-pulse" />)}
          </div>
        </div>

        <div className="pt-4 border-t border-white/5">
          <div className="flex items-start gap-3">
            <Cpu className="w-4 h-4 text-blue-400 shrink-0 mt-1" />
            <p className="text-[11px] text-slate-400 leading-relaxed italic">
              {prediction?.analysis || "Integrating real-time flow data. Calibrating quantum lattice for next prediction cycle..."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictorDisplay;
