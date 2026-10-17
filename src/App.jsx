import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import FileCard from './components/FileCard';
import FileListTable from './components/FileListTable';
import RoutingLogWidget from './components/RoutingLogWidget';
import ManagerModal from './components/ManagerModal';
import LinkFolderModal from './components/LinkFolderModal';
import UploadModal from './components/UploadModal';
import VideoModal from './components/VideoModal';
import Toast from './components/Toast';

export default function App() {
  const [viewMode, setViewMode] = useState('grid');
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  // Modals state
  const [managerModalOpen, setManagerModalOpen] = useState(false);
  const [linkModalOpen, setLinkModalOpen] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [mediaModalOpen, setMediaModalOpen] = useState(false);
  
  // Toast state
  const [toast, setToast] = useState({ show: false, message: '', type: 'info' });

  // Form inputs & active preview file
  const [newGmail, setNewGmail] = useState('');
  const [newFolderId, setNewFolderId] = useState('');
  const [uploadName, setUploadName] = useState('Vision_Quest_Episode_2_4K.mp4');
  const [uploadSize, setUploadSize] = useState('3.5');
  const [activeFile, setActiveFile] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Routing logs
  const [routingLogs, setRoutingLogs] = useState([
    { text: '[SYSTEM INIT] ប្រព័ន្ធបានស្កែនឃើញ 3 Shared Folders... ទំហំសរុបទទេ 45.0 GB', type: 'text-emerald-400' },
    { text: "[ROUTER] ឯកសារ 'Vision_Quest_Ep1.mp4' (3.5 GB) ត្រូវសរសេរចូល Folder #1 (Gmail 1)... [ជោគជ័យ]", type: 'text-slate-300' }
  ]);

  // Shared Folders Data
  const [sharedFolders, setSharedFolders] = useState([
    { id: 'SF-01', folderName: 'Gmail 1 Shared Folder', ownerGmail: 'secondary.gmail01@gmail.com', used: 14.2, capacity: 15.0 },
    { id: 'SF-02', folderName: 'Gmail 2 Shared Folder', ownerGmail: 'secondary.gmail02@gmail.com', used: 11.8, capacity: 15.0 },
    { id: 'SF-03', folderName: 'Gmail 3 Shared Folder', ownerGmail: 'secondary.gmail03@gmail.com', used: 3.5, capacity: 15.0 }
  ]);

  // Files Data
  const [files, setFiles] = useState([
    {
      id: 101,
      name: 'Vision_Quest_Ep1_4K.mp4',
      type: 'video',
      size: 3.5,
      folderId: 'SF-01',
      folderName: 'Gmail 1 Shared Folder',
      ownerGmail: 'secondary.gmail01@gmail.com',
      date: '17 តុលា 2026',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4'
    },
    {
      id: 102,
      name: 'Marvel_Series_Trailer.mp4',
      type: 'video',
      size: 2.1,
      folderId: 'SF-02',
      folderName: 'Gmail 2 Shared Folder',
      ownerGmail: 'secondary.gmail02@gmail.com',
      date: '16 តុលា 2026',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4'
    },
    {
      id: 103,
      name: 'Poster_VisionQuest_HD.png',
      type: 'image',
      size: 0.015,
      folderId: 'SF-01',
      folderName: 'Gmail 1 Shared Folder',
      ownerGmail: 'secondary.gmail01@gmail.com',
      date: '16 តុលា 2026',
      videoUrl: 'https://picsum.photos/800/600'
    },
    {
      id: 104,
      name: 'Project_Architecture_Blueprint.pdf',
      type: 'doc',
      size: 0.005,
      folderId: 'SF-03',
      folderName: 'Gmail 3 Shared Folder',
      ownerGmail: 'secondary.gmail03@gmail.com',
      date: '15 តុលា 2026',
      videoUrl: ''
    }
  ]);

  const showToastMsg = (message, type = 'info') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: 'info' });
    }, 3500);
  };

  const addLog = (text, type = 'text-slate-300') => {
    setRoutingLogs(prev => [...prev, { text, type }]);
  };

  const totalCapacity = sharedFolders.reduce((sum, sf) => sum + sf.capacity, 0);
  const totalUsed = sharedFolders.reduce((sum, sf) => sum + sf.used, 0);
  const totalPercent = Math.round((totalUsed / totalCapacity) * 100);

  const simulateAutoOverflowUpload = (fileSizeGB, fileName = '') => {
    const size = parseFloat(fileSizeGB);
    const fname = fileName || `Video_Movie_Clip_${Math.floor(Math.random() * 800) + 100}.mp4`;
    const ftype = fname.endsWith('.png') || fname.endsWith('.jpg') ? 'image' : fname.endsWith('.mp3') ? 'audio' : 'video';

    addLog(`[INCOMING] ទទួលឯកសារថ្មី: '${fname}' (${size} GB)...`);

    let updatedFolders = [...sharedFolders];
    let targetSF = null;

    for (let sf of updatedFolders) {
      if ((sf.capacity - sf.used) >= size) {
        targetSF = sf;
        break;
      }
    }

    if (!targetSF) {
      showToastMsg(`គ្មាន Shared Folder ទំនេរគ្រប់គ្រាន់ (${size}GB) ទេ។`, 'error');
      return;
    }

    targetSF.used += size;
    setSharedFolders(updatedFolders);
    addLog(`[SUCCESS] បញ្ចូលឯកសារទៅក្នុង ${targetSF.folderName} ដោយជោគជ័យ!`, 'text-emerald-400 font-bold');

    const newFile = {
      id: Date.now(),
      name: fname,
      type: ftype,
      size: size,
      folderId: targetSF.id,
      folderName: targetSF.folderName,
      ownerGmail: targetSF.ownerGmail,
      date: '17 តុលា 2026',
      videoUrl: ftype === 'image' ? 'https://picsum.photos/800/600' : 'https://www.w3schools.com/html/mov_bbb.mp4'
    };

    setFiles([newFile, ...files]);
    showToastMsg(`អាប់ឡូតជោគជ័យ! រក្សាទុកក្នុង <strong>${targetSF.folderName}</strong>`, 'success');
  };

  const handleLinkFolder = () => {
    const email = newGmail || `secondary.gmail0${sharedFolders.length + 1}@gmail.com`;
    const count = sharedFolders.length + 1;

    setSharedFolders(prev => [
      ...prev,
      {
        id: `SF-0${count}`,
        folderName: `Gmail ${count} Shared Folder`,
        ownerGmail: email,
        used: 0.0,
        capacity: 15.0
      }
    ]);

    setLinkModalOpen(false);
    setNewGmail('');
    setNewFolderId('');
    showToastMsg(`ភ្ជាប់ Shared Folder ថ្មីពី <strong>${email}</strong> ជោគជ័យ! (+15GB)`, 'success');
  };

  const handleDeleteFile = (id) => {
    const fileToDelete = files.find(f => f.id === id);
    if (!fileToDelete) return;

    setSharedFolders(prev => prev.map(sf => {
      if (sf.id === fileToDelete.folderId) {
        return { ...sf, used: Math.max(0, sf.used - fileToDelete.size) };
      }
      return sf;
    }));

    setFiles(prev => prev.filter(f => f.id !== id));
    showToastMsg(`បានលុបឯកសារ '${fileToDelete.name}'`, 'info');
  };

  const filteredFiles = files.filter(f => f.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleOpenFile = (f) => {
    setActiveFile({
      ...f,
      url: f.videoUrl || (f.type === 'image' ? 'https://picsum.photos/800/600' : 'https://www.w3schools.com/html/mov_bbb.mp4')
    });
    setMediaModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#131314] text-slate-200">
      
      <Header 
        onToggleMobileDrawer={() => setMobileDrawerOpen(true)}
        onToggleMobileSearch={() => setMobileSearchOpen(!mobileSearchOpen)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenLinkModal={() => setLinkModalOpen(true)}
        onOpenUploadModal={() => setUploadModalOpen(true)}
      />

      <div className="flex-1 flex overflow-hidden">
        <Sidebar 
          sharedFolders={sharedFolders}
          totalUsed={totalUsed}
          totalCapacity={totalCapacity}
          totalPercent={totalPercent}
          onOpenUploadModal={() => setUploadModalOpen(true)}
          onOpenManagerModal={() => setManagerModalOpen(true)}
          onOpenLinkModal={() => setLinkModalOpen(true)}
        />

        <main className="flex-1 bg-[#131314] p-4 sm:p-6 overflow-y-auto space-y-5 pb-24 md:pb-8">
          <RoutingLogWidget routingLogs={routingLogs} />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#2d2e31] pb-3">
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400">Master Drive</span>
              <i className="fa-solid fa-chevron-right text-[9px] text-slate-600"></i>
              <span className="font-bold text-white bg-[#28292a] px-3 py-1 rounded-full border border-[#36373a]">ឯកសារទាំងអស់</span>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-3">
              <button onClick={() => simulateAutoOverflowUpload(3.2)} className="bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-medium px-3.5 py-1.5 rounded-full text-xs shadow transition flex items-center gap-1.5">
                <i className="fa-solid fa-bolt text-amber-300"></i>
                <span>តេស្ត Auto-Overflow (+3.2GB)</span>
              </button>

              <div className="flex items-center bg-[#28292a] p-1 rounded-full border border-[#36373a]">
                <button onClick={() => setViewMode('grid')} className={`p-1 px-2.5 rounded-full text-xs font-semibold transition ${viewMode === 'grid' ? 'bg-blue-600 text-white shadow' : 'text-slate-400'}`}>
                  <i className="fa-solid fa-grip"></i> Grid
                </button>
                <button onClick={() => setViewMode('list')} className={`p-1 px-2.5 rounded-full text-xs font-semibold transition ${viewMode === 'list' ? 'bg-blue-600 text-white shadow' : 'text-slate-400'}`}>
                  <i className="fa-solid fa-list"></i> List
                </button>
              </div>
            </div>
          </div>

          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">បញ្ជីឯកសាររួម ({filteredFiles.length})</h2>
            </div>

            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredFiles.map(file => (
                  <FileCard 
                    key={file.id} 
                    file={file} 
                    onOpenFile={handleOpenFile}
                    onDeleteFile={handleDeleteFile}
                  />
                ))}
              </div>
            ) : (
              <FileListTable 
                files={filteredFiles}
                onOpenFile={handleOpenFile}
                onDeleteFile={handleDeleteFile}
              />
            )}
          </section>
        </main>
      </div>

      {/* Modals */}
      <ManagerModal 
        isOpen={managerModalOpen} 
        onClose={() => setManagerModalOpen(false)} 
        sharedFolders={sharedFolders}
        onOpenLinkModal={() => setLinkModalOpen(true)}
      />

      <LinkFolderModal 
        isOpen={linkModalOpen}
        onClose={() => setLinkModalOpen(false)}
        newGmail={newGmail}
        setNewGmail={setNewGmail}
        newFolderId={newFolderId}
        setNewFolderId={setNewFolderId}
        onSubmit={handleLinkFolder}
      />

      <UploadModal 
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        uploadName={uploadName}
        setUploadName={setUploadName}
        uploadSize={uploadSize}
        setUploadSize={setUploadSize}
        onSubmit={() => { setUploadModalOpen(false); simulateAutoOverflowUpload(uploadSize, uploadName); }}
      />

      <VideoModal 
        isOpen={mediaModalOpen}
        onClose={() => setMediaModalOpen(false)}
        activeFile={activeFile}
      />

      <Toast show={toast.show} message={toast.message} />

    </div>
  );
}