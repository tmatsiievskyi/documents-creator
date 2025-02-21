import { ActionButton } from '@/components/buttons';
import { Editor, Extension } from '@tiptap/core';

export const SaveExtension = Extension.create({
  name: 'save',
  addOptions() {
    return {
      ...this.parent?.(),
      editorGroup: 'manage',
      group: 'crud',
      button: ({ editor: _editor }: { editor: Editor }) => {
        return {
          component: ActionButton,
          componentProps: {
            icon: 'Save',
            tooltip: 'Save',
          },
        };
      },
    };
  },
});
