import { Editor, Extension, Range } from '@tiptap/core';
import { ReactRenderer } from '@tiptap/react';
import Suggestion from '@tiptap/suggestion';
import { SuggestionList } from '../components';
import tippy from 'tippy.js';

export type TSuggestionItem = {
  suggestion: string;
  values: string[];
  description: string;
};

type TCommandProps = {
  editor: Editor;
  range: Range;
  props: {
    item: TSuggestionItem;
    type: 'key' | 'value';
    currentKey: string;
  };
};

export const CommandForSuggestion = Extension.create({
  name: 'suggestion',
  addOptions() {
    return {
      suggestion: {
        char: '++',
        command: ({ editor, range, props }: TCommandProps) => {
          console.log(this);

          const { type, item, currentKey } = props;

          //deletes char: "++"
          editor.chain().focus().deleteRange(range).run();

          console.log(type);

          // if (type === 'key') { //TODO: add this check
          editor.chain().insertContent(`@${item.suggestion}: `).run();
          // }

          // this.options.suggestion.updateState?.({
          //   type: 'value',
          //   currentKey: item.suggestion,
          //   items:
          //     this.options.suggestion
          //       .items()
          //       .find((i) => i.suggestion === item.suggestion)?.values || [],
          // });
        },
      },
    };
  },
  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion,
      }),
    ];
  },
});

const renderItems = () => {
  let component: ReactRenderer | null = null;
  let popup: any | null = null;

  return {
    onStart: (props: {
      editor: Editor;
      clientRect: DOMRect;
      items: TSuggestionItem[];
    }) => {
      component = new ReactRenderer(SuggestionList, {
        props,
        editor: props.editor,
      });

      console.log('start');

      // @ts-expect-error desc
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
    onUpdate: (props: { editor: Editor; clientRect: DOMRect }) => {
      component?.updateProps(props);

      console.log('update');

      return (
        popup &&
        popup[0].setProps({
          getReferenceClientRect: props.clientRect,
        })
      );
    },

    onKeyDown: (props: { event: KeyboardEvent }) => {
      if (props.event.key === 'Escape') {
        popup?.[0].hide();

        return true;
      }

      console.log('key down');

      // @ts-expect-error desc
      return component?.ref?.onKeyDown(props);
    },
    onExit: () => {
      popup?.[0].destroy();
      component?.destroy();
    },
  };
};

export const getSuggestionItems = () => {
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

export const SuggestionCommand = CommandForSuggestion.configure({
  suggestion: {
    items: getSuggestionItems,
    render: renderItems,
  },
});
