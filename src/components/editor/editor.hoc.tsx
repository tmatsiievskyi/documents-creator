import { ZoomProvider } from '@/shared/context';
import { Editor } from './editor.container';

export type TEditorProps = {
  classNameEditorWrapper?: string;
  hideTopToolbar?: boolean;
  hideSideToolbar?: boolean;
  toolbarTopDisabled?: boolean;
  toolbarSideDisabled?: boolean;
};

export const WithEditor = ({
  classNameEditorWrapper,
  hideTopToolbar,
  toolbarTopDisabled,
  hideSideToolbar,
  toolbarSideDisabled,
}: TEditorProps) => (
  <ZoomProvider isShortcutsEnabledByDefault={true}>
    <Editor
      classNameEditorWrapper={classNameEditorWrapper}
      hideTopToolbar={hideTopToolbar}
      toolbarTopDisabled={toolbarTopDisabled}
      hideSideToolbar={hideSideToolbar}
      toolbarSideDisabled={toolbarSideDisabled}
    />
  </ZoomProvider>
);
