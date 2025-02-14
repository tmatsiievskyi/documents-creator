import { Editor, ReactRenderer } from '@tiptap/react';
import { ComponentType } from 'react';
import tippy from 'tippy.js';

type TProps = {
  suggestionList?: ComponentType;
  renderProps: any; //TODO: change
  editor: Editor;
};

export const renderSuggestionItems = (
  //     {
  //   suggestionList,
  //   renderProps,
  //   editor,
  // }: TProps
  props: any
) => {
  let component: ReactRenderer | null = null;
  let popup: any | null = null;

  console.log(props);

  if (!props) return {}; //TODO: change

  return {
    onStart: () => {
      console.log('renderer onStart');

      component = new ReactRenderer(props.suggestionList, {
        props: props.renderProps,
        editor: props.editor,
      });
      popup = tippy('body', {
        getReferenceClientRect: props.renderProps.clientRect,
        appendTo: () => document.body,
        content: component.element,
        showOnCreate: true,
        interactive: true,
        trigger: 'manual',
        placement: 'bottom-start',
      });
    },
    onUpdate: (props: { editor: Editor; clientRect: DOMRect }) => {
      console.log('renderer onUpdate');

      return (
        popup &&
        popup[0].setProps({
          getReferenceClientRect: props.clientRect,
        })
      );
    },
    onKeyDown: (props: { event: KeyboardEvent }) => {
      console.log('renderer onKeyDown');

      if (props.event.key === 'Escape') {
        popup?.[0].hide();

        return true;
      }
      // @ts-expect-error desc
      return component?.ref?.onKeyDown(props);
    },
    onExit: () => {
      console.log('renderer onExit');

      popup?.[0].destroy();
      component?.destroy();
    },
  };
};
