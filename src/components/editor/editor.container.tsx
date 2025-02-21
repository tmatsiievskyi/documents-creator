'use client';

import { TEditorProps } from './editor.hoc';
import { useEditor, EditorContent } from '@tiptap/react';
import { EditorExtension } from './extensions';
import { LocalEditorProps } from './utils';
import { cn } from '@/lib/utils';
import { EditorToolbar } from './components';
import { WithRuler } from '../ruler2';
import { useRef } from 'react';

export const Editor = ({
  classNameEditorWrapper,
  hideTopToolbar,
  // hideSideToolbar,
  toolbarTopDisabled,
  toolbarSideDisabled,
}: TEditorProps) => {
  const editorWrapperRef = useRef(null);
  const editor = useEditor({
    extensions: EditorExtension,
    editorProps: LocalEditorProps,
    content: '', // TODO: remove text
    immediatelyRender: false,
    onUpdate: ({ editor: _editor }) => {
      // const _json = editor.getJSON();
      // const _html = editor.getHTML();
    },
  });

  const editorSize = {
    // TODO: move to redux and create select
    height: 1115.2,
    width: 794,
  };
  const rulerSpaces = 9.45; // TODO: remove and store in store

  if (!editor) return null;

  return (
    <div className="mt-1 flex size-full flex-col md:mt-0 ">
      <div className=" shrink-0 overflow-x-scroll">
        {!hideTopToolbar && (
          <div className="relative z-10 mb-1 min-h-[48px] shrink-0 bg-white p-2 md:mb-2">
            <EditorToolbar editor={editor} disabled={toolbarTopDisabled} toolbarType="ui" />
          </div>
        )}
      </div>
      <div className="flex h-[calc(100%-80px)] grow flex-row-reverse">
        <div className="ml-1 min-w-[48px] overflow-y-auto bg-white p-2 md:ml-2">
          <EditorToolbar
            editor={editor}
            disabled={toolbarSideDisabled}
            toolbarType="manage"
            wrapperClassName="flex flex-col"
            sectionClassName="flex flex-col"
          />
        </div>
        <div className="relative w-full overflow-scroll bg-white p-2 pl-8">
          <div
            ref={editorWrapperRef}
            className={cn(
              ' shadow-md border relative mt-6 mr-auto ml-auto',
              classNameEditorWrapper
            )}
          >
            <div className="w-a4 absolute left-0 top-[-5px] mx-auto mb-[3px] h-6 -translate-y-full">
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
  );
};
