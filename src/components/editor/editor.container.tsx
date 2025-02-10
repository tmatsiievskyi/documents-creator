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
  hideToolbar,
  toolbarDisabled,
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
    <div className='flex-grow flex flex-col overflow-hidden'>
      {!hideToolbar && (
        <div className='flex-shrink-0 bg-white p-2 rounded-md shadow-md shadow-gray-200/40 relative z-10'>
          <EditorToolbar editor={editor} disabled={toolbarDisabled} />
        </div>
      )}
      <div></div>
      {/* <div className='w-2 h-10 bg-red-500'></div> */}

      <div className={`relative flex-shrink-0 w-a4 ml-auto mr-auto`}>
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

      <div className='flex-grow overflow-auto no-scrollbar'>
        <div className='overflow-x-auto no-scrollbar pb-4 pt-2'>
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
  );
};
