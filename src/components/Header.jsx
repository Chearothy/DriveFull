import React from 'react';

export default function Header({ 
  onToggleMobileDrawer, 
  onToggleMobileSearch, 
  searchQuery, 
  setSearchQuery, 
  onOpenLinkModal, 
  onOpenUploadModal 
}) {
  return (
    <header className="h-16 border-b border-[#2d2e31] bg-[#1e1f20] px-4 flex items-center justify-between gap-4 sticky top-0 z-30">
      <div className="flex items-center gap-3 shrink-0">
        <button onClick={onToggleMobileDrawer} className="md:hidden p-2 text-slate-300 hover:bg-[#28292a] rounded-full transition">
          <i className="fa-solid fa-bars text-lg"></i>
        </button>
        <a href="#" className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-emerald-500 to-amber-400 p-0.5 flex items-center justify-center shadow">
            <div className="w-full h-full bg-[#1e1f20] rounded-[10px] flex items-center justify-center">
              <i className="fa-solid fa-folder-tree text-blue-400 text-lg"></i>
            </div>
          </div>
          <div className="hidden sm:block">
            <span className="font-bold text-base text-white tracking-tight leading-none block">Shared-Drive Gateway</span>
            <span className="text-[10px] text-emerald-400 font-semibold tracking-wider uppercase">Master OAuth + Shared Folders</span>
          </div>
        </a>
      </div>

      {/* Desktop Search Bar */}
      <div className="flex-1 max-w-2xl mx-auto hidden sm:block">
        <div className="relative flex items-center">
          <i className="fa-solid fa-magnifying-glass absolute left-4 text-slate-400 text-sm"></i>
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ស្វែងរកក្នុង Shared Folders ទាំងអស់ (Search Shared Drive)..." 
            className="w-full pl-11 pr-10 py-2.5 bg-[#28292a] border border-transparent focus:border-blue-500/50 hover:bg-[#323335] text-slate-100 placeholder-slate-400 rounded-full text-xs outline-none transition"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        <button onClick={onToggleMobileSearch} className="sm:hidden p-2 text-slate-300 hover:bg-[#28292a] rounded-full">
          <i className="fa-solid fa-magnifying-glass text-base"></i>
        </button>

        <div className="hidden lg:flex items-center gap-2 bg-blue-950/40 border border-blue-500/30 px-3 py-1.5 rounded-full text-xs">
          <i className="fa-solid fa-key text-blue-400 text-xs"></i>
          <span className="text-slate-300">Master: <strong className="text-blue-300">gateway.master@gmail.com</strong></span>
        </div>

        <button onClick={onOpenLinkModal} className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-3 py-1.5 rounded-full text-xs transition flex items-center gap-1.5 shadow">
          <i className="fa-solid fa-folder-plus text-xs"></i>
          <span className="hidden sm:inline">+ ភ្ជាប់ Shared Folder</span>
        </button>

        <div className="w-9 h-9 rounded-full bg-blue-600 p-0.5 flex items-center justify-center font-bold text-xs text-white shadow">
          GW
        </div>
      </div>
    </header>
  );
}