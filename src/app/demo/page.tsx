'use client';

import React from 'react';

/**
 * Demo Page - Full screen PDF Preview
 * Note: The user will upload 'demo.pdf' to the public/ folder later.
 */
export default function DemoPage() {
  return (
    <main className="w-full h-screen overflow-hidden bg-gray-100 flex flex-col">
      <div className="flex-1 w-full h-full relative">
        <iframe 
          src="/demo.pdf" 
          className="absolute inset-0 w-full h-full border-none shadow-inner"
          title="Manual PDF Preview"
        />
        {/* Fallback link if iframe has issues */}
        <div className="absolute inset-x-0 bottom-4 text-center pointer-events-none">
          <p className="text-xs text-gray-400 bg-white/80 inline-block px-3 py-1 rounded-full border border-gray-200 shadow-sm pointer-events-auto">
            PDFが表示されない場合は <a href="/demo.pdf" className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">こちらをクリック</a>
          </p>
        </div>
      </div>
    </main>
  );
}
