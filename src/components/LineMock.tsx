'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Send, Phone, Video, Menu, MoreHorizontal, User, Sparkles } from 'lucide-react';


interface LineMockProps {
  hobby: string;
  cryProb: number;
}

export default function LineMock({ hobby, cryProb }: LineMockProps) {
  const [messages, setMessages] = useState<string[]>([]);
  const templateMessage = `お父さん、久しぶりに飲みに行かない？AIで調べたら「${hobby}」の話題でお父さんが泣く確率${cryProb}%だったよ（笑）。ノンアル居酒屋予約しとくね！ https://example-fathers-day.vercel.app/invite`;

  useEffect(() => {
    // Simulate automatic message population or "sending"
    const timer = setTimeout(() => {
      setMessages([templateMessage]);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div 
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      className="absolute inset-0 z-[60] bg-[#8cabd9] flex flex-col font-sans"
    >
      {/* LINE Header */}
      <div className="bg-[#1f2126] text-white p-4 pt-10 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <ArrowLeft size={20} className="opacity-80" />
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gray-500 rounded-full flex items-center justify-center">
              <User size={24} className="text-gray-300" />
            </div>
            <span className="font-bold text-lg">お父さん</span>
          </div>
        </div>
        <div className="flex items-center gap-4 opacity-80">
          <Phone size={20} />
          <Video size={20} />
          <Menu size={20} />
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="text-center">
          <span className="bg-black/10 text-[10px] text-white/80 px-3 py-1 rounded-full">2024.06.16 (日)</span>
        </div>

        <AnimatePresence>
          {messages.map((m, i) => (
            <motion.div 
              key={i}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex justify-end items-end gap-2"
            >
              <span className="text-[10px] text-white/50 mb-1">既読</span>
              <div className="bg-[#7cfc00] text-black p-3 rounded-2xl rounded-tr-none max-w-[80%] text-sm shadow-sm relative">
                {m.split(' ').map((part, idx) => (
                  part.startsWith('http') ? (
                    <a key={idx} href="/next-experience" className="text-blue-700 underline block mt-2">
                      {part}
                    </a>
                  ) : part
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {messages.length === 0 && (
          <div className="italic text-white/30 text-xs text-center mt-10">
            メッセージを入力中...
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="bg-white p-3 pb-8 flex items-center gap-3">
        <div className="text-gray-400 flex gap-3">
          <MoreHorizontal size={24} />
          <div className="bg-gray-100 rounded-lg px-2 py-1 text-xs">A</div>
        </div>
        <div className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm text-gray-400">
          メッセージを入力
        </div>
        <Send size={24} className="text-gray-400" />
      </div>

      {/* Navigation Layer Hint */}
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 pointer-events-none"
      >
        <div className="bg-black/80 text-white p-6 rounded-2xl text-center shadow-2xl">
          <Sparkles className="mx-auto mb-3 text-secondary" size={32} />
          <p className="font-bold mb-2">送信完了！</p>
          <p className="text-xs opacity-70">上のリンクをクリックして<br/>お父さん側の体験を見に行こう</p>
        </div>
      </motion.div>
    </motion.div>
  );
}


