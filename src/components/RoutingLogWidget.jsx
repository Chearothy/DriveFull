import React from 'react';

export default function RoutingLogWidget({ routingLogs }) {
  return (
    <div className="bg-[#1e1f20] border border-[#2d2e31] rounded-2xl p-4 space-y-2.5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
          <i className="fa-solid fa-list-check text-blue-400"></i>
          <span>សកម្មភាព Router និងការ Overflow ទិន្នន័យ</span>
        </span>
        <span className="text-[10px] bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full font-mono">Live Simulation</span>
      </div>
      <div className="bg-[#131314] border border-[#2d2e31] rounded-xl p-3 font-mono text-[11px] h-24 overflow-y-auto space-y-1.5">
        {routingLogs.map((log, index) => (
          <div key={index} className={log.type}>{log.text}</div>
        ))}
      </div>
    </div>
  );
}