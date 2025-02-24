import { AppEditorProvider, TEditorStateContext, ZoomProvider } from '@/shared/context';
import { AppEditor } from './editor.container';

export type TEditorProps = {
  classNameEditorWrapper?: string;
  hideTopToolbar?: boolean;
  hideSideToolbar?: boolean;
  toolbarTopDisabled?: boolean;
  toolbarSideDisabled?: boolean;
};

const initialEditorState: TEditorStateContext = {
  paddingLeft: 0,
  paddingTop: 0,
  paddingRight: 0,
  paddingBottom: 0,
}; // TODO: get from request or props

export const WithEditor = ({
  classNameEditorWrapper,
  hideTopToolbar,
  toolbarTopDisabled,
  hideSideToolbar,
  toolbarSideDisabled,
}: TEditorProps) => (
  // TODO: move properties from ZoomProvider to AppEditorProvider
  <AppEditorProvider initialEditorState={initialEditorState}>
    <ZoomProvider isShortcutsEnabledByDefault={true}>
      <AppEditor
        classNameEditorWrapper={classNameEditorWrapper}
        hideTopToolbar={hideTopToolbar}
        toolbarTopDisabled={toolbarTopDisabled}
        hideSideToolbar={hideSideToolbar}
        toolbarSideDisabled={toolbarSideDisabled}
      />
    </ZoomProvider>
  </AppEditorProvider>
);
