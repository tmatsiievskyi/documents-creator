import { ActionButton } from '@/components/buttons';
import { Editor, Extension } from '@tiptap/core';

export const ExportEmailExtension = Extension.create({
  name: 'exportEmail',
  addOptions() {
    return {
      ...this.parent?.(),
      editorGroup: 'manage',
      group: 'export',
      button: ({ editor }: { editor: Editor }) => {
        return {
          component: ActionButton,
          componentProps: {
            action: () => editor.commands.toggleUnderline(),
            // isActive: () => editor.isActive('underline'),
            // disabled: !editor.can().toggleUnderline(),
            icon: 'Mail',
            tooltip: 'Send Email',
          },
        };
      },
    };
  },
});
