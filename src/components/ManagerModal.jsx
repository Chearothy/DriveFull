import React from 'react';

export default function ManagerModal({ isOpen, onClose, sharedFolders, onOpenLinkModal }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-[#1e1f20] border border-[#2d2e31] w-full max-w-2xl rounded-2xl p-6 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-[#2d2e31] pb-3">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <i className="fa-solid fa-diagram-project text-emerald-400"></i>
              <span>គ្រប់គ្រង បណ្តាញ Shared Folders (Shared Drives Network)</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">បង្ហាញ Shared Folders ទាំងអស់ដែលបានភ្ជាប់មក Master Gateway Account</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1.5"><i className="fa-solid fa-xmark text-lg"></i></button>
        </div>

        {/* Visual Flowchart Box */}
        <div className="bg-[#131314] p-4 rounded-xl border border-[#2d2e31] space-y-3">
          <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block">របៀបការងារ (Architecture Concept)</span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-center text-[11px]">
            <div className="p-2.5 bg-[#1e1f20] rounded-lg border border-blue-500/30">
              <i className="fa-solid fa-user-gear text-blue-400 text-base mb-1 block"></i>
              <strong className="text-white block">1. Secondary Gmail</strong>
              <span className="text-slate-400">បង្កើត 15GB Folder</span>
            </div>
            <div className="p-2.5 bg-[#1e1f20] rounded-lg border border-emerald-500/30">
              <i className="fa-solid fa-share-nodes text-emerald-400 text-base mb-1 block"></i>
              <strong className="text-white block">2. Share Folder</strong>
              <span className="text-slate-400">ផ្តល់សិទ្ធិ Editor មក Master</span>
            </div>
            <div className="p-2.5 bg-[#1e1f20] rounded-lg border border-amber-500/30">
              <i className="fa-solid fa-shuffle text-amber-400 text-base mb-1 block"></i>
              <strong className="text-white block">3. Auto Overflow</strong>
              <span className="text-slate-400">Master Upload ដោយរំលងស្វ័យប្រវត្តិ</span>
            </div>
          </div>
        </div>

        {/* List of Linked Shared Folders */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300">បញ្ជី Shared Folders ភ្ជាប់ក្នុងប្រព័ន្ធ</span>
            <button onClick={() => { onClose(); onOpenLinkModal(); }} className="text-xs text-emerald-400 hover:underline font-semibold">+ ភ្ជាប់ Folder ថ្មី</button>
          </div>

          <div className="space-y-2.5">
            {sharedFolders.map(sf => {
              const percent = Math.min(100, Math.round((sf.used / sf.capacity) * 100));
              let statusBadge = '<span class="text-[9px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded font-bold border border-emerald-500/20">សកម្ម</span>';
              let barColor = 'bg-emerald-500';

              if (percent >= 90) {
                statusBadge = '<span class="text-[9px] bg-amber-500/20 text-amber-400 px-1.5 py-0.5 rounded font-bold border border-amber-500/20">ជិតពេញ (Spill)</span>';
                barColor = 'bg-amber-500';
              }

              return (
                <div key={sf.id} className="bg-[#131314] p-3.5 rounded-xl border border-[#2d2e31] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <i className="fa-solid fa-folder text-amber-400 text-sm"></i>
                      <span className="font-bold text-white text-xs">{sf.folderName}</span>
                      <span dangerouslySetInnerHTML={{ __html: statusBadge }} />
                    </div>
                    <p className="text-[11px] text-slate-400 font-mono">
                      <i className="fa-regular fa-envelope text-blue-400 mr-1"></i>{sf.ownerGmail} (Shared with Editor rights)
                    </p>
                  </div>
                  <div className="sm:text-right space-y-1 shrink-0">
                    <div className="font-mono text-xs font-bold text-slate-200">{sf.used.toFixed(1)} GB / {sf.capacity.toFixed(0)} GB ({percent}%)</div>
                    <div className="w-32 bg-[#28292a] h-2 rounded-full overflow-hidden border border-[#36373a]">
                      <div className={`h-full rounded-full ${barColor}`} style={{ width: `${percent}%` }}></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button onClick={onClose} className="px-5 py-2 bg-[#28292a] text-slate-200 hover:bg-[#323335] text-xs font-semibold rounded-xl">បិទ (Close)</button>
        </div>
      </div>
    </div>
  );
}