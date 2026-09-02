import { useEffect } from 'react';

type KeyCombo = {
  key: string;
  ctrlKey?: boolean;
  metaKey?: boolean;
  altKey?: boolean;
  shiftKey?: boolean;
};

export function useKeyboardShortcut(
  combo: KeyCombo,
  callback: (e: KeyboardEvent) => void,
  enabled: boolean = true
) {
  useEffect(() => {
    if (!enabled) return;

    const handler = (event: KeyboardEvent) => {
      const isKeyMatch = event.key.toLowerCase() === combo.key.toLowerCase();
      const isCtrlMatch = combo.ctrlKey ? event.ctrlKey || event.metaKey : true;
      const isAltMatch = combo.altKey ? event.altKey : true;
      const isShiftMatch = combo.shiftKey ? event.shiftKey : true;

      if (isKeyMatch && isCtrlMatch && isAltMatch && isShiftMatch) {
        event.preventDefault();
        callback(event);
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [combo, callback, enabled]);
}
