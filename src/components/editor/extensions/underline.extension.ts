/* eslint-disable @typescript-eslint/no-explicit-any */
import { type Editor } from '@tiptap/react';
import TiptapUnderline, { UnderlineOptions } from '@tiptap/extension-underline';
import { ActionButton } from '@/components/buttons';

export type TUnderlineOptions = {} & UnderlineOptions;

export const UnderlineExtension = TiptapUnderline.extend<TUnderlineOptions>({
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
