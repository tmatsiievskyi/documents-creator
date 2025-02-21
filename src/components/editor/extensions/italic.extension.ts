/* eslint-disable @typescript-eslint/no-explicit-any */
import { type Editor } from '@tiptap/react';
import TiptapItalic, { ItalicOptions } from '@tiptap/extension-italic';
import { ActionButton } from '@/components/buttons';

export type TItalicOptions = {} & ItalicOptions;

export const ItalicExtension = TiptapItalic.extend<TItalicOptions>({
  addOptions() {
    return {
      ...this.parent?.(),
      editorGroup: 'ui',
      group: 'paragraph',
      button: ({
        editor,
      }: // t, //TODO: localization
      {
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
