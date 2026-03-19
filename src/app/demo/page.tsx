'use client';

import React from 'react';

/**
 * Demo Page - Full screen PDF Preview
 * Note: The user will upload 'demo.pdf' to the public/ folder later.
 */
export default function DemoPage() {
  return (
    <main className="w-full h-screen overflow-hidden bg-white flex flex-col">
      <div className="flex-1 w-full h-full relative group">
        <embed
          src="/demo.pdf"
          type="application/pdf"
          className="w-full h-full border-none shadow-inner"
        />
        
        {/* Floating Controls for Overlay */}
        <div className="absolute top-4 right-4 flex gap-2">
          <a 
            href="/demo.pdf" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-white/90 backdrop-blur-sm text-gray-800 px-4 py-2 rounded-lg text-sm font-bold shadow-lg border border-gray-200 hover:bg-white transition-all pointer-events-auto"
          >
            別タブで開く
          </a>
        </div>

        {/* Dynamic Fallback if PDF fails */}
        <div className="absolute inset-0 flex items-center justify-center -z-10 bg-gray-50">
          <div className="text-center p-8">
            <p className="text-gray-500 mb-4 font-medium">PDFを読み込んでいます...</p>
            <p className="text-xs text-gray-400">表示されない場合は、右上の「別タブで開く」をお試しください。</p>
          </div>
        </div>
      </div>
    </main>
  );
}
