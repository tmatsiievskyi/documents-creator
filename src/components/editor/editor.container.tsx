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
    <div className='flex flex-col mt-1 md:mt-0 w-full h-full '>
      <div className=' flex-shrink-0 overflow-x-scroll'>
        {!hideTopToolbar && (
          <div className='flex-shrink-0 bg-white p-2 relative z-10 mb-1 md:mb-2 min-h-[48px]'>
            <EditorToolbar
              editor={editor}
              disabled={toolbarTopDisabled}
              toolbarType='ui'
            />
          </div>
        )}
      </div>
      <div className='flex flex-grow flex-row-reverse h-[calc(100%-80px)]'>
        <div className='ml-1 md:ml-2 min-w-[48px] bg-white p-2 overflow-y-auto'>
          <EditorToolbar
            editor={editor}
            disabled={toolbarSideDisabled}
            toolbarType='manage'
            wrapperClassName='flex flex-col'
            sectionClassName='flex flex-col'
          />
        </div>
        <div className='overflow-scroll w-full bg-white p-2 relative pl-8'>
          <div
            ref={editorWrapperRef}
            className={cn(
              ' shadow-md border relative mt-6 mr-auto ml-auto',
              classNameEditorWrapper
            )}
          >
            <div className='w-a4 ml-auto mr-auto h-6 mb-[3px] absolute top-[-5px] left-0 translate-y-[-100%]'>
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
                wrapperClassName='w-full h-full relative'
                wrapperRulerClassName='absolute bottom-0 left-0'
              />
            </div>
            <div className='absolute top-0 left-[-5px] h-full w-6 translate-x-[-100%]'>
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
  );
};
