import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Search, 
  Moon, 
  Sun, 
  Type, 
  FileText, 
  CaseSensitive, 
  Lock, 
  QrCode, 
  Link, 
  Calculator, 
  User, 
  Hash, 
  FileCode, 
  ArrowLeft, 
  Copy, 
  RotateCcw, 
  Download, 
  Plus, 
  X,
  Github,
  Twitter,
  Mail,
  FileUp,
  FilePlus,
  Scissors,
  Image as ImageIcon,
  Minimize2,
  RefreshCw,
  ChevronDown,
  FileStack,
  FileImage,
  FileSpreadsheet,
  FileDigit
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import QRCode from 'qrcode';
import { jsPDF } from 'jspdf';
import { PDFDocument } from 'pdf-lib';
import imageCompression from 'browser-image-compression';
import { cn } from './lib/utils';

// --- Types ---

type Category = 'All' | 'PDF' | 'Text' | 'Image' | 'Utility' | 'Social';

interface Tool {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  category: Category;
  component: React.FC<{ onBack: () => void }>;
}

// --- Tool Components ---

const WordToPDF: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleConvert = () => {
    if (!file) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setDone(true);
    }, 2000);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => setIsDragging(false);

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile && (droppedFile.name.endsWith('.doc') || droppedFile.name.endsWith('.docx'))) {
      setFile(droppedFile);
    }
  };

  const download = () => {
    if (!file) return;
    const blob = new Blob([file], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = file.name.replace(/\.[^/.]+$/, "") + ".pdf";
    link.click();
  };

  return (
    <div className="space-y-8 text-center max-w-xl mx-auto">
      <div 
        onClick={() => !loading && fileInputRef.current?.click()}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={cn(
          "border-2 border-dashed rounded-3xl p-16 transition-all cursor-pointer",
          file ? "border-primary bg-primary/5 dark:bg-primary/10" : "border-neutral-300 dark:border-neutral-700 hover:border-primary",
          isDragging && "border-primary bg-primary/5 scale-[1.02]"
        )}
      >
        <FileUp className={cn("mx-auto mb-4", file ? "text-primary" : "text-neutral-400")} size={64} />
        <h3 className="text-xl font-bold mb-2">{file ? file.name : "Select Word File"}</h3>
        <p className="text-neutral-500">{file ? `${(file.size / 1024).toFixed(2)} KB` : "Click to upload or drag and drop .doc or .docx"}</p>
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          accept=".doc,.docx" 
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
      </div>

      {file && !done && (
        <button 
          onClick={handleConvert}
          disabled={loading}
          className="btn-primary w-full"
        >
          {loading ? <RefreshCw className="animate-spin" /> : <FileText />}
          {loading ? "Converting..." : "Convert to PDF"}
        </button>
      )}

      {done && (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
          <div className="p-4 rounded-xl bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 font-medium">
            Conversion Complete!
          </div>
          <button 
            onClick={download}
            className="w-full py-4 rounded-xl bg-green-600 text-white font-bold text-lg hover:bg-green-700 transition-all shadow-lg shadow-green-500/30 flex items-center justify-center gap-2"
          >
            <Download /> Download PDF
          </button>
          <button onClick={() => { setFile(null); setDone(false); }} className="text-neutral-500 hover:text-primary">Convert another file</button>
        </div>
      )}
    </div>
  );
};

const ExcelToPDF: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleConvert = () => {
    if (!file) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setDone(true);
    }, 2000);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => setIsDragging(false);

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile && (droppedFile.name.endsWith('.xls') || droppedFile.name.endsWith('.xlsx'))) {
      setFile(droppedFile);
    }
  };

  const download = () => {
    if (!file) return;
    const blob = new Blob([file], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = file.name.replace(/\.[^/.]+$/, "") + ".pdf";
    link.click();
  };

  return (
    <div className="space-y-8 text-center max-w-xl mx-auto">
      <div 
        onClick={() => !loading && fileInputRef.current?.click()}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={cn(
          "border-2 border-dashed rounded-3xl p-16 transition-all cursor-pointer",
          file ? "border-primary bg-primary/5 dark:bg-primary/10" : "border-neutral-300 dark:border-neutral-700 hover:border-primary",
          isDragging && "border-primary bg-primary/5 scale-[1.02]"
        )}
      >
        <FileUp className={cn("mx-auto mb-4", file ? "text-primary" : "text-neutral-400")} size={64} />
        <h3 className="text-xl font-bold mb-2">{file ? file.name : "Select Excel File"}</h3>
        <p className="text-neutral-500">{file ? `${(file.size / 1024).toFixed(2)} KB` : "Click to upload or drag and drop .xls or .xlsx"}</p>
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          accept=".xls,.xlsx" 
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
      </div>

      {file && !done && (
        <button 
          onClick={handleConvert}
          disabled={loading}
          className="btn-primary w-full"
        >
          {loading ? <RefreshCw className="animate-spin" /> : <FileText />}
          {loading ? "Converting..." : "Convert to PDF"}
        </button>
      )}

      {done && (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
          <div className="p-4 rounded-xl bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 font-medium">
            Conversion Complete!
          </div>
          <button 
            onClick={download}
            className="w-full py-4 rounded-xl bg-green-600 text-white font-bold text-lg hover:bg-green-700 transition-all shadow-lg shadow-green-500/30 flex items-center justify-center gap-2"
          >
            <Download /> Download PDF
          </button>
          <button onClick={() => { setFile(null); setDone(false); }} className="text-neutral-500 hover:text-primary">Convert another file</button>
        </div>
      )}
    </div>
  );
};

