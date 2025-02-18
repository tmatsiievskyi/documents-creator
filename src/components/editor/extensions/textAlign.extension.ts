import { Editor, Extension } from '@tiptap/core';
import type { TextAlignOptions as TBaseTextAlignOptions } from '@tiptap/extension-text-align';
import TiptapTextAlign from '@tiptap/extension-text-align';
import { TextAlignSelector } from '../components';

type TAlignments = 'left' | 'center' | 'right' | 'justify';

export type TTextAlignOptions = {
  alignments: TAlignments;
} & TBaseTextAlignOptions;

export const TextAlignExtension = TiptapTextAlign.extend<TTextAlignOptions>({
  addOptions() {
    return {
      ...this.parent?.(),
      editorGroup: 'ui',
      group: 'format',
      types: ['heading', 'paragraph', 'list_item', 'title'],
      button({ editor, extension }: { editor: Editor; extension: Extension }) {
        const aligments =
          (extension.options?.alignments as TAlignments[]) || [];

        const iconMap = {
          left: 'AlignLeft',
          center: 'AlignCenter',
          right: 'AlignRight',
          justify: 'AlignJustify',
        };

        const items = aligments.map((alignment) => {
          return {
            title: alignment,
            icon: iconMap[alignment],
            isActive: () => editor.isActive({ textAlign: alignment }) || false,
            action: () => editor.commands?.setTextAlign?.(alignment),
            disabled: !editor?.can?.()?.setTextAlign?.(alignment),
          };
        });
        // const disabled = items.every((item) => item.disabled);

        return {
          component: TextAlignSelector,
          componentProps: {
            icon: 'AlignLeft',
            tooltip: 'Text Align',
            disabled: false,
            items,
          },
        };
      },
    };
  },
});
