import { Editor } from './editor.container';

export type TEditorProps = {
  classNameEditorWrapper?: string;
  hideToolbar?: boolean;
  toolbarDisabled?: boolean;
};

export const WithEditor = ({
  classNameEditorWrapper,
  hideToolbar,
  toolbarDisabled,
}: TEditorProps) => (
  <Editor
    classNameEditorWrapper={classNameEditorWrapper}
    hideToolbar={hideToolbar}
    toolbarDisabled={toolbarDisabled}
  />
);
