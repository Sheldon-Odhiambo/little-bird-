
import React, { useState, useRef, useEffect } from 'react';
import { Bird, Send, X, MessageCircle, Camera } from 'lucide-react';
import { getLaundryAdvice } from '../services/geminiService';
import { ChatMessage } from '../types';

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Hi! I'm Chirpy, your Little Bird assistant. Ask me about stain removal, delicate fabric care, or laundry tips! You can even send a photo of a stain." }
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
        const result = reader.result as string;
        const base64 = result.split(',')[1];
        setAttachedImage({
          data: base64,
          mimeType: file.type,
          preview: result
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
    
    setMessages(prev => [...prev, { role: 'user', text: userMsg || "[Image Sent]" }]);
    setIsLoading(true);

    const promptText = userMsg || "Please analyze this image and provide laundry advice.";
    const response = await getLaundryAdvice(promptText, currentImage ? { data: currentImage.data, mimeType: currentImage.mimeType } : undefined);
    
    setMessages(prev => [...prev, { role: 'model', text: response || "I'm sorry, I'm having trouble thinking right now. Please try again or contact our human team!" }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 w-[350px] h-[550px] bg-white rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] border border-blue-50 flex flex-col overflow-hidden animate-in slide-in-from-bottom-8 duration-500">
          <div className="bg-blue-600 p-6 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2.5 rounded-xl">
                <Bird size={24} />
              </div>
              <div>
                <h3 className="font-black leading-none tracking-tight">Chirpy</h3>
                <span className="text-[10px] text-blue-200 uppercase font-black tracking-widest">Luxe Care AI</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-2 rounded-xl transition-colors">
              <X size={20} />
            </button>
          </div>

          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/50 custom-scrollbar"
          >
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[85%] p-4 rounded-2xl text-sm font-medium leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-tr-none shadow-md' 
                    : 'bg-white text-slate-700 shadow-sm border border-slate-100 rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-4 rounded-2xl border border-slate-100 rounded-tl-none flex gap-1 animate-pulse">
                  <div className="w-1.5 h-1.5 bg-blue-300 rounded-full animate-bounce" />
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
          </div>

          {attachedImage && (
            <div className="px-6 py-3 bg-slate-50/80 border-t border-slate-100">
              <div className="relative inline-block">
                <img src={attachedImage.preview} alt="Preview" className="w-20 h-20 object-cover rounded-2xl border-4 border-white shadow-md" />
                <button 
                  onClick={() => setAttachedImage(null)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white p-1.5 rounded-full shadow-lg border-2 border-white hover:scale-110 transition-transform"
                >
                  <X size={10} />
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
              className="text-slate-400 hover:text-blue-600 p-2.5 rounded-xl transition-all hover:bg-blue-50"
              title="Add Image"
            >
              <Camera size={20} />
            </button>
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about stain removal..."
              className="flex-1 bg-slate-100 px-5 py-3.5 rounded-2xl text-sm font-medium outline-none focus:ring-2 ring-blue-500/20 transition-all border border-transparent focus:bg-white focus:border-blue-100"
            />
            <button 
              onClick={handleSend}
              className="bg-blue-600 text-white p-3.5 rounded-2xl hover:bg-blue-700 transition-all shadow-lg active:scale-95"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="group relative bg-blue-600 text-white p-5 rounded-full shadow-2xl shadow-blue-300 hover:scale-110 active:scale-95 transition-all flex items-center gap-3 floating-whatsapp"
      >
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 border-2 border-white rounded-full animate-pulse" />
        {!isOpen && (
          <div className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-in-out whitespace-nowrap">
            <span className="text-sm font-black pl-1">Care Assistant</span>
          </div>
        )}
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </button>
    </div>
  );
};

export default ChatWidget;
