
import React from 'react';
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area
} from 'recharts';
import { WingoRecord } from '../types';

interface Props {
  history: WingoRecord[];
}

const AnalysisPanel: React.FC<Props> = ({ history }) => {
  const chartData = [...history].reverse();

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 border border-slate-700 p-2 rounded-lg shadow-xl">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">Issue: {label}</p>
          <p className="text-lg font-orbitron font-bold text-blue-400">Value: {payload[0].value}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-48 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
          <XAxis dataKey="issue" hide />
          <YAxis domain={[0, 9]} hide />
          <Tooltip content={<CustomTooltip />} />
          <Area 
            type="monotone" 
            dataKey="number" 
            stroke="#3b82f6" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorVal)" 
            animationDuration={800}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AnalysisPanel;
