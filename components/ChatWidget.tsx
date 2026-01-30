
import React, { useState, useRef, useEffect } from 'react';
import { Bird, Send, X, MessageCircle, Camera, Paperclip } from 'lucide-react';
import { getLaundryAdvice } from '../services/geminiService';
import { ChatMessage } from '../types';

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Hi! I'm Chirpy, your Little Bird assistant. I'm here to help with 'stain removal', 'delicate fabric care', or 'allergy-friendly washing' tips. Ask me anything or upload a photo of a tough stain!" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [attachedImage, setAttachedImage] = useState<{ data: string, mimeType: string, preview: string } | null>(null);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = (reader.result as string).split(',')[1];
        setAttachedImage({
          data: base64,
          mimeType: file.type,
          preview: reader.result as string
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSend = async () => {
    if ((!input.trim() && !attachedImage) || isLoading) return;

    const userMsg = input.trim();
    const currentImage = attachedImage;
    
    setInput('');
    setAttachedImage(null);
    
    setMessages(prev => [...prev, { role: 'user', text: userMsg || (currentImage ? "[Image sent]" : "") }]);
    setIsLoading(true);

    const promptText = userMsg || "Please analyze this image and provide laundry advice.";
    const response = await getLaundryAdvice(promptText, currentImage ? { data: currentImage.data, mimeType: currentImage.mimeType } : undefined);
    
    setMessages(prev => [...prev, { role: 'model', text: response || "I'm not sure how to answer that, please contact our human team!" }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 w-[350px] h-[550px] bg-white rounded-[2rem] shadow-2xl border border-blue-100 flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
          <div className="bg-blue-600 p-6 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-xl">
                <Bird size={24} />
              </div>
              <div>
                <h3 className="font-bold leading-none">Chirpy</h3>
                <span className="text-[10px] text-blue-200 uppercase font-bold tracking-widest">Laundry Expert</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-1 rounded-lg">
              <X size={20} />
            </button>
          </div>

          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50 custom-scrollbar"
          >
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-tr-none' 
                    : 'bg-white text-slate-700 shadow-sm border border-slate-100 rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-4 rounded-2xl border border-slate-100 rounded-tl-none animate-pulse">
                  <div className="flex gap-1">
                    <div className="w-1 h-1 bg-slate-300 rounded-full" />
                    <div className="w-1 h-1 bg-slate-300 rounded-full" />
                    <div className="w-1 h-1 bg-slate-300 rounded-full" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {attachedImage && (
            <div className="px-4 py-2 bg-slate-50 border-t border-slate-100">
              <div className="relative inline-block">
                <img src={attachedImage.preview} alt="Stain preview" className="w-16 h-16 object-cover rounded-xl border-2 border-blue-500" />
                <button 
                  onClick={() => setAttachedImage(null)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full shadow-md"
                >
                  <X size={12} />
                </button>
              </div>
            </div>
          )}

          <div className="p-4 bg-white border-t border-slate-100 flex gap-2 items-center">
            <input 
              type="file" 
              accept="image/*" 
              ref={fileInputRef} 
              className="hidden" 
              onChange={handleImageSelect}
            />
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="text-slate-400 hover:text-blue-600 p-2 transition-colors"
              title="Upload stain photo"
            >
              <Camera size={20} />
            </button>
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about stains..."
              className="flex-1 bg-slate-100 px-4 py-3 rounded-xl text-sm outline-none focus:ring-2 ring-blue-500/20 transition-all"
            />
            <button 
              onClick={handleSend}
              className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 transition-colors"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="group bg-blue-600 text-white p-5 rounded-full shadow-2xl shadow-blue-300 hover:scale-110 active:scale-95 transition-all flex items-center gap-3"
      >
        {!isOpen && (
          <div className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-in-out whitespace-nowrap">
            <span className="text-sm font-bold pl-1">Need Care Advice?</span>
          </div>
        )}
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </button>
    </div>
  );
};

export default ChatWidget;
