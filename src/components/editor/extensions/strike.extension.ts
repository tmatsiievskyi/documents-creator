/* eslint-disable @typescript-eslint/no-explicit-any */
import { type Editor } from '@tiptap/react';
import TiptapStrike, { StrikeOptions } from '@tiptap/extension-strike';
import { ActionButton } from '@/components/buttons';

export type TStrikeOptions = {} & StrikeOptions;

export const StrikeExtension = TiptapStrike.extend<TStrikeOptions>({
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
            action: () => editor.commands.toggleStrike(),
            isActive: () => editor.isActive('strike'),
            disabled: !editor.can().toggleStrike(),
            icon: 'Strikethrough',
            tooltip: 'Strike',
          },
        };
      },
    };
  },
});
