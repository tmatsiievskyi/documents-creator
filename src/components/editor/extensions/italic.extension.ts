import { type Editor } from '@tiptap/react';
import type { ItalicOptions } from '@tiptap/extension-italic';
import TiptapItalic from '@tiptap/extension-italic';
import { ActionButton } from '@/components/buttons';

export type TItalicOptions = {} & ItalicOptions;

export const ItalicExtension = TiptapItalic.extend<TItalicOptions>({
  addOptions() {
    return {
      ...this.parent?.(),
      button: ({
        editor,
        t,
      }: {
        editor: Editor;
        t: (...args: any[]) => string;
      }) => {
        return {
          component: ActionButton,
          componentProps: {
            action: () => editor.commands.toggleItalic(),
            isActive: () => editor.isActive('italic'),
            disabled: !editor.can().toggleItalic(),
            icon: 'Italic',
            tooltip: 'Italic',
          },
        };
      },
    };
  },
});