import React, { useEffect, useRef, useState } from 'react';
import { randomPoints } from '../helper/alphabets';
import useGameStore from '../store/gameStore';

const TypingTest: React.FC = () => {
  const {
    currentText,
    userInput,
    timeLeft,
    isGameActive,
    wpm,
    accuracy,
    countdown,
    MyScore,
    setMyScore,
    updateUserInput,
    chatId
  } = useGameStore();
  const inputRef = useRef<HTMLInputElement>(null);

  const [pointAnimations, setPointAnimations] = useState<{ id: string; value: number }[]>([]);
  const [Mypoint, setPoint] = useState<number>(0);
  const [nonce, setNonce] = useState(0);

  useEffect(() => {
    async function fetchNonce() {
      try {
        // const latestNonce = await getLatestNonce(chatId);
        // setNonce(latestNonce + 1);
      } catch (error) {
        console.error('Error fetching latest nonce:', error);
      }
    }
    fetchNonce();
  }, [chatId]);

  // Focus input on game start
  useEffect(() => {
    if (isGameActive && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isGameActive]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isGameActive || countdown > 0) return;

    const value = e.target.value;
    const lastChar = value[value.length - 1];
    const nextChar = currentText[userInput.length];

    if (lastChar === nextChar && lastChar !== ' ') {
      const pointsValue = randomPoints(nextChar);
      setPoint((prev) => prev + pointsValue);
      setNonce(nonce + 1);

      setPointAnimations((prev) => [...prev, { id: Date.now().toString(), value: pointsValue }]);
      setTimeout(() => {
        setPointAnimations((prev) => prev.slice(1));
      }, 1000);
    }

    updateUserInput(value);
    setMyScore(Mypoint);
  };



  return (
    <div className="w-full max-w-4xl mx-auto" onClick={() => inputRef.current?.focus()}>
      <input
        ref={inputRef}
        type="text"
        value={userInput}
        onChange={handleChange}
        className="absolute opacity-0"
        autoCapitalize="none"
        autoCorrect="off"
      />

      <div className="space-y-8">
        {/* Stats Section */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-br from-[#1a2e1a] to-[#2d4a2d] rounded-xl shadow-xl shadow-green-900/30 px-6 py-3 border border-green-700/30">
              <p className="text-[#4ade80] font-medium">time</p>
              <p className="text-2xl font-bold text-white">{timeLeft}s</p>
            </div>
            <div className="bg-gradient-to-br from-[#1a2e1a] to-[#2d4a2d] rounded-xl shadow-xl shadow-green-900/30 px-6 py-3 border border-green-700/30">
              <p className="text-[#4ade80] font-medium">wpm</p>
              <p className="text-2xl font-bold bg-gradient-to-r from-[#00ff88] to-[#4ade80] bg-clip-text text-transparent">{wpm}</p>
            </div>
            <div className="bg-gradient-to-br from-[#1a2e1a] to-[#2d4a2d] rounded-xl shadow-xl shadow-green-900/30 px-6 py-3 border border-green-700/30">
              <p className="text-[#4ade80] font-medium">acc</p>
              <p className="text-2xl font-bold text-white">{accuracy}%</p>
            </div>
          </div>
        </div>

        {/* Typing Text Display */}
        <div className="bg-gradient-to-br from-[#1a2e1a] to-[#2d4a2d] rounded-2xl shadow-2xl shadow-green-900/30 p-8 border border-green-800/30 backdrop-blur-sm">
          <div className="text-2xl leading-relaxed font-mono tracking-wide" style={{ minHeight: '200px' }}>
            {currentText.split('').map((char, index) => {
              let className = 'text-gray-400';
              if (index < userInput.length) {
                className = userInput[index] === char ? 'text-[#00ff88] font-semibold' : 'text-red-400 bg-red-900/20 rounded px-0.5';
              } else if (index === userInput.length) {
                className = 'bg-gradient-to-r from-[#00ff88] to-[#4ade80] text-black rounded px-1 font-bold animate-pulse';
              }
              return <span key={index} className={className}>{char}</span>;
            })}
          </div>

          {/* Point Animations */}
          {pointAnimations.map((anim) => (
            <div
              key={anim.id}
              className="point-animation absolute text-[#00ff88] font-bold text-xl drop-shadow-lg animate-bounce"
              style={{ transform: 'translateX(-50%) translateY(-40%)' }}
            >
              +{anim.value}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TypingTest;