'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Gift, ArrowRight } from 'lucide-react';

export default function NextExperience() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center space-y-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', damping: 12 }}
          className="w-24 h-24 bg-accent/10 rounded-full flex items-center justify-center mx-auto"
        >
          <Gift className="text-accent" size={48} />
        </motion.div>

        <div className="space-y-4">
          <h1 className="text-3xl font-black text-primary italic">THANK YOU!</h1>
          <p className="text-gray-600 leading-relaxed">
            ここから先は、後日実装予定の<br/>
            「お父さん視点」の体験につながります。
          </p>
          <div className="h-px w-20 bg-gray-200 mx-auto" />
          <p className="text-sm text-gray-400">
            招待されたお父さんがメッセージを確認し、<br/>
            居酒屋のメニューやサプライズ動画を見るフローへと続きます。
          </p>
        </div>

        <motion.button
          whileHover={{ x: 5 }}
          onClick={() => window.location.href = '/'}
          className="flex items-center gap-2 text-accent font-bold mx-auto group"
        >
          最初に戻る <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </motion.button>

        <div className="pt-12 flex justify-center gap-2 items-center text-gray-300">
          <Heart size={16} fill="currentColor" />
          <span className="text-[10px] tracking-widest font-bold">FATHER'S DAY 2024</span>
        </div>
      </div>
    </main>
  );
}
