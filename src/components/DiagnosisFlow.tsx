'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, MessageCircle, Heart, Coffee, Briefcase, Fish } from 'lucide-react';

import ResultScreen from './ResultScreen';

type Step = 'video' | 'q1' | 'q2' | 'analyzing' | 'result';

const HOBBIES = [
  { id: 'golf', label: 'ゴルフ', icon: Trophy, color: '#48bb78' },
  { id: 'fishing', label: '釣り', icon: Fish, color: '#4299e1' },
  { id: 'work', label: '仕事', icon: Briefcase, color: '#718096' },
  { id: 'grandkids', label: '孫', icon: Heart, color: '#f56565' },
  { id: 'alcohol', label: '晩酌', icon: Coffee, color: '#ed8936' },
];

const REASONS = [
  { id: 'busy', label: '仕事が忙しい', sub: 'ついつい後回しに' },
  { id: 'awkward', label: 'なんとなく気まずい', sub: '何を話せばいいか…' },
  { id: 'no_topic', label: '共通の話題がない', sub: '最近の父を知らない' },
  { id: 'distance', label: '遠くに住んでいる', sub: '物理的な距離が' },
];

export default function DiagnosisFlow() {
  const [step, setStep] = useState<Step>('video');
  const [answers, setAnswers] = useState({ hobby: '', reason: '' });
  const [videoEnded, setVideoEnded] = useState(false);

  // Simulate video end or "Tap to Start"
  const startDiagnosis = () => setStep('q1');

  const handleHobbySelect = (id: string) => {
    setAnswers(prev => ({ ...prev, hobby: id }));
    setStep('q2');
  };

  const handleReasonSelect = (id: string) => {
    setAnswers(prev => ({ ...prev, reason: id }));
    setStep('analyzing');
  };

  useEffect(() => {
    if (step === 'analyzing') {
      const timer = setTimeout(() => setStep('result'), 2500);
      return () => clearTimeout(timer);
    }
  }, [step]);

  return (
    <div className="ad-container">
      {/* Background Layer (visible after intro) */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#1a365d] to-[#0f172a]" />

      <AnimatePresence mode="wait">
        {!videoEnded && (
          <motion.div 
            key="intro-video"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 z-50 bg-black"
          >
            <video 
              className="w-full h-full object-cover"
              autoPlay 
              muted 
              onEnded={() => setVideoEnded(true)}
              playsInline
            >
              <source src="/intro.mp4" type="video/mp4" />
            </video>
          </motion.div>
        )}

        {step === 'video' && videoEnded && (
          <motion.div 
            key="video-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-white text-center cursor-pointer"
            onClick={startDiagnosis}
          >
            <div className="absolute inset-0 bg-black/20" />
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring' }}
              className="relative z-20 flex flex-col items-center"
            >
              <motion.div 
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="bg-white text-primary px-10 py-5 rounded-full font-black text-2xl shadow-[0_0_30px_rgba(255,255,255,0.4)] flex items-center gap-3"
              >
                タップして診断を開始
              </motion.div>
              <p className="mt-8 text-lg font-medium tracking-widest drop-shadow-lg">
                FATHER'S DAY 2024<br/>
                <span className="text-sm opacity-70">AIが導き出す最高の一日</span>
              </p>
            </motion.div>
          </motion.div>
        )}

        {step === 'q1' && (
          <motion.div 
            key="q1"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="absolute inset-x-0 bottom-0 z-20 glass rounded-t-3xl p-8 pb-12"
          >
            <h2 className="text-2xl font-bold mb-6 text-center">お父さんの最近の趣味は？</h2>
            <div className="grid grid-cols-2 gap-4">
              {HOBBIES.map((h) => (
                <motion.button
                  key={h.id}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleHobbySelect(h.id)}
                  className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white/50 border border-white/20 hover:bg-white/80 transition-colors"
                >
                  <h.icon size={32} color={h.color} className="mb-2" />
                  <span className="font-medium">{h.label}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 'q2' && (
          <motion.div 
            key="q2"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            className="absolute inset-x-0 bottom-0 z-20 glass rounded-t-3xl p-8 pb-12"
          >
            <h2 className="text-2xl font-bold mb-6 text-center">最近お父さんと話せてない理由は？</h2>
            <div className="space-y-4">
              {REASONS.map((r) => (
                <motion.button
                  key={r.id}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleReasonSelect(r.id)}
                  className="w-full flex items-center justify-between p-4 rounded-2xl bg-white/50 border border-white/20 text-left"
                >
                  <div>
                    <div className="font-bold">{r.label}</div>
                    <div className="text-xs opacity-60">{r.sub}</div>
                  </div>
                  <div className="text-accent">→</div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 'analyzing' && (
          <motion.div 
            key="analyzing"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-primary/90 text-white p-10 text-center"
          >
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full mb-8"
            />
            <h2 className="text-3xl font-black mb-4">AIが勝手に分析中...</h2>
            <div className="text-sm space-y-2 opacity-80">
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>趣味データを読み込み完了</motion.p>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }}>会話ログ（予測）を生成中</motion.p>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>お父さんの涙腺をシミュレート中...</motion.p>
            </div>
          </motion.div>
        )}

        {step === 'result' && (
          <ResultScreen key="result" hobby={answers.hobby} reason={answers.reason} />
        )}
      </AnimatePresence>
    </div>
  );
}
