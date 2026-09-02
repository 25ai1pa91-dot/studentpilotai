import React, { useRef, useState } from 'react';
import { UploadCloud, File, X } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface FileUploadProps {
  onFileSelect: (file: File) => void;
  accept?: string;
  maxSizeMB?: number;
  label?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelect,
  accept = '.pdf,.doc,.docx,.png,.jpg',
  maxSizeMB = 10,
  label = 'Drag and drop or browse file to upload',
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
      onFileSelect(file);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      onFileSelect(file);
    }
  };

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      className={cn(
        'flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-xl cursor-pointer transition-colors bg-zinc-900/40 text-center select-none',
        isDragOver ? 'border-purple-500 bg-purple-950/20' : 'border-zinc-800 hover:border-zinc-700'
      )}
    >
      <input ref={inputRef} type="file" accept={accept} onChange={handleChange} className="hidden" />
      {selectedFile ? (
        <div className="flex items-center gap-3 text-xs text-zinc-200">
          <File className="w-5 h-5 text-purple-400" />
          <span className="font-semibold">{selectedFile.name}</span>
          <span className="text-[10px] text-zinc-500">({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)</span>
          <button type="button" onClick={(e) => { e.stopPropagation(); setSelectedFile(null); }} className="p-1 text-zinc-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <>
          <UploadCloud className="w-8 h-8 text-zinc-500 mb-2" />
          <p className="text-xs font-medium text-zinc-300">{label}</p>
          <span className="text-[10px] text-zinc-500 mt-1">Supports {accept} (Max {maxSizeMB}MB)</span>
        </>
      )}
    </div>
  );
};