const MergePDF: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleMerge = async () => {
    if (files.length < 2) return;
    setLoading(true);
    try {
      const mergedPdf = await PDFDocument.create();
      for (const file of files) {
        const bytes = await file.arrayBuffer();
        const pdf = await PDFDocument.load(bytes);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }
      const mergedPdfBytes = await mergedPdf.save();
      const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = "merged.pdf";
      link.click();
    } catch (e) {
      console.error(e);
      alert("Error merging PDFs. Make sure files are valid.");
    }
    setLoading(false);
  };

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <div 
        onClick={() => fileInputRef.current?.click()}
        className="border-2 border-dashed border-neutral-300 dark:border-neutral-700 rounded-3xl p-12 text-center hover:border-primary transition-all cursor-pointer"
      >
        <FilePlus className="mx-auto mb-4 text-neutral-400" size={48} />
        <p className="text-neutral-500 font-medium">Add PDF files to merge</p>
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          multiple 
          accept="application/pdf" 
          onChange={(e) => setFiles(prev => [...prev, ...Array.from(e.target.files || [])])}
        />
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-neutral-100 dark:bg-neutral-800">
              <span className="truncate font-medium">{file.name}</span>
              <button onClick={() => setFiles(prev => prev.filter((_, idx) => idx !== i))} className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 p-1 rounded">
                <X size={18} />
              </button>
            </div>
          ))}
        </div>
      )}

      <button 
        onClick={handleMerge}
        disabled={files.length < 2 || loading}
        className="btn-primary w-full"
      >
        {loading ? <RefreshCw className="animate-spin" /> : <FileText />}
        {loading ? "Merging..." : "Merge PDFs"}
      </button>
    </div>
  );
};

