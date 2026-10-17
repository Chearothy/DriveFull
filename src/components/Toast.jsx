import React from 'react';

export default function Toast({ show, message }) {
  if (!show) return null;

  return (
    <div className="fixed bottom-20 md:bottom-6 right-6 bg-[#1e1f20] border border-blue-500/40 text-white text-xs px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 z-50 max-w-sm">
      <div className="p-2 bg-blue-500/20 text-blue-400 rounded-xl">
        <i className="fa-solid fa-circle-info text-base"></i>
      </div>
      <div dangerouslySetInnerHTML={{ __html: message }} />
    </div>
  );
}