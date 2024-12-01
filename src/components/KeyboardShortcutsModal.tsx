import React from 'react';
import { X, Search, XCircle } from 'lucide-react';
import { clsx } from 'clsx';

interface ShortcutGroup {
  title: string;
  shortcuts: {
    keys: string[];
    description: string;
  }[];
}

const shortcuts: ShortcutGroup[] = [
  {
    title: 'Navigation',
    shortcuts: [
      {
        keys: ['?'],
        description: 'Show keyboard shortcuts',
      },
      {
        keys: ['/'],
        description: 'Focus search bar',
      },
      {
        keys: ['esc'],
        description: 'Clear search',
      },
      {
        keys: ['f'],
        description: 'Open feedback form',
      },
    ],
  },
];

interface KeyboardShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function KeyboardKey({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="inline-flex h-5 min-w-5 items-center justify-center rounded-md border border-gray-200 bg-gray-50/75 px-1 text-[11px] font-medium text-gray-600 shadow-sm backdrop-blur-sm">
      {children}
    </kbd>
  );
}

export function KeyboardShortcutsModal({ isOpen, onClose }: KeyboardShortcutsModalProps) {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-sm animate-fade-in rounded-xl border border-gray-200 bg-white p-4 shadow-xl">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-900">Keyboard Shortcuts</h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-4">
          {shortcuts.map((group) => (
            <div key={group.title} className="space-y-1.5">
              <h3 className="text-[11px] font-medium uppercase tracking-wider text-gray-500">{group.title}</h3>
              <div className="rounded-lg border border-gray-100 bg-gray-50/50 divide-y divide-gray-100">
                {group.shortcuts.map((shortcut) => (
                  <div
                    key={shortcut.description}
                    className="flex items-center justify-between px-3 py-1.5"
                  >
                    <span className="text-xs text-gray-600">{shortcut.description}</span>
                    <div className="flex items-center gap-1">
                      {shortcut.keys.map((key, index) => (
                        <React.Fragment key={key}>
                          <KeyboardKey>{key}</KeyboardKey>
                          {index < shortcut.keys.length - 1 && (
                            <span className="text-[10px] text-gray-400">+</span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-3 flex items-center justify-end border-t border-gray-100 pt-3">
          <button
            onClick={onClose}
            className="rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}