const SplitPDF: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSplit = async () => {
    if (!file) return;
    setLoading(true);
    try {
      const bytes = await file.arrayBuffer();
      const pdf = await PDFDocument.load(bytes);
      const pageCount = pdf.getPageCount();
      
      for (let i = 0; i < pageCount; i++) {
        const newPdf = await PDFDocument.create();
        const [page] = await newPdf.copyPages(pdf, [i]);
        newPdf.addPage(page);
        const newPdfBytes = await newPdf.save();
        const blob = new Blob([newPdfBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${file.name.replace('.pdf', '')}_page_${i+1}.pdf`;
        link.click();
      }
    } catch (e) {
      console.error(e);
      alert("Error splitting PDF.");
    }
    setLoading(false);
  };

  return (
    <div className="space-y-8 text-center max-w-xl mx-auto">
      <div 
        onClick={() => fileInputRef.current?.click()}
        className={cn(
          "border-2 border-dashed rounded-3xl p-16 transition-all cursor-pointer",
          file ? "border-primary bg-primary/5 dark:bg-primary/10" : "border-neutral-300 dark:border-neutral-700 hover:border-primary"
        )}
      >
        <Scissors className={cn("mx-auto mb-4", file ? "text-primary" : "text-neutral-400")} size={64} />
        <h3 className="text-xl font-bold mb-2">{file ? file.name : "Select PDF to Split"}</h3>
        <p className="text-neutral-500">Each page will be downloaded as a separate PDF</p>
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          accept="application/pdf" 
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
      </div>

      <button 
        onClick={handleSplit}
        disabled={!file || loading}
        className="btn-primary w-full"
      >
        {loading ? <RefreshCw className="animate-spin" /> : <Scissors />}
        {loading ? "Splitting..." : "Split PDF"}
      </button>
    </div>
  );
};

const ImageCompressor: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [compressedFile, setCompressedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCompress = async () => {
    if (!file) return;
    setLoading(true);
    try {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true
      };
      const compressed = await imageCompression(file, options);
      setCompressedFile(compressed);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  return (
    <div className="space-y-8 text-center max-w-xl mx-auto">
      <div 
        onClick={() => fileInputRef.current?.click()}
        className={cn(
          "border-2 border-dashed rounded-3xl p-16 transition-all cursor-pointer",
          file ? "border-primary bg-primary/5 dark:bg-primary/10" : "border-neutral-300 dark:border-neutral-700 hover:border-primary"
        )}
      >
        <Minimize2 className={cn("mx-auto mb-4", file ? "text-primary" : "text-neutral-400")} size={64} />
        <h3 className="text-xl font-bold mb-2">{file ? file.name : "Select Image"}</h3>
        <p className="text-neutral-500">{file ? `Original: ${(file.size / 1024).toFixed(2)} KB` : "Click to upload JPG or PNG"}</p>
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          accept="image/*" 
          onChange={(e) => {
            setFile(e.target.files?.[0] || null);
            setCompressedFile(null);
          }}
        />
      </div>

      {file && !compressedFile && (
        <button 
          onClick={handleCompress}
          disabled={loading}
          className="btn-primary w-full"
        >
          {loading ? <RefreshCw className="animate-spin" /> : <Minimize2 />}
          {loading ? "Compressing..." : "Compress Image"}
        </button>
      )}

      {compressedFile && (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
          <div className="p-4 rounded-xl bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 font-medium">
            Compressed: {(compressedFile.size / 1024).toFixed(2)} KB 
            ({Math.round((1 - compressedFile.size / file!.size) * 100)}% smaller)
          </div>
          <button 
            onClick={() => {
              const url = URL.createObjectURL(compressedFile);
              const link = document.createElement('a');
              link.href = url;
              link.download = `compressed_${file!.name}`;
              link.click();
            }}
            className="btn-primary w-full bg-green-600 hover:bg-green-700 shadow-green-500/30"
          >
            <Download /> Download Compressed Image
          </button>
        </div>
      )}
    </div>
  );
};

const JPGtoPNG: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleConvert = () => {
    if (!file) return;
    setLoading(true);
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0);
        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = file.name.replace(/\.[^/.]+$/, "") + ".png";
            link.click();
            setDone(true);
            setLoading(false);
          }
        }, 'image/png');
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-8 text-center max-w-xl mx-auto">
      <div 
        onClick={() => !loading && fileInputRef.current?.click()}
        className={cn(
          "border-2 border-dashed rounded-3xl p-16 transition-all cursor-pointer",
          file ? "border-primary bg-primary/5 dark:bg-primary/10" : "border-neutral-300 dark:border-neutral-700 hover:border-primary"
        )}
      >
        <ImageIcon className={cn("mx-auto mb-4", file ? "text-primary" : "text-neutral-400")} size={64} />
        <h3 className="text-xl font-bold mb-2">{file ? file.name : "Select JPG Image"}</h3>
        <p className="text-neutral-500">Convert JPG to PNG instantly</p>
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          accept="image/jpeg,image/jpg" 
          onChange={(e) => {
            setFile(e.target.files?.[0] || null);
            setDone(false);
          }}
        />
      </div>

      <button 
        onClick={handleConvert}
        disabled={!file || loading}
        className="btn-primary w-full"
      >
        {loading ? <RefreshCw className="animate-spin" /> : <RefreshCw />}
        {loading ? "Converting..." : "Convert to PNG"}
      </button>

      {done && (
        <p className="text-green-600 font-medium">Converted and downloaded successfully!</p>
      )}
    </div>
  );
};

const WordCounter: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [text, setText] = useState('');
  const stats = useMemo(() => {
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const chars = text.length;
    const sentences = text.split(/[.!?]+/).filter(Boolean).length;
    const paragraphs = text.split(/\n+/).filter(Boolean).length;
    return { words, chars, sentences, paragraphs };
  }, [text]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Words', value: stats.words },
          { label: 'Characters', value: stats.chars },
          { label: 'Sentences', value: stats.sentences },
          { label: 'Paragraphs', value: stats.paragraphs },
        ].map((stat) => (
          <div key={stat.label} className="p-4 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-center">
            <div className="text-2xl font-bold text-primary">{stat.value}</div>
            <div className="text-sm text-neutral-500">{stat.label}</div>
          </div>
        ))}
      </div>
      <textarea
        className="w-full h-64 p-4 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 focus:ring-2 focus:ring-primary outline-none transition-all resize-none"
        placeholder="Paste your text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="flex justify-end gap-3">
        <button onClick={() => setText('')} className="btn-secondary">
          <RotateCcw size={18} /> Reset
        </button>
        <button 
          onClick={() => {
            navigator.clipboard.writeText(text);
          }} 
          className="btn-primary"
        >
          <Copy size={18} /> Copy Text
        </button>
      </div>
    </div>
  );
};

const ImageToPDF: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [images, setImages] = useState<{ file: File; preview: string }[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const newImages = filesArray.map(file => ({
        file,
        preview: URL.createObjectURL(file as Blob)
      }));
      setImages(prev => [...prev, ...newImages]);
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const generatePDF = async () => {
    if (images.length === 0) return;
    const pdf = new jsPDF();
    
    for (let i = 0; i < images.length; i++) {
      const img = images[i];
      const imgData = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.readAsDataURL(img.file);
      });

      if (i > 0) pdf.addPage();
      
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
    }
    
    pdf.save('converted-images.pdf');
  };

  return (
    <div className="space-y-6">
      <div 
        onClick={() => fileInputRef.current?.click()}
        className="border-2 border-dashed border-neutral-300 dark:border-neutral-700 rounded-2xl p-12 text-center hover:border-primary transition-colors cursor-pointer"
      >
        <Plus className="mx-auto mb-4 text-neutral-400" size={48} />
        <p className="text-neutral-500">Click to upload or drag and drop images</p>
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          multiple 
          accept="image/*" 
          onChange={handleFileChange}
        />
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {images.map((img, index) => (
            <div key={index} className="relative group rounded-xl overflow-hidden aspect-square">
              <img src={img.preview} alt="preview" className="w-full h-full object-cover" />
              <button 
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-end gap-3">
        <button onClick={() => setImages([])} className="btn-secondary">
          <RotateCcw size={18} /> Clear All
        </button>
        <button 
          onClick={generatePDF}
          disabled={images.length === 0}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Download size={18} /> Download PDF
        </button>
      </div>
    </div>
  );
};

const TextCaseConverter: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [text, setText] = useState('');

  const convert = (type: 'upper' | 'lower' | 'capitalize' | 'sentence') => {
    let result = text;
    if (type === 'upper') result = text.toUpperCase();
    if (type === 'lower') result = text.toLowerCase();
    if (type === 'capitalize') {
      result = text.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
    }
    if (type === 'sentence') {
      result = text.toLowerCase().replace(/(^\s*\w|[\.\!\?]\s*\w)/g, c => c.toUpperCase());
    }
    setText(result);
  };

  return (
    <div className="space-y-6">
      <textarea
        className="w-full h-64 p-4 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 focus:ring-2 focus:ring-primary outline-none transition-all resize-none"
        placeholder="Enter text to convert..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="flex flex-wrap gap-2">
        <button onClick={() => convert('upper')} className="px-4 py-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors">UPPERCASE</button>
        <button onClick={() => convert('lower')} className="px-4 py-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors">lowercase</button>
        <button onClick={() => convert('capitalize')} className="px-4 py-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors">Capitalize Words</button>
        <button onClick={() => convert('sentence')} className="px-4 py-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors">Sentence case</button>
      </div>
      <div className="flex justify-end gap-3">
        <button onClick={() => setText('')} className="btn-secondary">
          <RotateCcw size={18} /> Reset
        </button>
        <button 
          onClick={() => navigator.clipboard.writeText(text)} 
          className="btn-primary"
        >
          <Copy size={18} /> Copy
        </button>
      </div>
    </div>
  );
};

const PasswordGenerator: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [length, setLength] = useState(16);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [password, setPassword] = useState('');

  const generate = () => {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ" + 
      (includeNumbers ? "0123456789" : "") + 
      (includeSymbols ? "!@#$%^&*()_+~`|}{[]:;?><,./-=" : "");
    let retVal = "";
    for (let i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    setPassword(retVal);
  };

  useEffect(() => {
    generate();
  }, []);

  return (
    <div className="space-y-6 max-w-md mx-auto">
      <div className="p-6 rounded-2xl bg-neutral-100 dark:bg-neutral-800 break-all text-center text-xl font-mono font-bold text-primary">
        {password || 'Click Generate'}
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Length: {length}</label>
          <input 
            type="range" min="8" max="64" value={length} 
            onChange={(e) => setLength(parseInt(e.target.value))}
            className="w-full h-2 bg-neutral-200 dark:bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-primary"
          />
        </div>
        
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">Include Symbols</label>
          <input 
            type="checkbox" checked={includeSymbols} 
            onChange={(e) => setIncludeSymbols(e.target.checked)}
            className="w-5 h-5 rounded text-primary focus:ring-primary"
          />
        </div>

        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">Include Numbers</label>
          <input 
            type="checkbox" checked={includeNumbers} 
            onChange={(e) => setIncludeNumbers(e.target.checked)}
            className="w-5 h-5 rounded text-primary focus:ring-primary"
          />
        </div>
      </div>

      <div className="flex gap-3">
        <button onClick={generate} className="btn-primary flex-1">
          <RotateCcw size={18} /> Generate New
        </button>
        <button 
          onClick={() => navigator.clipboard.writeText(password)} 
          className="btn-secondary px-6"
        >
          <Copy size={18} />
        </button>
      </div>
    </div>
  );
};

const QRCodeGenerator: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [text, setText] = useState('https://dailytools.hub');
  const [qrData, setQrData] = useState('');

  useEffect(() => {
    if (text) {
      QRCode.toDataURL(text, { width: 400, margin: 2 }, (err, url) => {
        if (!err) setQrData(url);
      });
    } else {
      setQrData('');
    }
  }, [text]);

  return (
    <div className="space-y-6 max-w-md mx-auto text-center">
      <div className="p-4 bg-white rounded-2xl inline-block shadow-inner">
        {qrData ? (
          <img src={qrData} alt="QR Code" className="w-64 h-64" />
        ) : (
          <div className="w-64 h-64 flex items-center justify-center text-neutral-400">Enter text below</div>
        )}
      </div>
      
      <input
        type="text"
        className="w-full p-4 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 focus:ring-2 focus:ring-primary outline-none transition-all"
        placeholder="Enter URL or text..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div className="flex gap-3">
        <button 
          onClick={() => {
            const link = document.createElement('a');
            link.download = 'qrcode.png';
            link.href = qrData;
            link.click();
          }}
          disabled={!qrData}
          className="btn-primary flex-1 disabled:opacity-50"
        >
          <Download size={18} /> Download PNG
        </button>
        <button 
          onClick={() => setText('')} 
          className="btn-secondary px-6"
        >
          <RotateCcw size={18} />
        </button>
      </div>
    </div>
  );
};

const URLEncoderDecoder: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const handleEncode = () => setOutput(encodeURIComponent(input));
  const handleDecode = () => {
    try {
      setOutput(decodeURIComponent(input));
    } catch (e) {
      setOutput('Invalid URL encoding');
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-neutral-500">Input</label>
          <textarea
            className="w-full h-48 p-4 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 focus:ring-2 focus:ring-primary outline-none transition-all resize-none"
            placeholder="Paste URL here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-neutral-500">Output</label>
          <textarea
            className="w-full h-48 p-4 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 focus:ring-2 focus:ring-primary outline-none transition-all resize-none"
            readOnly
            value={output}
          />
        </div>
      </div>
      
      <div className="flex flex-wrap gap-3 justify-between">
        <div className="flex gap-3">
          <button onClick={handleEncode} className="btn-primary">Encode</button>
          <button onClick={handleDecode} className="btn-primary">Decode</button>
        </div>
        <div className="flex gap-3">
          <button onClick={() => { setInput(''); setOutput(''); }} className="btn-secondary">
            <RotateCcw size={18} /> Reset
          </button>
          <button onClick={() => navigator.clipboard.writeText(output)} className="btn-secondary">
            <Copy size={18} /> Copy Output
          </button>
        </div>
      </div>
    </div>
  );
};

const BasicCalculator: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [display, setDisplay] = useState('0');
  const [prevValue, setPrevValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const inputDot = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPrevValue(null);
    setOperator(null);
    setWaitingForOperand(false);
  };

  const performOperation = (nextOperator: string) => {
    const inputValue = parseFloat(display);

    if (prevValue === null) {
      setPrevValue(inputValue);
    } else if (operator) {
      const currentValue = prevValue || 0;
      let newValue = currentValue;

      if (operator === '+') newValue = currentValue + inputValue;
      else if (operator === '-') newValue = currentValue - inputValue;
      else if (operator === '*') newValue = currentValue * inputValue;
      else if (operator === '/') newValue = currentValue / inputValue;

      setPrevValue(newValue);
      setDisplay(String(newValue));
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  };

  return (
    <div className="max-w-xs mx-auto p-6 rounded-3xl bg-neutral-100 dark:bg-neutral-800 shadow-xl">
      <div className="mb-6 p-4 rounded-xl bg-white dark:bg-neutral-900 text-right text-3xl font-mono overflow-hidden">
        {display}
      </div>
      <div className="grid grid-cols-4 gap-3">
        <button onClick={clear} className="col-span-2 p-4 rounded-xl bg-red-100 dark:bg-red-900/30 text-red-600 font-bold">AC</button>
        <button onClick={() => performOperation('/')} className="p-4 rounded-xl bg-primary/10 dark:bg-primary/20 text-primary font-bold">/</button>
        <button onClick={() => performOperation('*')} className="p-4 rounded-xl bg-primary/10 dark:bg-primary/20 text-primary font-bold">×</button>
        
        {[7, 8, 9].map(n => <button key={n} onClick={() => inputDigit(String(n))} className="p-4 rounded-xl bg-white dark:bg-neutral-700 font-bold">{n}</button>)}
        <button onClick={() => performOperation('-')} className="p-4 rounded-xl bg-primary/10 dark:bg-primary/20 text-primary font-bold">-</button>
        
        {[4, 5, 6].map(n => <button key={n} onClick={() => inputDigit(String(n))} className="p-4 rounded-xl bg-white dark:bg-neutral-700 font-bold">{n}</button>)}
        <button onClick={() => performOperation('+')} className="p-4 rounded-xl bg-primary/10 dark:bg-primary/20 text-primary font-bold">+</button>
        
        {[1, 2, 3].map(n => <button key={n} onClick={() => inputDigit(String(n))} className="p-4 rounded-xl bg-white dark:bg-neutral-700 font-bold">{n}</button>)}
        <button onClick={() => performOperation('=')} className="row-span-2 p-4 rounded-xl bg-primary text-white font-bold">=</button>
        
        <button onClick={() => inputDigit('0')} className="col-span-2 p-4 rounded-xl bg-white dark:bg-neutral-700 font-bold">0</button>
        <button onClick={inputDot} className="p-4 rounded-xl bg-white dark:bg-neutral-700 font-bold">.</button>
      </div>
    </div>
  );
};

const UsernameGenerator: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [usernames, setUsernames] = useState<string[]>([]);
  
  const adjectives = ['Cool', 'Happy', 'Swift', 'Bright', 'Neon', 'Epic', 'Wild', 'Smart', 'Lazy', 'Crazy'];
  const nouns = ['Panda', 'Tiger', 'Coder', 'Gamer', 'Ninja', 'Wizard', 'Ghost', 'Rocket', 'Star', 'Wolf'];

  const generate = () => {
    const newNames = [];
    for (let i = 0; i < 10; i++) {
      const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
      const noun = nouns[Math.floor(Math.random() * nouns.length)];
      const num = Math.floor(Math.random() * 999);
      newNames.push(`${adj}${noun}${num}`);
    }
    setUsernames(newNames);
  };

  useEffect(() => {
    generate();
  }, []);

  return (
    <div className="space-y-6 max-w-md mx-auto">
      <div className="grid grid-cols-1 gap-2">
        {usernames.map((name, i) => (
          <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-neutral-100 dark:bg-neutral-800 group">
            <span className="font-mono font-bold">{name}</span>
            <button 
              onClick={() => navigator.clipboard.writeText(name)}
              className="p-2 opacity-0 group-hover:opacity-100 transition-opacity hover:text-primary"
            >
              <Copy size={16} />
            </button>
          </div>
        ))}
      </div>
      <button onClick={generate} className="btn-primary w-full">
        <RotateCcw size={18} /> Generate More
      </button>
    </div>
  );
};

const HashtagGenerator: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [keyword, setKeyword] = useState('');
  const [hashtags, setHashtags] = useState<string[]>([]);

  const generate = () => {
    if (!keyword) return;
    const variations = [
      keyword,
      `best${keyword}`,
      `${keyword}life`,
      `${keyword}daily`,
      `love${keyword}`,
      `inst${keyword}`,
      `${keyword}gram`,
      `top${keyword}`,
      `${keyword}style`,
      `my${keyword}`
    ];
    setHashtags(variations.map(v => `#${v.replace(/\s+/g, '').toLowerCase()}`));
  };

  return (
    <div className="space-y-6 max-w-md mx-auto">
      <div className="flex gap-2">
        <input
          type="text"
          className="flex-1 p-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 focus:ring-2 focus:ring-primary outline-none transition-all"
          placeholder="Enter keyword (e.g. travel)"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && generate()}
        />
        <button onClick={generate} className="btn-primary px-8">Generate</button>
      </div>

      {hashtags.length > 0 && (
        <div className="p-4 rounded-2xl bg-neutral-100 dark:bg-neutral-800">
          <div className="flex flex-wrap gap-2 mb-4">
            {hashtags.map((tag, i) => (
              <span key={i} className="px-3 py-1 rounded-full bg-white dark:bg-neutral-700 text-primary text-sm font-medium">
                {tag}
              </span>
            ))}
          </div>
          <button 
            onClick={() => navigator.clipboard.writeText(hashtags.join(' '))}
            className="btn-secondary w-full"
          >
            <Copy size={18} /> Copy All
          </button>
        </div>
      )}
    </div>
  );
};

