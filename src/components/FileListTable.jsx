import React from 'react';

export default function FileListTable({ files, onOpenFile, onDeleteFile }) {
  return (
    <div className="bg-[#1e1f20] border border-[#2d2e31] rounded-2xl overflow-hidden shadow">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-[#131314] text-slate-400 uppercase tracking-wider text-[10px] border-b border-[#2d2e31]">
            <tr>
              <th className="p-3.5">ឈ្មោះឯកសារ</th>
              <th className="p-3.5">Shared Folder ទីតាំង</th>
              <th className="p-3.5">ទំហំ (Size)</th>
              <th className="p-3.5">កាលបរិច្ឆេទ</th>
              <th className="p-3.5 text-right">សកម្មភាព</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2d2e31]">
            {files.map(file => {
              const sizeDisplay = file.size < 1 ? `${(file.size * 1024).toFixed(0)} MB` : `${file.size.toFixed(1)} GB`;
              
              let iconClass = 'fa-file-video text-blue-400';
              if (file.type === 'image') iconClass = 'fa-image text-emerald-400';
              else if (file.type === 'audio') iconClass = 'fa-music text-purple-400';
              else if (file.type === 'doc') iconClass = 'fa-file-pdf text-red-400';

              return (
                <tr key={file.id} className="hover:bg-[#28292a] transition cursor-pointer" onClick={() => onOpenFile(file)}>
                  <td className="p-3.5 flex items-center gap-2.5">
                    <i className={`fa-solid ${iconClass} text-sm`}></i>
                    <span className="font-bold text-white truncate max-w-[180px]" title={file.name}>{file.name}</span>
                  </td>
                  <td className="p-3.5">
                    <div className="text-amber-400 font-bold text-[11px]">{file.folderName}</div>
                    <div className="text-[10px] text-slate-400 font-mono">{file.ownerGmail}</div>
                  </td>
                  <td className="p-3.5 font-mono font-bold text-slate-200">{sizeDisplay}</td>
                  <td className="p-3.5 text-slate-400">{file.date}</td>
                  <td className="p-3.5 text-right space-x-1" onClick={(e) => e.stopPropagation()}>
                    <button 
                      onClick={() => onOpenFile(file)} 
                      className="p-1.5 text-blue-400 hover:bg-blue-600/20 rounded-lg transition"
                      title="Preview"
                    >
                      <i className="fa-solid fa-eye"></i>
                    </button>
                    <a 
                      href={file.videoUrl || '#'} 
                      download={file.name}
                      className="p-1.5 text-emerald-400 hover:bg-emerald-600/20 rounded-lg transition inline-block"
                      title="Download"
                    >
                      <i className="fa-solid fa-download"></i>
                    </a>
                    <button 
                      onClick={() => onDeleteFile(file.id)} 
                      className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition"
                      title="Delete"
                    >
                      <i className="fa-solid fa-trash-can"></i>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}