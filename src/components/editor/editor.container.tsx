'use client';

import { TEditorProps } from './editor.hoc';
import { useEditor, EditorContent } from '@tiptap/react';
import { EditorExtension } from './extensions';
import { LocalEditorProps } from './utils';
import { cn } from '@/lib/utils';
import { EditorToolbar } from './components';
import { WithRuler } from '../ruler';
import { WithRuler as WithRuler2 } from '../ruler2';

export const Editor = ({
  classNameEditorWrapper,
  hideToolbar,
  toolbarDisabled,
}: TEditorProps) => {
  const editor = useEditor({
    extensions: EditorExtension,
    editorProps: LocalEditorProps,
    content: '',
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      const json = editor.getJSON();
      const html = editor.getHTML();
    },
  });

  const editorSize = {
    //TODO: move to redux and create select
    height: '297mm',
    width: '210mm',
  };
  const rulerSpaces = 9.4488188976; // TODO: remove and store in store

  if (!editor) return null;

  return (
    <div className='flex-grow flex flex-col overflow-auto'>
      {!hideToolbar && (
        <div className='flex-shrink-0 bg-white p-2 rounded-md shadow-md shadow-gray-200/40 relative z-10'>
          <EditorToolbar editor={editor} disabled={toolbarDisabled} />
        </div>
      )}

      <div className={`relative flex-shrink-0 w-a4 ml-auto mr-auto`}>
        <WithRuler width={editorSize.width} />
        <WithRuler2
          cursors={[
            {
              type: 'cursorXLeft',
              initialCoordinates: { x: 0, y: 0 },
              spaces: rulerSpaces,
            },
            {
              type: 'cursorXRight',
              initialCoordinates: { x: 793.007874, y: 0 },
              spaces: rulerSpaces,
            },
          ]}
          spaces={rulerSpaces}
        />
      </div>

      <div className='flex-grow overflow-auto no-scrollbar mt-[2px]'>
        <div className='overflow-x-auto no-scrollbar pb-4'>
          <div
            className={cn(
              ' shadow-md ml-auto mr-auto border',
              classNameEditorWrapper
            )}
          >
            <EditorContent editor={editor} />
          </div>
        </div>
      </div>
    </div>
  );
};
