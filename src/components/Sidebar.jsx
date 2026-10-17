import React from 'react';

export default function Sidebar({ 
  sharedFolders, 
  totalUsed, 
  totalCapacity, 
  totalPercent, 
  onOpenUploadModal, 
  onOpenManagerModal, 
  onOpenLinkModal 
}) {
  return (
    <aside className="w-64 border-r border-[#2d2e31] bg-[#1e1f20] hidden md:flex flex-col justify-between p-4 shrink-0 overflow-y-auto">
      <div className="space-y-5">
        <button onClick={onOpenUploadModal} className="w-full bg-[#28292a] hover:bg-[#323335] text-slate-100 border border-[#3c3d40] font-semibold py-3 px-4 rounded-2xl shadow transition flex items-center gap-3 text-xs group">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-500 via-emerald-500 to-amber-400 flex items-center justify-center shadow">
            <i className="fa-solid fa-cloud-arrow-up text-white text-sm group-hover:scale-110 transition duration-300"></i>
          </div>
          <span>អាប់ឡូតវីដេអូ / ឯកសារ</span>
        </button>

        <nav className="space-y-1 text-xs font-medium">
          <a href="#" className="flex items-center gap-3 px-3.5 py-2.5 rounded-full bg-blue-600/20 text-blue-400 font-bold">
            <i className="fa-solid fa-folder-tree w-4 text-center"></i>
            <span>គ្រប់ Shared Folders (All Drives)</span>
          </a>
          <a href="#" onClick={(e) => { e.preventDefault(); onOpenManagerModal(); }} className="flex items-center gap-3 px-3.5 py-2.5 rounded-full text-slate-300 hover:bg-[#28292a] transition">
            <i className="fa-solid fa-diagram-project w-4 text-center text-emerald-400"></i>
            <span>គ្រប់គ្រង Shared Folders ({sharedFolders.length})</span>
          </a>
        </nav>

        <hr className="border-[#2d2e31]" />

        <div className="space-y-2.5">
          <div className="flex items-center justify-between px-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Shared Folders ភ្ជាប់</span>
            <button onClick={onOpenLinkModal} className="text-[11px] text-emerald-400 hover:underline flex items-center gap-1 font-semibold">+ ថែម</button>
          </div>

          <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
            {sharedFolders.map((sf) => {
              const percent = Math.min(100, Math.round((sf.used / sf.capacity) * 100));
              return (
                <div key={sf.id} className="bg-[#28292a] p-2.5 rounded-xl border border-[#36373a] space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white text-[11px] truncate max-w-[130px]">{sf.folderName}</span>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${percent >= 90 ? 'bg-amber-500/20 text-amber-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                      {percent >= 90 ? 'ជិតពេញ' : 'សកម្ម'}
                    </span>
                  </div>
                  <div className="w-full bg-[#131314] h-1.5 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${percent >= 90 ? 'bg-amber-500' : 'bg-emerald-500'}`} style={{ width: `${percent}%` }}></div>
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                    <span>{sf.used.toFixed(1)} / {sf.capacity.toFixed(0)} GB</span>
                    <span>{percent}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-[#2d2e31] space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-400 flex items-center gap-1.5"><i className="fa-solid fa-database text-emerald-400"></i>ទំហំសរុបរួមគ្នា</span>
          <span className="font-mono font-bold text-slate-200">{totalPercent}%</span>
        </div>
        <div className="w-full bg-[#131314] h-2 rounded-full overflow-hidden border border-[#2d2e31]">
          <div className="bg-gradient-to-r from-blue-500 via-emerald-400 to-amber-400 h-full rounded-full transition-all duration-500" style={{ width: `${totalPercent}%` }}></div>
        </div>
        <p className="text-[11px] text-slate-400 font-mono">{totalUsed.toFixed(1)} GB នៃ {totalCapacity.toFixed(0)} GB បានប្រើ</p>
      </div>
    </aside>
  );
}