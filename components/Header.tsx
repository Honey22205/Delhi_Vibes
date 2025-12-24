
import React from 'react';

interface HeaderProps {
  isSavage: boolean;
}

const Header: React.FC<HeaderProps> = ({ isSavage }) => {
  return (
    <div className="text-center space-y-2">
      <h1 className={`text-6xl md:text-8xl font-serif font-bold tracking-tighter transition-colors duration-500 ${isSavage ? 'text-red-600' : 'text-black'}`}>
        The Delh-I-Am
      </h1>
      <p className={`text-sm tracking-[0.3em] uppercase font-semibold ${isSavage ? 'text-red-400' : 'text-pink-600'}`}>
        {isSavage ? '💀 Savage Mode Active 💀' : '✨ High Fashion Judgment ✨'}
      </p>
    </div>
  );
};

export default Header;
