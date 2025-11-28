import React, { useEffect } from 'react';

const shortcuts = [
  { key: 'Ctrl + K', description: 'Search jobs', action: 'search' },
  { key: 'Ctrl + N', description: 'New application', action: 'new' },
  { key: 'Ctrl + S', description: 'Save changes', action: 'save' },
  { key: 'Ctrl + /', description: 'Toggle shortcuts help', action: 'help' },
  { key: 'Esc', description: 'Close modal/dialog', action: 'close' },
  { key: 'Ctrl + E', description: 'Export data', action: 'export' },
];

export const useKeyboardShortcuts = (callbacks = {}) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl + K - Search
      if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        callbacks.onSearch?.();
      }
      
      // Ctrl + N - New
      if (e.ctrlKey && e.key === 'n') {
        e.preventDefault();
        callbacks.onNew?.();
      }
      
      // Ctrl + S - Save
      if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        callbacks.onSave?.();
      }
      
      // Ctrl + / - Help
      if (e.ctrlKey && e.key === '/') {
        e.preventDefault();
        callbacks.onHelp?.();
      }
      
      // Esc - Close
      if (e.key === 'Escape') {
        callbacks.onClose?.();
      }
      
      // Ctrl + E - Export
      if (e.ctrlKey && e.key === 'e') {
        e.preventDefault();
        callbacks.onExport?.();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [callbacks]);

  return shortcuts;
};

export const KeyboardShortcutsHelp = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 animate-scaleIn">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Keyboard Shortcuts</h3>
        
        <div className="space-y-3 mb-6">
          {shortcuts.map((shortcut, index) => (
            <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
              <span className="text-sm text-gray-600">{shortcut.description}</span>
              <kbd className="px-2 py-1 bg-gray-100 border border-gray-300 rounded text-xs font-mono text-gray-800">
                {shortcut.key}
              </kbd>
            </div>
          ))}
        </div>
        
        <button
          onClick={onClose}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Got it!
        </button>
      </div>
    </div>
  );
};
