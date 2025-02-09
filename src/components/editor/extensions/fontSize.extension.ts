import { DEFAULT_FONT_SIZE, DEFAULT_FONT_SIZES_LIST } from '@/shared/constants';
import { Extension, Editor } from '@tiptap/core';
import { FontSizeSelector } from '../components';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    fontSize: {
      /**
       * Set the font size. ex: "16px", "2em", "small"
       */
      setFontSize: (fontSize: string) => ReturnType;

      /**
       * Unset the font size
       */
      unsetFontSize: () => ReturnType;

      /**
       * Unset the font size
       */
      increaseFontSize: (fontSize: string) => ReturnType;
    };
  }
}

type TFontSizeOptions = {
  types: string[];
  fontSizes: (string | Record<string, string>)[];
};

export const FontSizeExtension = Extension.create<TFontSizeOptions>({
  name: 'fontSize',
  addOptions() {
    return {
      ...this.parent?.(),
      group: 'fontSize',
      types: ['textStyle'],
      fontSizes: [...DEFAULT_FONT_SIZES_LIST.map((item) => item + 'px')],
      button({ editor }: { editor: Editor }) {
        const items = DEFAULT_FONT_SIZES_LIST.map((item) => {
          const itemWithPx = item + 'px';
          return {
            title: item,
            value: itemWithPx,
            action: () => editor.commands.setFontSize(itemWithPx),
            isActive: () => editor.isActive({ fontSize: itemWithPx }) || false,
            disabled: !editor.can().setFontSize(itemWithPx),
            default: item === DEFAULT_FONT_SIZE,
          };
        });
        return {
          component: FontSizeSelector,
          componentProps: {
            editor,
            tooltip: 'Font Size',
            disabled: false,
            items,
            defaultFontSize: DEFAULT_FONT_SIZE,
            actionPlus: (fontSize: string) =>
              editor.commands.increaseFontSize(fontSize),
          },
        };
      },
    };
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: null,
            parseHTML: (element) =>
              element.style.fontSize.replaceAll(/["']+/g, ''),
            renderHTML: (attributes) => {
              if (!attributes.fontSize) {
                return {};
              }
              return {
                style: `font-size: ${attributes.fontSize}`,
              };
            },
          },
        },
      },
    ];
  },
  addCommands() {
    return {
      setFontSize:
        (fontSize) =>
        ({ chain }) => {
          return chain().setMark('textStyle', { fontSize }).run();
        },
      unsetFontSize:
        () =>
        ({ chain }) => {
          return chain()
            .setMark('textStyle', { fontSize: null })
            .removeEmptyTextStyle()
            .run();
        },
    };
  },
});
