'use client';

import { createContext, ReactNode, useCallback, useContext, useState } from 'react';
import { useEventListener, useZoom } from '../hooks';
import { SHORTCUT_KEYS, TShortcutKeys, TShortcutValue } from '../constants';

export type TZoomContext = {
  zoom: number;
  zoomIn: () => void;
  zoomOut: () => void;
  resetZoom: () => void;
  initialZoom: number;
};

export type TZoomProviderProps = {
  children: ReactNode;
  minZoom?: number;
  maxZoom?: number;
  step?: number;
  initialZoom?: number;
  shortCuts?: Partial<TZoomShortcuts>;
  isShortcutsEnabledByDefault: boolean;
};

export type TZoomShortcuts = {
  zoomIn: string[];
  zoomOut: string[];
  reset: string[];
};

const ZoomContext = createContext<TZoomContext | null>(null);

const DEFAULT_SHORTCUTS: Partial<Record<TShortcutKeys, TShortcutValue>> = Object.entries(
  SHORTCUT_KEYS
).reduce(
  (acc, [key, value]) => {
    if (key.includes('zoom')) {
      return {
        ...acc,
        [key]: value,
      };
    }

    return acc;
  },
  {} as Partial<Record<TShortcutKeys, TShortcutValue>>
);

export const ZoomProvider = ({
  children,
  isShortcutsEnabledByDefault = true,
  ...restProps
}: TZoomProviderProps) => {
  const [isShortcutsEnabled, setIsShortcutEnabled] = useState(isShortcutsEnabledByDefault);
  const zoomState = useZoom(restProps);

  const toggleShortcuts = useCallback(() => {
    setIsShortcutEnabled(prev => !prev);
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isShortcutsEnabled) return;

      const keyboardKeys = [];
      if (e.ctrlKey) keyboardKeys.push('Control');
      if (e.metaKey) keyboardKeys.push('Meta');
      if (e.key !== 'Control' && e.key !== 'Meta' && e.key !== 'Shift' && e.key !== 'Alt') {
        keyboardKeys.push(e.code);
      }

      const combination = keyboardKeys.join('+');

      if (
        DEFAULT_SHORTCUTS.zoomIn?.some(
          shortcut => shortcut.toLowerCase() === combination.toLowerCase()
        )
      ) {
        e.preventDefault();
        zoomState.zoomIn();
      } else if (
        DEFAULT_SHORTCUTS.zoomOut?.some(
          shortcut => shortcut.toLowerCase() === combination.toLowerCase()
        )
      ) {
        e.preventDefault();
        zoomState.zoomOut();
      } else if (
        DEFAULT_SHORTCUTS.zoomReset?.some(
          shortcut => shortcut.toLowerCase() === combination.toLowerCase()
        )
      ) {
        e.preventDefault();
        zoomState.resetZoom();
      }
    },
    [isShortcutsEnabled, zoomState]
  );

  let el = null;
  if (typeof window !== 'undefined') {
    el = window;
  }

  useEventListener('keydown', handleKeyDown, el);

  const contextValue = {
    ...zoomState,
    isShortcutsEnabled,
    toggleShortcuts,
  };

  return <ZoomContext value={contextValue}>{children}</ZoomContext>;
};

export const useZoomContext = () => {
  const context = useContext(ZoomContext);

  if (context === null) {
    throw new Error('ZoomContext is required inside useZoomContext');
  }

  return context;
};
