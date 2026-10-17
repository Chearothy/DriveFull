import React, { useRef } from 'react';

export default function VideoModal({ isOpen, onClose, activeFile }) {
  const mediaRef = useRef(null);

  if (!isOpen || !activeFile) return null;

  const handleFullscreen = () => {
    if (mediaRef.current) {
      if (mediaRef.current.requestFullscreen) {
        mediaRef.current.requestFullscreen();
      } else if (mediaRef.current.webkitRequestFullscreen) {
        mediaRef.current.webkitRequestFullscreen();
      }
    }
  };

  const fileUrl = activeFile.url || activeFile.videoUrl || (activeFile.type === 'image' ? 'https://picsum.photos/800/600' : 'https://www.w3schools.com/html/mov_bbb.mp4');

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-[#1e1f20] border border-[#2d2e31] w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl flex flex-col">
        
        {/* Modal Header */}
        <div className="p-4 border-b border-[#2d2e31] flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-white">{activeFile.name}</h3>
            <p className="text-xs text-emerald-400 mt-0.5">Stored in: {activeFile.folderName}</p>
          </div>
          <div className="flex items-center gap-2">
            {(activeFile.type === 'video' || activeFile.type === 'image') && (
              <button onClick={handleFullscreen} className="p-2 text-slate-300 hover:text-white rounded-full bg-[#28292a]" title="Fullscreen">
                <i className="fa-solid fa-expand text-xs"></i>
              </button>
            )}
            <button onClick={onClose} className="p-2 text-slate-400 hover:text-white rounded-full bg-[#28292a]">
              <i className="fa-solid fa-xmark text-base"></i>
            </button>
          </div>
        </div>

        {/* Media Preview Body */}
        <div className="bg-black aspect-video w-full flex items-center justify-center relative overflow-hidden">
          {activeFile.type === 'video' ? (
            <video ref={mediaRef} controls className="w-full h-full object-contain" autoPlay>
              <source src={fileUrl} type="video/mp4" />
              Browser មិនទ្រទ្រង់ការចាក់វីដេអូនេះទេ។
            </video>
          ) : activeFile.type === 'image' ? (
            <img 
              ref={mediaRef} 
              src={fileUrl} 
              alt={activeFile.name} 
              className="w-full h-full object-contain" 
            />
          ) : activeFile.type === 'audio' ? (
            <div className="flex flex-col items-center gap-4 p-6 w-full">
              <i className="fa-solid fa-music text-purple-400 text-5xl animate-bounce"></i>
              <audio ref={mediaRef} controls className="w-full">
                <source src={fileUrl} type="audio/mpeg" />
                Browser មិនទ្រទ្រង់សំឡេងនេះទេ។
              </audio>
            </div>
          ) : (
            <div className="p-8 text-center text-slate-400">
              <i className="fa-solid fa-file-pdf text-red-400 text-4xl mb-2"></i>
              <p>មើលឯកសារ PDF / Document Preview: {activeFile.name}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#131314] flex justify-between items-center text-xs">
          <span className="text-slate-400"><i className="fa-solid fa-lock text-emerald-400 mr-1"></i>Streamed via Master Gateway API</span>
          <div className="flex items-center gap-2">
            <a 
              href={fileUrl} 
              download={activeFile.name}
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-xl font-medium flex items-center gap-1.5"
            >
              <i className="fa-solid fa-download"></i> Download
            </a>
            <button onClick={onClose} className="bg-[#28292a] hover:bg-[#323335] text-slate-200 px-4 py-1.5 rounded-xl font-medium">បិទ</button>
          </div>
        </div>

      </div>
    </div>
  );
}