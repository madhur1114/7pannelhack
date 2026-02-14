
import React from 'react';
import { WingoRecord } from '../types';
import { Clock } from 'lucide-react';

interface Props {
  history: WingoRecord[];
}

const HistoryTable: React.FC<Props> = ({ history }) => {
  return (
    <div className="glass rounded-3xl border border-slate-800 p-6 overflow-hidden">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-4 h-4 text-slate-400" />
        <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest">Live History</h3>
      </div>

      <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
        {history.map((record, idx) => (
          <div 
            key={record.issue} 
            className="flex items-center justify-between p-3 rounded-xl bg-slate-900/40 border border-slate-800/50 hover:border-slate-700 transition-all group"
          >
            <div className="flex flex-col">
              <span className="text-[10px] font-mono text-slate-500 tracking-tighter">#{record.issue}</span>
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-lg shadow-lg group-hover:scale-110 transition-transform ${
                  record.color === 'Red' ? 'bg-rose-600 text-white' : 
                  record.color === 'Green' ? 'bg-emerald-600 text-white' : 'bg-purple-600 text-white'
                }`}>
                  {record.number}
                </div>
                <div className="flex flex-col">
                   <span className={`text-[10px] font-bold uppercase tracking-wider ${record.size === 'Big' ? 'text-rose-400' : 'text-cyan-400'}`}>
                    {record.size}
                  </span>
                  <span className={`text-[8px] font-medium uppercase tracking-wider text-slate-500`}>
                    {record.color}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <div 
                  key={i} 
                  className={`w-1 h-1 rounded-full ${idx === 0 ? 'animate-pulse bg-cyan-400' : 'bg-slate-800'}`} 
                />
              ))}
            </div>
          </div>
        ))}
        {history.length === 0 && (
          <div className="text-center py-10 text-slate-500 text-xs font-mono uppercase italic">
            Connecting to Data Stream...
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryTable;
