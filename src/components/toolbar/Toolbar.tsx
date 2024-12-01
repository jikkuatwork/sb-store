import React from 'react';
import { HelpCircle, Mail, Info } from 'lucide-react';
import { SocialLinks } from './SocialLinks';
import { Message } from './Message';
import { KeyboardShortcutsModal } from '../KeyboardShortcutsModal';
import { FeedbackModal } from './FeedbackModal';
import { InfoModal } from './InfoModal';
import { useLocation } from 'react-router-dom';
import { clsx } from 'clsx';

interface ToolbarMessage {
  id: string;
  text: string;
  type?: 'info' | 'success' | 'warning' | 'error';
}

export function Toolbar() {
  const [messages, setMessages] = React.useState<ToolbarMessage[]>([]);
  const [isShortcutsModalOpen, setIsShortcutsModalOpen] = React.useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = React.useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = React.useState(false);
  const location = useLocation();

  const addMessage = React.useCallback((message: ToolbarMessage) => {
    setMessages(prev => [...prev, message]);
    setTimeout(() => {
      setMessages(prev => prev.filter(m => m.id !== message.id));
    }, 5000);
  }, []);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check if focus is in an input or textarea element
      if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') {
        return;
      }

      if (e.key === '?' && e.shiftKey && !e.ctrlKey && !e.altKey && !e.metaKey) {
        e.preventDefault();
        setIsShortcutsModalOpen(true);
      } else if (e.key === 'f' && !e.shiftKey && !e.ctrlKey && !e.altKey && !e.metaKey) {
        e.preventDefault();
        setIsFeedbackModalOpen(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <div className="fixed bottom-0 right-0 z-50 flex h-8 items-center justify-between border-t border-gray-200 bg-white/80 backdrop-blur-sm backdrop-saturate-150 supports-[backdrop-filter]:bg-white/60 px-3" style={{ width: 'calc(100% - 16rem)' }}>
        <div className="flex items-center gap-2">
          {messages.map(message => (
            <Message
              key={message.id}
              message={message.text}
              type={message.type}
              onDismiss={() => setMessages(prev => prev.filter(m => m.id !== message.id))}
            />
          ))}
        </div>

        <div className="flex items-center gap-3">
          <SocialLinks />
          <div className="h-3 w-px bg-gray-200" />
          <button
            onClick={() => setIsFeedbackModalOpen(true)}
            className="rounded-lg p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
            aria-label="Send Feedback"
          >
            <Mail className="h-3 w-3" />
          </button>
          <button
            onClick={() => setIsShortcutsModalOpen(true)}
            className="rounded-lg p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
            aria-label="Keyboard Shortcuts"
          >
            <HelpCircle className="h-3 w-3" />
          </button>
          <button
            onClick={() => setIsInfoModalOpen(true)}
            className="rounded-lg p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
            aria-label="About Store"
          >
            <Info className="h-3 w-3" />
          </button>
        </div>
      </div>

      <KeyboardShortcutsModal 
        isOpen={isShortcutsModalOpen}
        onClose={() => setIsShortcutsModalOpen(false)}
      />

      <FeedbackModal
        isOpen={isFeedbackModalOpen}
        onClose={() => setIsFeedbackModalOpen(false)}
      />

      <InfoModal
        isOpen={isInfoModalOpen}
        onClose={() => setIsInfoModalOpen(false)}
      />
    </>
  );
}