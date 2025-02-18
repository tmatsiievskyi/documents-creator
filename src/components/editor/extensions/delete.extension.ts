import { ActionButton } from '@/components/buttons';
import { Editor, Extension } from '@tiptap/core';

export const DeleteExtension = Extension.create({
  name: 'delete',
  addOptions() {
    return {
      ...this.parent?.(),
      editorGroup: 'manage',
      group: 'crud',
      button: ({ editor }: { editor: Editor }) => {
        return {
          component: ActionButton,
          componentProps: {
            icon: 'Trash2',

            tooltip: 'Delete',
          },
        };
      },
    };
  },
});
