
import React from 'react';
import { RoastResponse } from '../types';

interface ResultViewProps {
  result: RoastResponse;
  isSavage: boolean;
  isMomMode: boolean;
  onToggleMomMode: () => void;
}

const ResultView: React.FC<ResultViewProps> = ({ 
  result, 
  isSavage, 
  isMomMode, 
  onToggleMomMode 
}) => {
  const [copied, setCopied] = React.useState(false);

  const copyToClipboard = () => {
    const textToCopy = isMomMode ? result.momMode : result.poem;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-12 animate-float space-y-8">
      <div className="text-center">
        <span className={`text-[10px] px-2 py-1 rounded uppercase font-bold ${isSavage ? 'bg-red-600 text-white' : 'bg-black text-gold'}`}>
          Judgment: {result.judgment}
        </span>
      </div>

      <div className={`p-8 text-center relative ${isSavage ? 'text-red-100' : 'text-gray-900'}`}>
        <p className={`text-2xl md:text-3xl font-serif italic leading-relaxed whitespace-pre-line`}>
          "{isMomMode ? result.momMode : result.poem}"
        </p>
        
        {/* Decorative Quotation marks */}
        <span className="absolute top-0 left-0 text-6xl opacity-20 font-serif">“</span>
        <span className="absolute bottom-0 right-0 text-6xl opacity-20 font-serif">”</span>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center pt-6 border-t border-white/10">
        <button
          onClick={onToggleMomMode}
          className={`px-6 py-3 rounded-full text-xs font-bold uppercase tracking-tighter transition-all ${
            isMomMode 
              ? 'bg-[#F7E7CE] text-black ring-2 ring-black' 
              : 'bg-white/10 hover:bg-white/20 text-current'
          }`}
        >
          {isMomMode ? '✨ Back to Gen-Z ✨' : '👩‍🍳 Mom Mode'}
        </button>

        <button
          onClick={copyToClipboard}
          className={`px-6 py-3 rounded-full text-xs font-bold uppercase tracking-tighter transition-all flex items-center space-x-2 ${
            isSavage ? 'bg-red-900 hover:bg-red-800' : 'bg-pink-500 hover:bg-pink-400'
          } text-white`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          <span>{copied ? 'Story Ready!' : 'Copy to Story'}</span>
        </button>
      </div>
      
      {copied && (
        <p className="text-center text-[10px] uppercase font-bold tracking-widest animate-pulse">
          Copied to clipboard. Now go flex on IG.
        </p>
      )}
    </div>
  );
};

export default ResultView;
