
import React from 'react';

interface InputAreaProps {
  value: string;
  onChange: (val: string) => void;
  onSubmit: () => void;
  loading: boolean;
  isSavage: boolean;
  onToggleSavage: () => void;
}

const InputArea: React.FC<InputAreaProps> = ({ 
  value, 
  onChange, 
  onSubmit, 
  loading, 
  isSavage, 
  onToggleSavage 
}) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <label className={`text-sm font-bold uppercase tracking-wider ${isSavage ? 'text-red-400' : 'text-gray-700'}`}>
          What's the drama today, babe?
        </label>
        <div className="flex items-center space-x-2">
          <span className={`text-[10px] uppercase font-bold ${isSavage ? 'text-red-500' : 'text-gray-400'}`}>Savage</span>
          <button 
            onClick={onToggleSavage}
            className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${isSavage ? 'bg-red-600' : 'bg-gray-300'}`}
          >
            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ${isSavage ? 'translate-x-7' : 'translate-x-1'}`} />
          </button>
        </div>
      </div>
      
      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="I literally cannot even with this guy..."
          className={`w-full bg-white/10 border-b-2 outline-none py-4 px-2 text-xl font-serif transition-all duration-300 resize-none h-24 ${
            isSavage 
              ? 'border-red-600 text-red-200 placeholder-red-900/50' 
              : 'border-black text-black placeholder-gray-400'
          }`}
        />
      </div>

      <button
        onClick={onSubmit}
        disabled={loading || !value.trim()}
        className={`w-full py-4 uppercase tracking-widest font-bold text-sm transition-all duration-300 rounded-lg shadow-xl hover:scale-[1.02] active:scale-[0.98] ${
          isSavage 
            ? 'bg-red-700 text-white hover:bg-red-600' 
            : 'bg-black text-[#F7E7CE] hover:bg-gray-900'
        } disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        {loading ? 'Consulting the elites...' : 'Roast Me, Bro'}
      </button>
    </div>
  );
};

export default InputArea;
