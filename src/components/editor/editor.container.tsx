'use client';

import { TEditorProps } from './editor.hoc';
import { useEditor, EditorContent, Editor } from '@tiptap/react';
import { EditorExtension } from './extensions';
import { LocalEditorProps } from './utils';
import { cn } from '@/lib/utils';
import { EditorToolbar } from './components';
import { WithRuler } from '../ruler2';
import { useMemo, useRef, memo, useEffect } from 'react';
import { useAppEditorState, useZoomContext } from '@/shared/context';

export const AppEditor = memo(
  ({
    classNameEditorWrapper,
    hideTopToolbar,
    toolbarTopDisabled,
    toolbarSideDisabled,
  }: TEditorProps) => {
    const editorWrapperRef = useRef(null);
    const { zoom } = useZoomContext(); // TODO: move to useAppEditorState
    const { paddingLeft, paddingTop, paddingRight, paddingBottom } = useAppEditorState();

    const editorOptions = useMemo(() => {
      return {
        extensions: EditorExtension({
          initialPaddings: { paddingLeft, paddingTop, paddingRight, paddingBottom },
        }),
        editorProps: LocalEditorProps,
        content: '',
        immediatelyRender: false,
        onUpdate: ({ editor }: { editor: Editor }) => {
          const json = editor.getJSON();
          console.log(json);
          // const _html = editor.getHTML();
        },
      };
    }, [paddingLeft, paddingTop, paddingRight, paddingBottom]);
    const editor = useEditor(editorOptions);

    useEffect(() => {
      editor?.commands.setPadding({ paddingLeft, paddingTop, paddingRight, paddingBottom });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [paddingLeft, paddingTop, paddingRight, paddingBottom]);

    const editorSize = {
      height: 1115.2,
      width: 794,
    }; // TODO: get from req;
    const rulerSpaces = 9.45; // TODO: get from req;

    if (!editor) return null;

    return (
      <div className="mt-1 flex size-full flex-col md:mt-0">
        <div className="shrink-0 overflow-scroll">
          {!hideTopToolbar && (
            <div className="relative z-10 !mb-0 min-h-[48px] shrink-0 border-b bg-white p-2 md:mb-2">
              <EditorToolbar editor={editor} disabled={toolbarTopDisabled} toolbarType="ui" />
            </div>
          )}
        </div>
        <div className="flex h-[calc(100%-80px)] grow flex-row-reverse">
          <div className="ml-1 min-w-[48px] overflow-scroll border-l p-2 md:ml-2">
            <EditorToolbar
              editor={editor}
              disabled={toolbarSideDisabled}
              toolbarType="manage"
              wrapperClassName="flex flex-col h-full"
              sectionClassName="flex flex-col"
            />
          </div>
          <div className="relative w-full overflow-scroll  p-2 pl-8">
            <div className="min-h-full min-w-fit">
              <div
                style={{
                  transform: `scale(${zoom})`,
                  transformOrigin: 'top left',
                  width: `${editorSize.width}px`,
                  minHeight: `${editorSize.height}px`,
                }}
                className="mx-auto"
              >
                <div
                  ref={editorWrapperRef}
                  className={cn('shadow-md border relative mt-6 ', classNameEditorWrapper)}
                >
                  {/* x-ruler */}
                  <div className="absolute left-0 top-[-5px] mx-auto mb-[3px] h-6 w-a4 -translate-y-full">
                    <WithRuler
                      cursors={[
                        {
                          cursorType: 'cursorXLeft',
                          coordinates: { x: 0, y: 0 },
                          spaces: rulerSpaces,
                        },
                        {
                          cursorType: 'cursorXRight',
                          coordinates: { x: editorSize.width, y: 0 },
                          spaces: rulerSpaces,
                        },
                      ]}
                      spaces={rulerSpaces}
                      size={editorSize.width}
                      orientation="landscape"
                      wrapperClassName="w-full h-full relative"
                      wrapperRulerClassName="absolute bottom-0 left-0"
                    />
                  </div>
                  {/* y-ruler */}
                  <div className="absolute left-[-5px] top-0 h-full w-6 -translate-x-full">
                    <WithRuler
                      cursors={[
                        {
                          cursorType: 'cursorYTop',
                          coordinates: { x: 0, y: 0 },
                          spaces: rulerSpaces,
                        },
                        {
                          cursorType: 'cursorYBottom',
                          coordinates: { x: 0, y: editorSize.height },
                          spaces: rulerSpaces,
                        },
                      ]}
                      orientation="portrait"
                      spaces={rulerSpaces}
                      size={editorSize.height}
                      wrapperClassName="w-full h-full relative"
                    />
                  </div>

                  <EditorContent editor={editor} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

AppEditor.displayName = 'AppEditor';
