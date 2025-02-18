import { ActionButton } from '@/components/buttons';
import { Editor, Extension } from '@tiptap/core';

export const HistoryExtension = Extension.create({
  name: 'history',
  addOptions() {
    return {
      ...this.parent?.(),
      editorGroup: 'manage',
      group: 'history',
      button({ editor }: { editor: Editor }) {
        return [
          {
            component: ActionButton,
            componentProps: {
              action: () => {
                editor.commands.indent();
              },
              // shortcutKeys: ['Tab'],
              icon: 'Undo2',
              tooltip: `Undo`,
            },
          },
          {
            component: ActionButton,
            componentProps: {
              action: () => {
                editor.commands.outdent();
              },
              // shortcutKeys: ['Shift', 'Tab'],
              icon: 'Redo2',
              tooltip: `Redo`,
            },
          },
        ];
      },
    };
  },
});
