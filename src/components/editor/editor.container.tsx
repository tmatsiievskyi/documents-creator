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
  hideSideToolbar,
  toolbarTopDisabled,
  toolbarSideDisabled,
}: TEditorProps) => {
  const editorWrapperRef = useRef(null);
  const editor = useEditor({
    extensions: EditorExtension,
    editorProps: LocalEditorProps,
    content: '', //TODO: remove text
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      const json = editor.getJSON();
      const html = editor.getHTML();
    },
  });

  const editorSize = {
    //TODO: move to redux and create select
    height: 1115.2,
    width: 794,
  };
  const rulerSpaces = 9.45; // TODO: remove and store in store

  if (!editor) return null;

  return (
    <div className='flex-grow flex flex-col overflow-hidden h-full'>
      {!hideTopToolbar && (
        <div className='flex-shrink-0 bg-white p-2 relative z-10 mb-2 min-h-[48px]'>
          <EditorToolbar
            editor={editor}
            disabled={toolbarTopDisabled}
            toolbarType='ui'
          />
        </div>
      )}
      <div className=' h-full flex overflow-auto'>
        <div className='flex-grow w-full h-full bg-white overflow-auto'>
          <div className={`relative flex-shrink-0 w-full bg-white`}>
            <div className='w-a4 ml-auto mr-auto'>
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
                orientation='landscape'
                wrapperClassName='w-full h-full relative mb-8'
                wrapperRulerClassName='absolute bottom-0 left-0'
              />
            </div>
          </div>
          <div className='flex-grow overflow-auto no-scrollbar bg-white'>
            <div className='overflow-x-auto flex no-scrollbar pb-4 pt-2'>
              <div
                ref={editorWrapperRef}
                className={cn(
                  ' shadow-md ml-auto mr-auto border relative',
                  classNameEditorWrapper
                )}
              >
                <div className='absolute top-0 left-[-10px] h-full w-6 translate-x-[calc(-100%)]'>
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
                    orientation='portrait'
                    spaces={rulerSpaces}
                    size={editorSize.height}
                    wrapperClassName='w-full h-full relative'
                  />
                </div>
                <EditorContent editor={editor} />
              </div>
            </div>
          </div>
        </div>
        <div className='ml-2 min-w-[48px] bg-white p-2'>
          <EditorToolbar
            editor={editor}
            disabled={toolbarSideDisabled}
            toolbarType='manage'
            wrapperClassName='flex flex-col'
            sectionClassName='flex flex-col'
          />
        </div>
      </div>
    </div>
  );
};
