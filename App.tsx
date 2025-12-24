
import React, { useState, useEffect, useCallback } from 'react';
import { generateSavageRoast } from './services/geminiService';
import { RoastResponse, AppTheme } from './types';
import { COLORS, LOADING_MESSAGES } from './constants';
import Header from './components/Header';
import InputArea from './components/InputArea';
import ResultView from './components/ResultView';

const App: React.FC = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState(LOADING_MESSAGES[0]);
  const [result, setResult] = useState<RoastResponse | null>(null);
  const [isSavage, setIsSavage] = useState(false);
  const [isMomMode, setIsMomMode] = useState(false);

  useEffect(() => {
    let interval: number;
    if (loading) {
      interval = window.setInterval(() => {
        setLoadingMsg(LOADING_MESSAGES[Math.floor(Math.random() * LOADING_MESSAGES.length)]);
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleRoast = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setResult(null);
    setIsMomMode(false);
    try {
      const data = await generateSavageRoast(input, isSavage);
      setResult(data);
    } catch (error) {
      console.error("The drama was too much even for AI:", error);
    } finally {
      setLoading(false);
    }
  };

  const themeClass = isSavage 
    ? "bg-gradient-to-br from-[#8B0000] via-black to-[#4B0000]" 
    : "bg-gradient-to-br from-[#FF69B4] via-[#F7E7CE] to-[#FFC0CB]";

  return (
    <div className={`min-h-screen transition-all duration-700 flex flex-col items-center justify-center p-4 ${themeClass}`}>
      <div className="w-full max-w-2xl relative">
        <Header isSavage={isSavage} />
        
        <div className={`glass rounded-3xl p-8 mt-8 shadow-2xl transition-all duration-500 ${isSavage ? 'savage-glow border-red-500/50' : 'border-white/20'}`}>
          <InputArea 
            value={input}
            onChange={setInput}
            onSubmit={handleRoast}
            loading={loading}
            isSavage={isSavage}
            onToggleSavage={() => setIsSavage(!isSavage)}
          />

          {loading && (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <div className="w-16 h-16 border-4 border-dashed border-[#F7E7CE] rounded-full animate-spin"></div>
              <p className={`font-serif text-lg italic animate-pulse ${isSavage ? 'text-red-400' : 'text-gray-800'}`}>
                {loadingMsg}
              </p>
            </div>
          )}

          {result && !loading && (
            <ResultView 
              result={result} 
              isSavage={isSavage} 
              isMomMode={isMomMode}
              onToggleMomMode={() => setIsMomMode(!isMomMode)}
            />
          )}
        </div>

        {/* Floating Aesthetic Elements */}
        {!isSavage && (
          <>
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-white/20 blur-3xl rounded-full"></div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-pink-300/30 blur-3xl rounded-full"></div>
          </>
        )}
      </div>

      <footer className="mt-8 text-xs font-light opacity-50 tracking-widest uppercase">
        Built for the Elites | GK-II Approved
      </footer>
    </div>
  );
};

export default App;