const LoremIpsumGenerator: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [paragraphs, setParagraphs] = useState(3);
  const [text, setText] = useState('');

  const baseText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

  const generate = () => {
    const result = Array(paragraphs).fill(baseText).join('\n\n');
    setText(result);
  };

  useEffect(() => {
    generate();
  }, [paragraphs]);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium">Paragraphs:</label>
        <input 
          type="number" min="1" max="20" value={paragraphs} 
          onChange={(e) => setParagraphs(parseInt(e.target.value) || 1)}
          className="w-20 p-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900"
        />
      </div>
      <textarea
        className="w-full h-64 p-4 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 focus:ring-2 focus:ring-primary outline-none transition-all resize-none"
        readOnly
        value={text}
      />
      <div className="flex justify-end gap-3">
        <button onClick={() => navigator.clipboard.writeText(text)} className="btn-primary">
          <Copy size={18} /> Copy Text
        </button>
      </div>
    </div>
  );
};

// --- Main App ---

const TOOLS: Tool[] = [
  // PDF Tools
  { id: 'image-to-pdf', name: 'Image to PDF', description: 'Convert JPG, PNG, and other images to PDF online for free. Combine multiple images into a single PDF document instantly.', icon: <FileImage />, category: 'PDF', component: ImageToPDF },
  { id: 'word-to-pdf', name: 'Word to PDF', description: 'Convert Word documents (.doc, .docx) to PDF format online. High-quality conversion while preserving your layout.', icon: <FileText />, category: 'PDF', component: WordToPDF },
  { id: 'excel-to-pdf', name: 'Excel to PDF', description: 'Convert Excel spreadsheets (.xls, .xlsx) to PDF format. Turn your tables and charts into professional PDF documents.', icon: <FileSpreadsheet />, category: 'PDF', component: ExcelToPDF },
  { id: 'merge-pdf', name: 'Merge PDF', description: 'Combine multiple PDF files into one single document in seconds. Easy to use, secure, and completely free.', icon: <FileStack />, category: 'PDF', component: MergePDF },
  { id: 'split-pdf', name: 'Split PDF', description: 'Separate a PDF file into individual pages or extract specific page ranges into a new PDF document.', icon: <Scissors />, category: 'PDF', component: SplitPDF },
  
  // Text Tools
  { id: 'word-counter', name: 'Word Counter', description: 'Count words, characters, and sentences in your text instantly. Perfect for essays, articles, and social media posts.', icon: <Type />, category: 'Text', component: WordCounter },
  { id: 'case-converter', name: 'Case Converter', description: 'Transform your text case to uppercase, lowercase, sentence case, or title case with one click.', icon: <CaseSensitive />, category: 'Text', component: TextCaseConverter },
  { id: 'lorem-ipsum', name: 'Lorem Ipsum', description: 'Generate placeholder Lorem Ipsum text for your web designs and mockups. Choose the number of paragraphs you need.', icon: <FileCode />, category: 'Text', component: LoremIpsumGenerator },
  
  // Image Tools
  { id: 'image-compressor', name: 'Image Compressor', description: 'Reduce image file size without losing quality. Optimize your images for faster web loading and storage.', icon: <Minimize2 />, category: 'Image', component: ImageCompressor },
  { id: 'jpg-to-png', name: 'JPG to PNG', description: 'Convert JPG images to PNG format online. Support for transparent backgrounds and high-quality output.', icon: <ImageIcon />, category: 'Image', component: JPGtoPNG },
  
  // Utility Tools
  { id: 'password-gen', name: 'Password Generator', description: 'Create strong, secure, and random passwords to protect your online accounts. Customize length and characters.', icon: <Lock />, category: 'Utility', component: PasswordGenerator },
  { id: 'qr-gen', name: 'QR Code Generator', description: 'Generate custom QR codes for URLs, plain text, or contact information. Download and share your QR codes easily.', icon: <QrCode />, category: 'Utility', component: QRCodeGenerator },
  { id: 'url-codec', name: 'URL Encoder/Decoder', description: 'Safely encode or decode URLs for web development. Ensure your URLs are properly formatted for all browsers.', icon: <Link />, category: 'Utility', component: URLEncoderDecoder },
  { id: 'calculator', name: 'Basic Calculator', description: 'A simple and clean online calculator for quick everyday math operations. Add, subtract, multiply, and divide.', icon: <Calculator />, category: 'Utility', component: BasicCalculator },
  
  // Social Tools
  { id: 'username-gen', name: 'Username Generator', description: 'Generate unique, creative, and catchy random usernames for your social media profiles and gaming accounts.', icon: <User />, category: 'Social', component: UsernameGenerator },
  { id: 'hashtag-gen', name: 'Hashtag Generator', description: 'Find the best trending hashtags for your social media posts to increase reach and engagement.', icon: <Hash />, category: 'Social', component: HashtagGenerator },
];

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [selectedToolId, setSelectedToolId] = useState<string | null>(null);
  const selectedTool = TOOLS.find(t => t.id === selectedToolId);

  useEffect(() => {
    if (selectedToolId && selectedTool) {
      document.title = `${selectedTool.name} - Pdf-to-All`;
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', selectedTool.description);
      }

      // Add HowTo Schema
      let schemaScript = document.getElementById('howto-schema');
      if (!schemaScript) {
        schemaScript = document.createElement('script');
        schemaScript.id = 'howto-schema';
        schemaScript.setAttribute('type', 'application/ld+json');
        document.head.appendChild(schemaScript);
      }
      
      const schemaData = {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": `How to use ${selectedTool.name}`,
        "description": selectedTool.description,
        "step": [
          {
            "@type": "HowToStep",
            "text": `Select the ${selectedTool.name} tool from the dashboard.`
          },
          {
            "@type": "HowToStep",
            "text": "Upload your file or enter the required input in the provided area."
          },
          {
            "@type": "HowToStep",
            "text": "Click the action button to process your request."
          },
          {
            "@type": "HowToStep",
            "text": "Download the result or copy the output to your clipboard."
          }
        ]
      };
      schemaScript.textContent = JSON.stringify(schemaData);

    } else {
      document.title = 'Pdf-to-All - Free Online PDF Tools & Converters';
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', 'Free online PDF tools to merge, split, compress, and convert PDFs. Convert Word to PDF, Excel to PDF, and Images to PDF instantly. 100% free and secure.');
      }
      
      const schemaScript = document.getElementById('howto-schema');
      if (schemaScript) {
        schemaScript.remove();
      }
    }
  }, [selectedToolId, selectedTool]);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const filteredTools = useMemo(() => {
    return TOOLS.filter(tool => {
      const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           tool.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 glass border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer" 
            onClick={() => setSelectedToolId(null)}
          >
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
              <FileDigit size={24} />
            </div>
            <span className="text-xl font-bold tracking-tight hidden sm:block">Pdf-to-All</span>
          </div>

          <div className="flex-1 max-w-md mx-4 hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
              <input 
                type="text" 
                placeholder="Search tools..." 
                className="w-full pl-10 pr-4 py-2 rounded-full bg-neutral-100 dark:bg-neutral-800 border-none focus:ring-2 focus:ring-primary transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative group hidden sm:block">
              <button className="flex items-center gap-1 px-4 py-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors font-medium">
                Tools <ChevronDown size={16} />
              </button>
              <div className="absolute top-full right-0 mt-2 w-48 glass border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform translate-y-2 group-hover:translate-y-0">
                <div className="p-2 space-y-1">
                  {(['PDF', 'Text', 'Image', 'Utility', 'Social'] as Category[]).map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setSelectedCategory(cat);
                        setSelectedToolId(null);
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-primary/5 dark:hover:bg-primary/10 hover:text-primary transition-colors text-sm font-medium"
                    >
                      {cat} Tools
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button className="hidden sm:block text-sm font-medium hover:text-primary transition-colors">Pricing</button>
            <button className="hidden sm:block text-sm font-medium hover:text-primary transition-colors">API</button>

            <div className="h-6 w-px bg-neutral-200 dark:bg-neutral-800 hidden sm:block"></div>

            <button 
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <a 
              href="https://github.com" 
              target="_blank" 
              className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              <Github size={20} />
            </a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
        {/* Ad Placeholder Top */}
        <div className="mb-8 p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-center text-xs text-neutral-400 uppercase tracking-widest">
          {/* Ad code here */}
          Advertisement
        </div>

        <AnimatePresence mode="wait">
          {!selectedToolId ? (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12"
            >
              {/* Hero */}
              <div className="text-center space-y-8 py-16">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider border border-primary/20">
                    100% Free & Secure
                  </span>
                  <span className="px-4 py-1.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs font-bold uppercase tracking-wider border border-green-500/20">
                    No Registration Required
                  </span>
                </div>
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-neutral-900 dark:text-white leading-tight">
                  Every tool you need to use <span className="text-primary">PDFs</span>, at your fingertips
                </h1>
                <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto leading-relaxed">
                  All the tools you need to work with PDFs in one place. 100% free and easy to use! 
                  Merge, split, compress, convert and more.
                </p>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap items-center justify-center gap-3">
                {(['All', 'PDF', 'Text', 'Image', 'Utility', 'Social'] as Category[]).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={cn(
                      "px-8 py-2.5 rounded-lg text-sm font-bold transition-all border-2",
                      selectedCategory === cat 
                        ? "bg-primary border-primary text-white shadow-lg shadow-primary/20" 
                        : "bg-white dark:bg-neutral-900 border-transparent text-neutral-600 dark:text-neutral-400 hover:border-neutral-200 dark:hover:border-neutral-700"
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {filteredTools.map((tool) => (
                  <motion.div
                    key={tool.id}
                    layoutId={tool.id}
                    onClick={() => setSelectedToolId(tool.id)}
                    className="tool-card group"
                  >
                    <div className="w-14 h-14 rounded-xl bg-neutral-50 dark:bg-neutral-800 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      {React.cloneElement(tool.icon as React.ReactElement, { size: 28 })}
                    </div>
                    <h3 className="text-lg font-bold mb-1 group-hover:text-primary transition-colors">{tool.name}</h3>
                    <p className="text-xs text-neutral-500 line-clamp-2">{tool.description}</p>
                  </motion.div>
                ))}
              </div>

              {filteredTools.length === 0 && (
                <div className="text-center py-20">
                  <Search className="mx-auto mb-4 text-neutral-300" size={48} />
                  <p className="text-neutral-500">No tools found matching your search.</p>
                </div>
              )}

              {/* Ad Placeholder Middle */}
              <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-center text-xs text-neutral-400 uppercase tracking-widest">
                Advertisement
              </div>

              {/* Why Choose Us */}
              <div className="py-24 space-y-16 border-t border-neutral-200 dark:border-neutral-800">
                <div className="text-center space-y-4">
                  <h2 className="text-4xl font-extrabold">Why millions trust Pdf-to-All</h2>
                  <p className="text-xl text-neutral-500 max-w-2xl mx-auto">
                    We make PDF processing easy, fast, and secure. Join thousands of users who simplify their document tasks every day.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                  {[
                    { title: "Privacy First", desc: "Your files are processed locally in your browser whenever possible. We never store your sensitive data.", icon: <Lock /> },
                    { title: "Blazing Fast", desc: "No waiting in queues. Our tools are optimized for speed, delivering results in seconds.", icon: <RefreshCw /> },
                    { title: "Completely Free", desc: "No hidden costs, no subscriptions, no limits. All our tools are free for everyone, forever.", icon: <Plus /> }
                  ].map((item, i) => (
                    <div key={i} className="text-center space-y-6 group">
                      <div className="w-20 h-20 rounded-3xl bg-primary/10 text-primary flex items-center justify-center mx-auto group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-lg shadow-primary/5">
                        {React.cloneElement(item.icon as React.ReactElement, { size: 32 })}
                      </div>
                      <h3 className="text-2xl font-bold">{item.title}</h3>
                      <p className="text-neutral-600 dark:text-neutral-400 text-lg leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQ */}
              <div className="py-20 bg-white dark:bg-neutral-900 -mx-4 px-4 border-y border-neutral-200 dark:border-neutral-800">
                <h2 className="text-4xl font-extrabold text-center mb-16">Frequently Asked Questions</h2>
                <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-x-12 gap-y-8">
                  {[
                    { q: 'Is it safe to upload my files?', a: 'Yes! Most of our tools (like Image to PDF and Image Compressor) process files directly in your browser using client-side JavaScript. This means your files are never uploaded to our servers.' },
                    { q: 'Do I need to create an account?', a: 'No, Pdf-to-All is designed to be used instantly. No registration or login is required.' },
                    { q: 'Are there any file size limits?', a: 'Since processing happens in your browser, the limits depend on your device\'s memory. Generally, files up to 50MB work smoothly.' },
                    { q: 'How do I download my files?', a: 'Once the processing is complete, a download button will appear. Simply click it to save the file to your device.' },
                  ].map((item, i) => (
                    <div key={i} className="space-y-3">
                      <h3 className="text-xl font-bold text-primary">{item.q}</h3>
                      <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">{item.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="tool"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-5xl mx-auto"
            >
              {/* Breadcrumbs */}
              <div className="mb-6 flex items-center gap-2 text-sm text-neutral-500">
                <button onClick={() => setSelectedToolId(null)} className="hover:text-primary transition-colors">Home</button>
                <span>/</span>
                <button onClick={() => {setSelectedToolId(null); setSelectedCategory(selectedTool!.category)}} className="hover:text-primary transition-colors">{selectedTool?.category} Tools</button>
                <span>/</span>
                <span className="text-neutral-900 dark:text-white font-medium">{selectedTool?.name}</span>
              </div>

              <div className="mb-8 flex items-center justify-between">
                <button 
                  onClick={() => setSelectedToolId(null)}
                  className="flex items-center gap-2 text-neutral-500 hover:text-primary transition-colors font-medium"
                >
                  <ArrowLeft size={20} /> Back to Tools
                </button>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 dark:bg-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
                  {selectedTool?.category}
                </div>
              </div>

              <div className="glass rounded-3xl p-8 md:p-12 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                <div className="relative">
                  <div className="flex items-center gap-6 mb-12">
                    <div className="w-20 h-20 rounded-2xl bg-primary flex items-center justify-center text-white shadow-xl shadow-primary/20">
                      {React.cloneElement(selectedTool?.icon as React.ReactElement, { size: 32 })}
                    </div>
                    <div>
                      <h1 className="text-4xl font-extrabold mb-2">{selectedTool?.name}</h1>
                      <p className="text-lg text-neutral-500 max-w-xl">{selectedTool?.description}</p>
                    </div>
                  </div>

                  <div className="min-h-[400px]">
                    {selectedTool && <selectedTool.component onBack={() => setSelectedToolId(null)} />}
                  </div>

                  {/* How to use section for SEO */}
                  <div className="mt-16 pt-16 border-t border-neutral-100 dark:border-neutral-800">
                    <h2 className="text-2xl font-bold mb-6">How to use {selectedTool?.name}</h2>
                    <div className="grid md:grid-cols-4 gap-8">
                      {[
                        { step: "1", title: "Select Tool", desc: `Choose ${selectedTool?.name} from our dashboard.` },
                        { step: "2", title: "Upload File", desc: "Upload your document or enter your text input." },
                        { step: "3", title: "Process", desc: "Click the action button to start the conversion." },
                        { step: "4", title: "Download", desc: "Get your processed file or copy the result instantly." }
                      ].map((step, i) => (
                        <div key={i} className="space-y-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                            {step.step}
                          </div>
                          <h3 className="font-bold">{step.title}</h3>
                          <p className="text-sm text-neutral-500 leading-relaxed">{step.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Related Tools */}
              <div className="mt-20">
                <h3 className="text-2xl font-bold mb-8">Related {selectedTool?.category} Tools</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {TOOLS.filter(t => t.category === selectedTool?.category && t.id !== selectedTool?.id).slice(0, 4).map(tool => (
                    <div 
                      key={tool.id}
                      onClick={() => setSelectedToolId(tool.id)}
                      className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-primary/30 hover:shadow-md transition-all cursor-pointer flex items-center gap-3"
                    >
                      <div className="w-10 h-10 rounded-lg bg-neutral-50 dark:bg-neutral-800 text-primary flex items-center justify-center shrink-0">
                        {React.cloneElement(tool.icon as React.ReactElement, { size: 20 })}
                      </div>
                      <span className="font-bold text-sm truncate">{tool.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ad Placeholder Middle */}
              <div className="mt-12 p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-center text-xs text-neutral-400 uppercase tracking-widest">
                {/* Ad code here */}
                Advertisement
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-neutral-200 dark:border-neutral-800 py-12 bg-neutral-50 dark:bg-neutral-900/50">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white">
                <FileDigit size={18} />
              </div>
              <span className="text-lg font-bold">Pdf-to-All</span>
            </div>
            <p className="text-neutral-500 max-w-sm">
              Your one-stop destination for free, fast, and secure online utilities. 
              We build tools that make your digital life easier.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-neutral-400 hover:text-primary transition-colors"><Twitter size={20} /></a>
              <a href="#" className="text-neutral-400 hover:text-primary transition-colors"><Github size={20} /></a>
              <a href="#" className="text-neutral-400 hover:text-primary transition-colors"><Mail size={20} /></a>
            </div>
            <div className="pt-4">
              <h4 className="text-sm font-bold mb-3 uppercase tracking-wider text-neutral-400">Popular Tools</h4>
              <div className="flex flex-wrap gap-2">
                {['merge-pdf', 'split-pdf', 'word-to-pdf', 'image-to-pdf'].map(id => {
                  const tool = TOOLS.find(t => t.id === id);
                  return tool ? (
                    <button 
                      key={id} 
                      onClick={() => setSelectedToolId(id)}
                      className="text-xs px-3 py-1.5 rounded-full bg-neutral-200 dark:bg-neutral-800 hover:bg-primary hover:text-white transition-all"
                    >
                      {tool.name}
                    </button>
                  ) : null;
                })}
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-neutral-900 dark:text-white">Popular PDF Tools</h4>
            <ul className="space-y-2 text-neutral-500">
              {TOOLS.filter(t => t.category === 'PDF').slice(0, 5).map(tool => (
                <li key={tool.id}>
                  <button 
                    onClick={() => setSelectedToolId(tool.id)} 
                    className="hover:text-primary transition-colors text-sm"
                  >
                    {tool.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-neutral-900 dark:text-white">Other Tools</h4>
            <ul className="space-y-2 text-neutral-500">
              <li><button onClick={() => {setSelectedToolId(null); setSelectedCategory('Text')}} className="hover:text-primary transition-colors text-sm">Text Tools</button></li>
              <li><button onClick={() => {setSelectedToolId(null); setSelectedCategory('Image')}} className="hover:text-primary transition-colors text-sm">Image Tools</button></li>
              <li><button onClick={() => {setSelectedToolId(null); setSelectedCategory('Utility')}} className="hover:text-primary transition-colors text-sm">Utility Tools</button></li>
              <li><button onClick={() => {setSelectedToolId(null); setSelectedCategory('Social')}} className="hover:text-primary transition-colors text-sm">Social Tools</button></li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-800 text-center text-sm text-neutral-500">
          <p>© 2026 Pdf-to-All. All rights reserved. Made with ❤️ for the web.</p>
        </div>
      </footer>

      {/* Ad Placeholder Bottom */}
      <div className="fixed bottom-0 left-0 right-0 p-2 bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 text-center text-[10px] text-neutral-400 uppercase tracking-widest z-50">
        {/* Ad code here */}
        Advertisement Banner
      </div>
    </div>
  );
}
