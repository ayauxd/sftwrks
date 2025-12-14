/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { sendMessageToGemini } from '../services/geminiService';

const Assistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Softworks Advisory System. I am tiwa.ai (Tool Intelligent Workflow Assistant). Ready for instructions.', timestamp: Date.now() }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMsg: ChatMessage = { role: 'user', text: inputValue, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsThinking(true);

    try {
      const history = messages.map(m => ({ role: m.role, text: m.text }));
      const responseText = await sendMessageToGemini(history, userMsg.text);
      
      const aiMsg: ChatMessage = { role: 'model', text: responseText, timestamp: Date.now() };
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
       console.error(error);
    } finally {
      setIsThinking(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
      {isOpen && (
        <div className="bg-white dark:bg-stone-900 rounded-none shadow-xl border border-gray-300 dark:border-stone-700 w-[90vw] sm:w-[400px] h-[550px] mb-4 flex flex-col overflow-hidden animate-fade-in-up">
          {/* Header */}
          <div className="bg-stone-100 dark:bg-stone-800 p-4 border-b border-gray-200 dark:border-stone-700 flex justify-between items-center">
            <div className="flex flex-col">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-600 rounded-full animate-pulse"></div>
                    <span className="font-mono text-xs font-bold text-gray-500 dark:text-stone-400 uppercase tracking-wider">System Active</span>
                </div>
                <span className="font-bold text-gray-800 dark:text-stone-200 text-sm font-['Courier_Prime']">tiwa.ai</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-900 dark:hover:text-stone-200 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
          </div>

          {/* Chat Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-white dark:bg-stone-900" ref={scrollRef}>
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`max-w-[85%] p-4 text-sm leading-relaxed border ${
                    msg.role === 'user' 
                      ? 'bg-stone-100 dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-gray-900 dark:text-stone-200 rounded-tr-none rounded-lg' 
                      : 'bg-white dark:bg-stone-900 border-gray-200 dark:border-stone-700 text-gray-700 dark:text-stone-300 shadow-sm rounded-tl-none rounded-lg'
                  }`}
                >
                   {msg.role === 'model' && <div className="text-[10px] uppercase tracking-wider text-orange-700 dark:text-orange-500 mb-2 font-bold font-mono">tiwa.ai</div>}
                  {msg.text}
                </div>
              </div>
            ))}
            {isThinking && (
               <div className="flex justify-start">
                 <div className="bg-white dark:bg-stone-900 border border-gray-200 dark:border-stone-700 p-4 rounded-lg shadow-sm">
                   <div className="flex gap-1.5">
                     <div className="w-1.5 h-1.5 bg-orange-400 animate-pulse"></div>
                     <div className="w-1.5 h-1.5 bg-orange-400 animate-pulse delay-100"></div>
                     <div className="w-1.5 h-1.5 bg-orange-400 animate-pulse delay-200"></div>
                   </div>
                 </div>
               </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 bg-gray-50 dark:bg-stone-800 border-t border-gray-200 dark:border-stone-700">
            <div className="flex gap-2 relative">
              <input 
                type="text" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Initialize workflow..." 
                className="flex-1 bg-white dark:bg-stone-900 border border-gray-300 dark:border-stone-600 focus:border-gray-500 dark:focus:border-stone-400 focus:ring-0 px-3 py-2 text-sm outline-none transition-colors placeholder-gray-400 text-gray-900 dark:text-stone-200 rounded-sm font-sans"
              />
              <button 
                onClick={handleSend}
                disabled={!inputValue.trim() || isThinking}
                className="bg-stone-900 dark:bg-stone-200 text-white dark:text-stone-900 px-4 py-2 rounded-sm hover:bg-orange-700 dark:hover:bg-orange-600 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium text-xs uppercase tracking-wider"
              >
                Run
              </button>
            </div>
          </div>
        </div>
      )}

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white dark:bg-stone-800 text-gray-900 dark:text-stone-100 border border-gray-300 dark:border-stone-600 px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-300 z-50 flex items-center gap-3"
      >
        <div className={`w-2 h-2 rounded-full ${isOpen ? 'bg-orange-600' : 'bg-gray-400 dark:bg-stone-500'}`}></div>
        <span className="font-mono text-xs font-bold tracking-widest uppercase">
          {isOpen ? 'Close Terminal' : 'tiwa.ai'}
        </span>
      </button>
    </div>
  );
};

export default Assistant;