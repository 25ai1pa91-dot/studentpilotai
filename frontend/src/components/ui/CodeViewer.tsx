import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface CodeViewerProps {
  code: string;
  language?: string;
  filename?: string;
  className?: string;
}

export const CodeViewer: React.FC<CodeViewerProps> = ({
  code,
  language = 'typescript',
  filename,
  className,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn('rounded-xl border border-zinc-800 bg-zinc-950 overflow-hidden text-xs font-mono', className)}>
      <div className="flex items-center justify-between px-4 py-2 bg-zinc-900/90 border-b border-zinc-800 text-zinc-400">
        <span className="text-[11px] font-semibold text-zinc-300">{filename || language}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-[11px] px-2 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors"
        >
          {copied ? <Check className="w-3 h-3 text-teal-400" /> : <Copy className="w-3 h-3" />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-zinc-200 leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
};
