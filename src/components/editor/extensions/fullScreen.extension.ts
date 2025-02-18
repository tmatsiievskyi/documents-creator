import { ActionButton } from '@/components/buttons';
import { Editor, Extension } from '@tiptap/core';

export const FullScreenExtension = Extension.create({
  name: 'fullScreen',
  addOptions() {
    return {
      ...this.parent?.(),
      editorGroup: 'manage',
      group: 'crud',
      button: ({ editor }: { editor: Editor }) => {
        return {
          component: ActionButton,
          componentProps: {
            icon: 'Fullscreen',
            tooltip: 'Fullscreen',
          },
        };
      },
    };
  },
});
