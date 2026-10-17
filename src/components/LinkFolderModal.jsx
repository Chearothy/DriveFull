import React from 'react';

export default function LinkFolderModal({ isOpen, onClose, newGmail, setNewGmail, newFolderId, setNewFolderId, onSubmit }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-[#1e1f20] border border-[#2d2e31] w-full max-w-md rounded-2xl p-6 shadow-2xl space-y-5">
        <div className="flex items-center justify-between border-b border-[#2d2e31] pb-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <i className="fa-solid fa-folder-plus text-emerald-400"></i>
            <span>ភ្ជាប់ Shared Folder ថ្មី (+15GB)</span>
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white"><i className="fa-solid fa-xmark"></i></button>
        </div>

        <div className="space-y-3.5 text-xs">
          <div>
            <label className="block font-semibold text-slate-300 mb-1">១. Gmail ម្ចាស់ Folder (Secondary Gmail)</label>
            <input 
              type="email" 
              value={newGmail} 
              onChange={(e) => setNewGmail(e.target.value)} 
              placeholder="e.g. secondary.gmail04@gmail.com" 
              className="w-full bg-[#28292a] border border-[#36373a] rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-emerald-500" 
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">២. Folder ID / Share Link ពី Google Drive</label>
            <input 
              type="text" 
              value={newFolderId} 
              onChange={(e) => setNewFolderId(e.target.value)} 
              placeholder="e.g. 1A2b3C4d5E6f7G8h9I0j" 
              className="w-full bg-[#28292a] border border-[#36373a] rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-emerald-500" 
            />
          </div>

          <div className="p-3 bg-emerald-900/20 border border-emerald-500/30 rounded-xl space-y-1 text-slate-300">
            <div className="font-bold text-emerald-400 flex items-center gap-1.5">
              <i className="fa-solid fa-shield-check"></i>
              <span>មិនត្រូវការ OAuth ទេ!</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              លោកអ្នកគ្រាន់តែចូលទៅ Gmail បន្ទាប់បន្សំ បង្កើត Folder រួច Share មកកាន់ <strong className="text-blue-300">gateway.master@gmail.com</strong> ជាមួយសិទ្ធិ "Editor" គឺជារួចរាល់!
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <button onClick={onClose} className="px-4 py-2 bg-[#28292a] text-slate-300 hover:bg-[#323335] text-xs font-medium rounded-xl">បោះបង់</button>
          <button onClick={onSubmit} className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl shadow">ភ្ជាប់ Folder (+15GB)</button>
        </div>
      </div>
    </div>
  );
}