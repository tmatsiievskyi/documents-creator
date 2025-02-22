import { Extension } from '@tiptap/core';
import { TSuggestionItemProps, TSuggestionKeyEvent, TSuggestionValueOptions } from './_types';
import { getSuggestionItems } from './suggestion.data';
import { ReactRenderer } from '@tiptap/react';
import { SuggestionList } from './suggestionList';
import tippy, { Instance } from 'tippy.js';
import { Plugin, PluginKey } from 'prosemirror-state';

export const suggestionValue = Extension.create<TSuggestionValueOptions>({
  name: 'suggestionValue',

  addOptions() {
    return {
      getItems: (key: string) => {
        const suggestionItem = getSuggestionItems().find(item => item.suggestion === key);

        return suggestionItem?.values.map(value => ({
          title: value,
          icon: suggestionItem.icon,
        }));
      },
    };
  },

  onBeforeCreate() {
    this.editor.on('keySelected', (event: TSuggestionKeyEvent) => {
      const items = this.options.getItems(event.key);
      let popup: Instance | null = null;

      const component = new ReactRenderer(SuggestionList, {
        editor: this.editor,
        props: {
          items,
          command: ({ item }: { item: TSuggestionItemProps }) => {
            this.editor
              .chain()
              .focus()
              .insertContentAt(event.range.to, `: ${item.title}}}`) // TODO: event.range
              .run();

            popup?.destroy();
            component.destroy();
          },
          title: `Select ${event.key} value`,
        },
      });

      const coords = this.editor.view.coordsAtPos(event.range.to);

      const referenceElement = document.createElement('div');
      referenceElement.style.position = 'absolute';
      referenceElement.style.left = `${coords.left}px`;
      referenceElement.style.top = `${coords.top}px`;
      document.body.appendChild(referenceElement);

      popup = tippy(referenceElement, {
        appendTo: () => document.body,
        content: component.element,
        showOnCreate: true,
        interactive: true,
        trigger: 'manual',
        placement: 'bottom-start',
        onHide: () => {
          component.destroy();
          referenceElement.remove(); // Clean up the element when hiding
        },
      });

      this.editor.on('destroy', () => {
        popup?.destroy();
        component.destroy();
      });
    });
  },

  addProseMirrorPlugins() {
    let popup: Instance | null = null;
    let component: ReactRenderer | null = null;
    let referenceElement: HTMLDivElement | null = null;

    const pluginKey = new PluginKey('suggestionValueHandler');

    return [
      new Plugin({
        key: pluginKey,
        props: {
          handleClick: (view, pos, _event) => {
            // get text arround click
            // const $pos = view.state.doc.resolve(pos);
            const textBefore = view.state.doc.textBetween(Math.max(0, pos - 500), pos);
            const textAfter = view.state.doc.textBetween(
              pos,
              Math.min(view.state.doc.content.size, pos + 500)
            );

            const matchBefore = textBefore.match(/{{(\w+):\s*(\w+)$/);
            const matchAfter = textAfter.match(/^(\w+)}}/);

            if (!matchBefore || !matchAfter) return false;

            const [fullMatch, key, currentValue] = matchBefore;
            const startPos = pos - fullMatch.length;

            // eslint-disable-next-line no-unused-vars
            const [_, keyAfter] = matchAfter;

            const suggestionOption = getSuggestionItems().find(item => item.suggestion === key);

            if (!suggestionOption) return false;

            if (popup) {
              popup?.destroy();
              component?.destroy();
              referenceElement?.remove();
            }

            component = new ReactRenderer(SuggestionList, {
              editor: this.editor,
              props: {
                items: suggestionOption.values.map(val => ({
                  title: val,
                  // icon: suggestionOption.icon,
                })),
                command: ({ item }: { item: TSuggestionItemProps }) => {
                  // calc position
                  const valueStartPos = startPos + key.length + 4; // +4 for ': ' and '{{'
                  const valueEndPos = valueStartPos + currentValue.length + keyAfter.length;

                  view.dispatch(
                    view.state.tr.replaceWith(
                      valueStartPos,
                      valueEndPos,
                      view.state.schema.text(item.title)
                    )
                  );

                  popup?.destroy();
                  component?.destroy();
                  referenceElement?.remove();
                },
              },
            });

            const coords = view.coordsAtPos(startPos);

            referenceElement = document.createElement('div');
            referenceElement.style.position = 'absolute';
            referenceElement.style.left = `${coords.left}px`;
            referenceElement.style.top = `${coords.top + 10}px`;
            referenceElement.style.transform = 'translateX(100%)';
            document.body.appendChild(referenceElement);

            popup = tippy(referenceElement, {
              appendTo: () => document.body,
              content: component.element,
              showOnCreate: true,
              interactive: true,
              trigger: 'manual',
              placement: 'bottom-start',
              onHide: () => {
                component?.destroy();
                referenceElement?.remove();
              },
            });

            return true;
          },
          handleKeyDown: (view, event) => {
            const { $head } = view.state.selection;
            const pos = $head.pos;

            const textBefore = view.state.doc.textBetween(Math.max(0, pos - 500), pos);

            const textAfter = view.state.doc.textBetween(
              pos,
              Math.min(view.state.doc.content.size, pos + 500)
            );

            // if (event.key !== 'Backspace') return false;

            const beforeMatch = textBefore.match(/{{(\w+):\s*(\w+)$/);
            const afterMatch = textAfter.match(/^(\w+)}}/);
            const completeMatch = textBefore.match(/{{(\w+):\s*(\w+)}}$/);

            const isInPattern = beforeMatch && afterMatch;

            if (isInPattern) {
              if (event.key === 'Backspace') {
                if ((beforeMatch && afterMatch) || completeMatch) {
                  const startPos = completeMatch
                    ? pos - completeMatch[0].length
                    : pos - (beforeMatch?.[0].length ?? 0);

                  const endPos = completeMatch ? pos : pos + (afterMatch?.[0].length ?? 0);

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
