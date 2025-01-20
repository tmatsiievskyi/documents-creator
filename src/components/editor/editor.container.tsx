'use client';

import { TEditorProps } from './editor.hoc';
import { useEditor, EditorContent } from '@tiptap/react';
import { EditorExtension } from './extensions';
import { LocalEditorProps } from './utils';
import { cn } from '@/lib/utils';
import { EditorToolbar } from './components';

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

      console.log(json, html);
    },
  });

  if (!editor) return null;

  return (
    <div
      // onClick={() => editor?.chain().focus().run()}
      className='flex-grow flex flex-col overflow-auto'
    >
      {!hideToolbar && (
        <div className='flex-shrink-0 bg-white p-2 rounded-md shadow-md shadow-gray-200/40 relative z-10'>
          <EditorToolbar editor={editor} disabled={toolbarDisabled} />
        </div>
      )}

      <div className='flex-grow overflow-auto no-scrollbar mt-2'>
        <div className='overflow-x-auto no-scrollbar pb-4'>
          <div
            className={cn(' shadow-lg ml-auto mr-auto', classNameEditorWrapper)}
          >
            <EditorContent editor={editor} />
          </div>
        </div>
      </div>
    </div>
  );
};
