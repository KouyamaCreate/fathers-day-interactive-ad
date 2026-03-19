'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Share2, MessageCircle, BarChart3, TrendingUp, Sparkles } from 'lucide-react';
import LineMock from './LineMock';

interface ResultScreenProps {
  hobby: string;
  reason: string;
}

export default function ResultScreen({ hobby, reason }: ResultScreenProps) {
  const [showLineMock, setShowLineMock] = useState(false);

  // Randomize some "AI stats" based on hobby/reason for that "当たってる感"
  const cryProb = 85 + Math.floor(Math.random() * 10);
  const drinkLeak = 70 + Math.floor(Math.random() * 20);
  const laughCount = 10 + Math.floor(Math.random() * 8);

  if (showLineMock) {
    return <LineMock hobby={hobby} cryProb={cryProb} />;
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute inset-0 z-40 bg-primary text-white overflow-y-auto"
    >
      {/* Visual Header */}
      <div className="relative h-48 flex items-center justify-center overflow-hidden">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ repeat: Infinity, duration: 4 }}
          className="absolute inset-0 bg-gradient-to-br from-accent via-secondary to-primary blur-3xl"
        />
        <div className="relative z-10 text-center">
          <Sparkles className="mx-auto mb-2 text-secondary" size={40} />
          <h2 className="text-xl font-bold tracking-widest uppercase">AI分析完了</h2>
        </div>
      </div>

      <div className="px-6 pb-20 space-y-6">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white/10 rounded-3xl p-6 border border-white/10"
        >
          <div className="flex items-center gap-2 mb-4 text-secondary">
            <BarChart3 size={20} />
            <span className="font-bold text-sm">シミュレーション結果</span>
          </div>
          
          <div className="space-y-6">
            <StatRow 
              label="お父さんが泣く確率" 
              value={`${cryProb}%`} 
              desc={`${hobby}好きの情緒に作用`} 
              color="#f56565"
            />
            <StatRow 
              label="黒歴史ポロリ確率" 
              value={`${drinkLeak}%`} 
              desc="3杯目で防衛ラインが突破される" 
              color="#ed8936"
            />
            <StatRow 
              label="今日の笑い回数予測" 
              value={`${laughCount}回`} 
              desc="懐かしい話題で盛り上がる" 
              color="#48bb78"
            />
          </div>
        </motion.div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center p-4"
        >
          <p className="text-sm opacity-60 mb-2">AIからのメッセージ</p>
          <h3 className="text-lg font-bold">
            「お父さんは今、あなたからの<br/>
            『{hobby}』にまつわる一言を待っています。」
          </h3>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="absolute bottom-10 inset-x-6 z-50 pointer-events-auto"
        >
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowLineMock(true)}
            className="w-full bg-accent text-white py-5 rounded-full font-black text-lg shadow-2xl flex items-center justify-center gap-3"
          >
            <MessageCircle size={24} />
            父をノンアル居酒屋に招待する
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}

function StatRow({ label, value, desc, color }: { label: string, value: string, desc: string, color: string }) {
  return (
    <div>
      <div className="flex justify-between items-end mb-1">
        <span className="text-xs opacity-80">{label}</span>
        <span className="text-2xl font-black text-secondary">{value}</span>
      </div>
      <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: value.includes('%') ? value : '60%' }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="h-full"
          style={{ backgroundColor: color }}
        />
      </div>
      <p className="text-[10px] mt-1 opacity-50">{desc}</p>
    </div>
  );
}
