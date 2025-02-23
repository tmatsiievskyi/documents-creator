export const SHORTCUR_DIVIDER = '+';

export const SHORTCUT_KEYS_MAP = {
  Control: 'Ctrl',
  Equal: '=',
  Plus: '+',
  Minus: '-',
} as const;

export const SHORTCUT_KEYS = {
  zoomIn: ['Control+Equal', 'Control+Plus'],
  zoomOut: ['Control+Minus'],
  zoomReset: ['Control+Digit0'],
  outDent: ['Shift+Tab'],
  inDent: ['Tab'],
} as const;

export type TShortcutKeys = keyof typeof SHORTCUT_KEYS;
export type TShortcutValue = (typeof SHORTCUT_KEYS)[TShortcutKeys];
