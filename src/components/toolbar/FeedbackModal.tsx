import React from 'react';
import { X, Send } from 'lucide-react';
import { clsx } from 'clsx';
import { Toast } from '../Toast';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const reactions = [
  { emoji: '😠', label: 'Angry', value: 1 },
  { emoji: '🙁', label: 'Sad', value: 2 },
  { emoji: '😐', label: 'Neutral', value: 3 },
  { emoji: '🙂', label: 'Happy', value: 4 },
  { emoji: '😍', label: 'Love it', value: 5 },
];

export function FeedbackModal({ isOpen, onClose }: FeedbackModalProps) {
  const [selectedReaction, setSelectedReaction] = React.useState<number | null>(null);
  const [subject, setSubject] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [isSending, setIsSending] = React.useState(false);
  const [showToast, setShowToast] = React.useState(false);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedReaction) return;

    setIsSending(true);
    // Simulate sending feedback
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSending(false);
    
    // Reset form
    setSelectedReaction(null);
    setSubject('');
    setDescription('');
    
    onClose();
    
    // Show toast after modal is closed
    setTimeout(() => {
      setShowToast(true);
    }, 300);
  };

  if (!isOpen && !showToast) return null;

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div 
            className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm"
            onClick={onClose}
          />
          
          <div className="relative w-full max-w-sm animate-fade-in rounded-xl border border-gray-200 bg-white p-4 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-gray-900">Send Feedback</h2>
              <button
                onClick={onClose}
                className="rounded-lg p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-medium uppercase tracking-wider text-gray-500">
                  How was your experience?
                </label>
                <div className="flex justify-between rounded-lg border border-gray-100 bg-gray-50/50 p-3">
                  {reactions.map(({ emoji, label, value }) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setSelectedReaction(value)}
                      className={clsx(
                        "group flex flex-col items-center gap-1 rounded-lg p-2 transition-all",
                        selectedReaction === value
                          ? "bg-indigo-50 text-indigo-600"
                          : "hover:bg-gray-100"
                      )}
                    >
                      <span className="text-2xl transition-transform group-hover:scale-110">
                        {emoji}
                      </span>
                      <span className={clsx(
                        "text-[10px] font-medium",
                        selectedReaction === value
                          ? "text-indigo-600"
                          : "text-gray-500"
                      )}>
                        {label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-medium uppercase tracking-wider text-gray-500">
                  Subject (Optional)
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Brief description of your feedback"
                  className="block w-full rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-medium uppercase tracking-wider text-gray-500">
                  Description (Optional)
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Tell us more about your experience..."
                  rows={3}
                  className="block w-full rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="flex items-center justify-end border-t border-gray-100 pt-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="mr-2 rounded-lg px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!selectedReaction || isSending}
                  className={clsx(
                    "flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white transition-all",
                    (!selectedReaction || isSending)
                      ? "cursor-not-allowed opacity-50"
                      : "hover:bg-indigo-700"
                  )}
                >
                  <Send className="h-3 w-3" />
                  {isSending ? 'Sending...' : 'Send Feedback'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showToast && (
        <Toast
          message="Thanks for your feedback! 😊"
          onClose={() => setShowToast(false)}
        />
      )}
    </>
  );
}