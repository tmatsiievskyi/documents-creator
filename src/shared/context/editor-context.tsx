'use client';
import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react';

export type TEditorStateContext = {
  paddingLeft: number;
  paddingTop: number;
  paddingRight: number;
  paddingBottom: number;
};

export type TEditorProviderProps = {
  children: ReactNode;
  initialEditorState: TEditorStateContext;
};

export type TPaddingItems = Pick<
  TEditorStateContext,
  'paddingTop' | 'paddingBottom' | 'paddingLeft' | 'paddingRight'
>;

export type TEditorActions = {
  changePadding: (padding?: keyof TPaddingItems, value?: number) => void;
};

const EditorStateContext = createContext<TEditorStateContext | null>(null);
const EditorActionsContext = createContext<TEditorActions | null>(null);

export const AppEditorProvider = ({ children, initialEditorState }: TEditorProviderProps) => {
  const [state, setState] = useState<TEditorStateContext>(initialEditorState);

  const changePadding = useCallback((padding?: keyof TPaddingItems, value?: number) => {
    if (!padding) return;

    setState(prev => ({
      ...prev,
      [padding]: value,
    }));
  }, []);

  return (
    <EditorStateContext.Provider value={state}>
      <EditorActionsContext.Provider value={{ changePadding }}>
        {children}
      </EditorActionsContext.Provider>
    </EditorStateContext.Provider>
  );
};

export const useAppEditorState = () => {
  const editorState = useContext(EditorStateContext);
  if (editorState === null) {
    throw new Error('AppEditorProvider is missing');
  }
  return editorState;
};

export const useAppEditorActions = () => {
  const editorActionsFromCont = useContext(EditorActionsContext);
  if (editorActionsFromCont === null) {
    throw new Error('AppEditorProvider is missing');
  }
  const memoizedEditorActions = useMemo(() => editorActionsFromCont, [editorActionsFromCont]);

  return memoizedEditorActions;
};
