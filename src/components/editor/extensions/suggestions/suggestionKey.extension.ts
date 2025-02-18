import { Extension } from '@tiptap/core';
import Suggestion from '@tiptap/suggestion';
import { TCommandProps, TKeyRenderProps, TSuggestionKeyEvent } from './_types';
import { ReactRenderer } from '@tiptap/react';
import { Plugin, PluginKey } from 'prosemirror-state';

import tippy from 'tippy.js';
import { SuggestionList } from './suggestionList';
import { getSuggestionItems } from './suggestion.data';

export const SuggestionKey = Extension.create({
  name: 'suggestionKey',
  addOptions() {
    return {
      suggestion: {
        char: '++', //TODO: remove to const
        newLine: false,
        command: ({ editor, range, props }: TCommandProps) => {
          const selectedKey = props.item.title;

          editor
            .chain()
            .focus()
            .deleteRange(range)
            .insertContent(`{{${selectedKey}`)
            .run();

          const newPos = range.from + selectedKey.length + 2;

          const event: TSuggestionKeyEvent = {
            key: selectedKey,
            range: {
              from: newPos,
              to: newPos,
            },
          };

          editor.emit('keySelected', event);
        },

        items: ({ query }: { query: string }) => {
          return getSuggestionItems()
            .filter((item) =>
              item.suggestion.toLowerCase().includes(query.toLowerCase())
            )
            .map((item) => ({
              title: item.suggestion,
              description: item.description,
            }));
        },

        render: () => {
          let component: ReactRenderer | null = null;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          let popup: any | null = null;

          return {
            onStart: (props: TKeyRenderProps) => {
              component = new ReactRenderer(SuggestionList, {
                editor: props.editor,
                props: {
                  ...props,
                  title: 'Select Key',
                },
              });

              popup = tippy('body', {
                getReferenceClientRect: props.clientRect,
                appendTo: () => document.body,
                content: component.element,
                showOnCreate: true,
                interactive: true,
                trigger: 'manual',
                placement: 'bottom-start',
              });

              props.editor.chain().blur().run();
            },

            onUpdate: (props: TKeyRenderProps) => {
              // component?.updateProps(props); TODO: support autocomplete
              popup?.setProps({
                getReferenceClientRect: props.clientRect,
              });
            },

            onKeyDown: (props: { event: KeyboardEvent }) => {
              console.log(component);
              if (props.event.key === 'Escape') {
                popup?.[0].hide();
                return true;
              }
              // return (component as ReactRenderer)?.ref?.onKeyDown(props);
            },

            onExit: () => {
              popup?.[0].destroy();
              component?.destroy();
            },
          };
        },
      },
    };
  },

  addProseMirrorPlugins() {
    const pluginKey = new PluginKey('suggestionKeyHandler');

    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion,
      }),

      new Plugin({
        key: pluginKey,
        props: {
          handleKeyDown: (view, event) => {
            const { $head } = view.state.selection;
            const pos = $head.pos;

            const textBefore = view.state.doc.textBetween(
              Math.max(0, pos - 500),
              pos
            );

            const textAfter = view.state.doc.textBetween(
              pos,
              Math.min(view.state.doc.content.size, pos + 500)
            );

            const beforeMatch = textBefore.match(/{{(\w+)$/);
            const afterMatch = textAfter.match(/(\w+):\s*(\w+)}}/);

            const completeMatch = textAfter.match(/{{(\w+):\s*(\w+)}}$/);

            const isInPattern = beforeMatch && afterMatch;

            if (isInPattern) {
              if (event.key === 'Backspace') {
                if ((beforeMatch && afterMatch) || completeMatch) {
                  const startPos = completeMatch
                    ? pos - completeMatch[0].length
                    : pos - (beforeMatch?.[0].length ?? 0);

                  const endPos = completeMatch
                    ? pos
                    : pos + (afterMatch?.[0].length ?? 0);

                  // Delete the entire {{key: value}}
                  view.dispatch(view.state.tr.delete(startPos, endPos));

                  return true;
                }

                return false;
              }

              return true;
            }

            return false;
          },
        },
      }),
    ];
  },
});
