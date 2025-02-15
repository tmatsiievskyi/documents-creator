import { Editor, Extension } from '@tiptap/core';
import { ReactRenderer } from '@tiptap/react';
import Suggestion from '@tiptap/suggestion';
import tippy from 'tippy.js';
import { SuggestionList } from '../components';

interface SuggestionItem {
  suggestion: string;
  values: string[];
  icon?: string;
  description?: string;
}

type SuggestionState = {
  type: 'key' | 'value';
  currentKey?: string;
  items: any[];
};

export const getSuggestionItems = (): SuggestionItem[] => {
  return [
    {
      suggestion: 'language',
      values: ['javascript', 'typescript', 'python'],
      icon: '🌐',
      description: 'Select programming language',
    },
    {
      suggestion: 'country',
      values: ['Ukraine', 'Poland', 'France'],
      icon: '🌍',
      description: 'Select country',
    },
  ];
};

export const CommandForSuggestion = Extension.create({
  name: 'suggestion',

  addOptions() {
    return {
      char: '++',
      startOfLine: false,
    };
  },

  addProseMirrorPlugins() {
    const state: SuggestionState = {
      type: 'key',
      currentKey: undefined,
      items: getSuggestionItems().map((item) => ({
        title: item.suggestion,
        icon: item.icon,
        description: item.description,
      })),
    };

    return [
      Suggestion({
        editor: this.editor,
        char: this.options.char,
        startOfLine: this.options.startOfLine,

        items: ({ query }) => {
          if (state.type === 'key') {
            return state.items.filter((item) =>
              item.title.toLowerCase().includes(query.toLowerCase())
            );
          }

          if (state.currentKey) {
            const parentItem = getSuggestionItems().find(
              (item) => item.suggestion === state.currentKey
            );
            return (
              parentItem?.values.map((value) => ({
                title: value,
                icon: parentItem.icon,
              })) || []
            );
          }

          return [];
        },

        command: ({ editor, range, props }) => {
          console.log('Command executing with:', { props, state });

          if (state.type === 'key') {
            const selectedKey = props.item.title;
            editor
              .chain()
              .focus()
              .deleteRange(range)
              .insertContent(`${selectedKey}: `)
              .run();

            const parentItem = getSuggestionItems().find(
              (item) => item.suggestion === selectedKey
            );

            console.log('Parent Item:', parentItem);

            if (parentItem) {
              state.type = 'value';
              state.currentKey = selectedKey;
              state.items = parentItem.values.map((value) => ({
                title: value,
                icon: parentItem.icon,
              }));
            }
          } else {
            const selectedValue = props.item.title;
            editor
              .chain()
              .focus()
              .deleteRange(range)
              .insertContent(selectedValue)
              .run();

            state.type = 'key';
            state.currentKey = undefined;
            state.items = getSuggestionItems().map((item) => ({
              title: item.suggestion,
              icon: item.icon,
              description: item.description,
            }));
          }
        },

        render: () => {
          let component: ReactRenderer | null = null;
          let popup: any | null = null;

          return {
            onStart: (props) => {
              component = new ReactRenderer(SuggestionList, {
                props: {
                  ...props,
                  suggestionState: state,
                },
                editor: props.editor,
              });

              console.log('onStart');

              popup = tippy('body', {
                getReferenceClientRect: props.clientRect,
                appendTo: () => document.body,
                content: component.element,
                showOnCreate: true,
                interactive: true,
                trigger: 'manual',
                placement: 'bottom-start',
              });
            },

            onUpdate: (props) => {
              component?.updateProps({
                ...props,
                suggestionState: state,
              });
              console.log('onUpdate');

              popup?.[0].setProps({
                getReferenceClientRect: props.clientRect,
              });
            },

            onKeyDown: (props) => {
              if (props.event.key === 'Escape') {
                popup?.[0].hide();
                return true;
              }

              console.log('onKeyDown');

              return component?.ref?.onKeyDown(props);
            },

            onBeforeUpdate: () => {
              console.log('onBeforeUpdate');
            },

            onExit: () => {
              popup?.[0].destroy();
              component?.destroy();
            },
          };
        },
      }),
    ];
  },
});

export const SuggestionCommand = CommandForSuggestion;
