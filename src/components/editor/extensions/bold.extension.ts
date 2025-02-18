/* eslint-disable @typescript-eslint/no-explicit-any */
import { type Editor } from '@tiptap/react';
import type { BoldOptions } from '@tiptap/extension-bold';
import TiptapBold from '@tiptap/extension-bold';
import { ActionButton } from '@/components/buttons';

export type TBoldOptions = {} & BoldOptions;

export const BoldExtension = TiptapBold.extend<TBoldOptions>({
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
            action: () => editor.commands.toggleBold(),
            isActive: () => editor.isActive('bold'),
            disabled: !editor.can().toggleBold(),
            icon: 'Bold',
            tooltip: 'Bold',
          },
        };
      },
    };
  },
});
