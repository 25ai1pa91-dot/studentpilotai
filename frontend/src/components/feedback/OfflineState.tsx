import React from 'react';
import { WifiOff } from 'lucide-react';
import { Button } from '../ui/Button';

export const OfflineState: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md text-zinc-100">
      <div className="max-w-md w-full p-8 bg-zinc-900 border border-zinc-800 rounded-2xl text-center space-y-4 shadow-2xl">
        <div className="w-12 h-12 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center mx-auto text-zinc-400">
          <WifiOff className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-white">No Internet Connection</h3>
        <p className="text-xs text-zinc-400 leading-relaxed">
          StudentPilot AI requires an active internet connection to sync your AI Mentor context and progress metrics.
        </p>
        <Button variant="primary" onClick={() => window.location.reload()} className="w-full">
          Check Connection
        </Button>
      </div>
    </div>
  );
};
