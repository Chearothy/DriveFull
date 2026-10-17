import React, { useState, useRef } from 'react';

export default function UploadModal({ isOpen, onClose, uploadName, setUploadName, uploadSize, setUploadSize, onSubmit }) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  // Handle local file selection / drop
  const handleFileProcessed = (file) => {
    if (file) {
      setUploadName(file.name);
      // Convert file size from bytes to GB (with a minimum floor for demo purposes)
      const sizeInGB = (file.size / (1024 * 1024 * 1024)).toFixed(1);
      setUploadSize(sizeInGB > 0.1 ? sizeInGB : '1.8');
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileProcessed(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelectChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileProcessed(e.target.files[0]);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-[#1e1f20] border border-[#2d2e31] w-full max-w-md rounded-2xl p-6 shadow-2xl space-y-4">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-[#2d2e31] pb-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <i className="fa-solid fa-cloud-arrow-up text-blue-400"></i>
            <span>អាប់ឡូតវីដេអូ / ឯកសារ</span>
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div className="space-y-3.5 text-xs">
          
          {/* DRAG & DROP ZONE */}
          <div 
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-5 text-center cursor-pointer transition flex flex-col items-center justify-center gap-2 ${
              isDragging 
                ? 'border-blue-500 bg-blue-500/10' 
                : 'border-[#3c3d40] bg-[#131314] hover:border-blue-500/50 hover:bg-[#28292a]/50'
            }`}
          >
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileSelectChange} 
              className="hidden" 
            />
            <div className="w-10 h-10 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center">
              <i className="fa-solid fa-file-arrow-up text-base"></i>
            </div>
            <div>
              <p className="font-semibold text-white">ទម្លាក់ឯកសារទីនេះ ឬ <span className="text-blue-400 underline">រុករក (Browse)</span></p>
              <p className="text-[10px] text-slate-400 mt-0.5">គាំទ្រវីដេអូ, រូបភាព និងឯកសារគ្រប់ប្រភេទ</p>
            </div>
          </div>

          {/* File Name Input */}
          <div>
            <label className="block font-semibold text-slate-300 mb-1.5">ឈ្មោះឯកសារ</label>
            <input 
              type="text" 
              value={uploadName} 
              onChange={(e) => setUploadName(e.target.value)} 
              className="w-full bg-[#28292a] border border-[#36373a] rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-blue-500" 
            />
          </div>

          {/* File Size Selector */}
          <div>
            <label className="block font-semibold text-slate-300 mb-1.5">ទំហំឯកសារ (GB)</label>
            <select 
              value={uploadSize} 
              onChange={(e) => setUploadSize(e.target.value)} 
              className="w-full bg-[#28292a] border border-[#36373a] rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-blue-500"
            >
              <option value="1.8">1.8 GB</option>
              <option value="3.5">3.5 GB (នឹង Spill Over បើ Folder 1 ជិតពេញ)</option>
              <option value="5.0">5.0 GB</option>
              <option value="8.0">8.0 GB</option>
            </select>
          </div>

          {/* Helper Banner */}
          <div className="p-3 bg-blue-900/20 border border-blue-500/30 rounded-xl text-slate-300 leading-relaxed">
            <i className="fa-solid fa-robot text-blue-400 mr-1"></i>
            ប្រព័ន្ធ Auto-Router នឹងស្កែនមើល Shared Folder ណាដែលមានទំហំទំនេរគ្រប់គ្រាន់ ដើម្បីបញ្ចូលទៅទីនោះដោយស្វ័យប្រវត្តិ។
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-end gap-2 pt-2">
          <button onClick={onClose} className="px-4 py-2 bg-[#28292a] text-slate-300 hover:bg-[#323335] text-xs font-medium rounded-xl">បោះបង់</button>
          <button onClick={onSubmit} className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl shadow">បញ្ចូលឯកសារ</button>
        </div>

      </div>
    </div>
  );
}