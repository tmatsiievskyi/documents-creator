import { Editor } from '@tiptap/core';

declare module '@tiptap/core' {
  interface EditorEvents {
    keySelected: TSuggestionKeyEvent;
  }
}

export type TSuggestionItem = {
  suggestion: string;
  values: string[];
  icon?: string;
  description?: string;
  validate?: (value: string) => true | string;
  format?: (value: string) => string;
};

export type TSuggestionItemProps = {
  title: string;
  icon?: string;
  description?: string;
};

export interface TSuggestionListProps {
  items: TSuggestionItemProps[];
  command: (props: { item: TSuggestionItemProps }) => void;
  title: string;
}

export type TSuggestionKeyEvent = {
  key: string;
  range: TEditorRange;
};

export type TEditorRange = {
  from: number;
  to: number;
};

export type TCommandProps = {
  editor: Editor;
  range: TEditorRange;
  props: {
    item: TSuggestionItemProps;
  };
};

export type TKeyRenderProps = {
  editor: Editor;
  clientRect: () => DOMRect;
  items: TSuggestionItemProps[];
  command: (props: { item: TSuggestionItemProps }) => void;
};

export type TValueRenderProps = {
  editor: Editor;
  range: TEditorRange;
  items: TSuggestionItem[];
  key: string;
};

export type TKeyRenderFunction = {
  onStart: (props: TKeyRenderProps) => void;
  onUpdate: (props: TKeyRenderProps) => void;
  onKeyDown: (props: { event: KeyboardEvent }) => boolean;
  onExit: () => void;
};

export type TSuggestionKeyOptions = {
  suggestion: {
    char: string;
    command: (props: TCommandProps) => void;
    items: (props: { query: string }) => TSuggestionItemProps[];
    render: () => TKeyRenderFunction;
  };
};

export type TSuggestionValueOptions = {
  onKeySelected?: (event: TSuggestionKeyEvent) => void;
  getItems: (key: string) => TSuggestionItemProps[] | undefined;
  // render: (props: TValueRenderProps) => void;
};
