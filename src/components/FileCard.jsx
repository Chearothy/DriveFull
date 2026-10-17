import React from 'react';

export default function FileCard({ file, onOpenFile, onDeleteFile }) {
  const sizeDisplay = file.size < 1 ? `${(file.size * 1024).toFixed(0)} MB` : `${file.size.toFixed(1)} GB`;

  let iconClass = 'fa-file-video text-blue-400';
  if (file.type === 'image') iconClass = 'fa-image text-emerald-400';
  else if (file.type === 'audio') iconClass = 'fa-music text-purple-400';
  else if (file.type === 'doc') iconClass = 'fa-file-pdf text-red-400';

  return (
    <div 
      onClick={() => onOpenFile(file)}
      className="bg-[#1e1f20] hover:bg-[#28292a] border border-[#2d2e31] p-3.5 rounded-2xl transition cursor-pointer group hover:border-emerald-500/40 flex flex-col justify-between space-y-3 relative"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="p-2 bg-[#131314] rounded-xl border border-[#2d2e31]">
            <i className={`fa-solid ${iconClass} text-xl`}></i>
          </div>
          <div className="min-w-0">
            <h3 className="text-xs font-bold text-white truncate" title={file.name}>{file.name}</h3>
            <p className="text-[10px] text-slate-400 mt-0.5 font-mono">{sizeDisplay} • {file.date}</p>
          </div>
        </div>
      </div>

      <div className="bg-[#131314] p-2 rounded-xl border border-[#2d2e31] space-y-0.5 text-[10px]">
        <div className="text-amber-400 font-bold truncate flex items-center gap-1">
          <i className="fa-solid fa-folder text-[9px]"></i>
          <span>{file.folderName}</span>
        </div>
        <div className="text-slate-400 font-mono truncate">{file.ownerGmail}</div>
      </div>

      <div className="flex items-center justify-between pt-1" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-1.5">
          {/* Preview Action Button */}
          <button 
            onClick={() => onOpenFile(file)} 
            className="p-2 bg-blue-600/20 text-blue-400 hover:bg-blue-600 hover:text-white rounded-xl transition"
            title="មើលឯកសារ (Preview)"
          >
            <i className={`fa-solid ${file.type === 'video' ? 'fa-play' : file.type === 'image' ? 'fa-eye' : file.type === 'audio' ? 'fa-volume-high' : 'fa-file-lines'} text-xs`}></i>
          </button>

          {/* Download Button */}
          <a 
            href={file.videoUrl || '#'} 
            download={file.name}
            onClick={(e) => {
              if (!file.videoUrl) {
                e.preventDefault();
                alert(`កំពុងទាញយក: ${file.name}`);
              }
            }}
            className="p-2 bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600 hover:text-white rounded-xl transition"
            title="ទាញយក (Download)"
          >
            <i className="fa-solid fa-download text-xs"></i>
          </a>
        </div>

        {/* Delete Button */}
        <button 
          onClick={() => onDeleteFile(file.id)} 
          className="p-2 text-slate-500 hover:text-red-400 rounded-xl hover:bg-red-500/10 transition"
          title="លុប (Delete)"
        >
          <i className="fa-solid fa-trash-can text-xs"></i>
        </button>
      </div>
    </div>
  );
}