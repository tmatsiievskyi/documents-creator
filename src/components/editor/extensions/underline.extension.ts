/* eslint-disable @typescript-eslint/no-explicit-any */
import { type Editor } from '@tiptap/react';
import type { UnderlineOptions } from '@tiptap/extension-underline';
import TiptapUnderline from '@tiptap/extension-underline';
import { ActionButton } from '@/components/buttons';

export type TUnderlineOptions = {} & UnderlineOptions;

export const UnderlineExtension = TiptapUnderline.extend<TUnderlineOptions>({
  addOptions() {
    return {
      ...this.parent?.(),
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
            action: () => editor.commands.toggleUnderline(),
            isActive: () => editor.isActive('underline'),
            disabled: !editor.can().toggleUnderline(),
            icon: 'Underline',
            tooltip: 'Underline',
          },
        };
      },
    };
  },
});
