import { Editor, Extension } from '@tiptap/core';
import { ActionButton } from '@/components/buttons';
import { SHORTCUT_KEYS } from '@/shared/constants';

type TIndentOptions = {
  types: string[];
  maxIndent: number;
  minIndent: number;
};

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    indent: {
      /**
       * From left
       */
      indent: () => ReturnType;
      /**
       * From right
       */
      outdent: () => ReturnType;
    };
  }
}

// const TAB_CHAR = '\u0009';
const TAB_CHAR = '\u00A0\u00A0\u00A0\u00A0';
const TAB_LENGTH = TAB_CHAR.length;

// TODO: check with list

export const IndentExtension = Extension.create<TIndentOptions>({
  name: 'indent',
  addOptions() {
    return {
      ...this.parent?.(),
      editorGroup: 'ui',
      group: 'format',
      button({ editor }: { editor: Editor }) {
        return [
          {
            component: ActionButton,
            componentProps: {
              action: () => {
                editor.commands.indent();
              },
              shortcutKeys: SHORTCUT_KEYS['inDent'],
              icon: 'IndentIncrease',
              tooltip: `Indent`,
            },
          },
          {
            component: ActionButton,
            componentProps: {
              action: () => {
                editor.commands.outdent();
              },
              shortcutKeys: SHORTCUT_KEYS['outDent'],
              icon: 'IndentDecrease',
              tooltip: `Outdent`,
            },
          },
        ];
      },
    };
  },
  addCommands() {
    return {
      indent:
        () =>
        ({ chain, editor }) => {
          const isInsideList: boolean =
            editor.isActive('bulletList') || editor.isActive('orderedList');

          if (!isInsideList) {
            return chain()
              .command(({ tr }) => {
                tr.insertText(TAB_CHAR);
                return true;
              })
              .run();
          }

          return chain().run();
        },
      outdent:
        () =>
        ({ chain, editor }) => {
          const { selection } = editor.state;
          const { $from } = selection;
          const pos = $from.pos;

          const isInsideList: boolean =
            editor.isActive('bulletList') || editor.isActive('orderedList');

          if (!isInsideList && pos >= TAB_LENGTH) {
            return chain()
              .command(({ tr }) => {
                tr.delete(pos - TAB_LENGTH, pos);
                return true;
              })
              .run();
          }

          return chain().run();
        },
    };
  },
  addKeyboardShortcuts() {
    return {
      Tab: ({ editor }) => {
        editor.commands.indent();
        return true;
      },
      'Shift-Tab': ({ editor }) => {
        editor.commands.outdent();
        return true;
      },
    };
  },
});
