'use client';

import { TEditorProps } from './editor.hoc';
import { useEditor, EditorContent } from '@tiptap/react';
import { EditorExtension } from './extensions';
import { LocalEditorProps } from './utils';
import { cn } from '@/lib/utils';

export const Editor = ({ className }: TEditorProps) => {
  const editor = useEditor({
    extensions: EditorExtension,
    editorProps: LocalEditorProps,
    content: '',
    // immediatelyRender: false,
    onUpdate: ({ editor }) => {
      const json = editor.getJSON();
      const html = editor.getHTML();

      console.log(json, html);
    },
  });

  return (
    <div
      className={cn('', className)}
      // onClick={() => editor?.chain().focus().run()}
    >
      <EditorContent editor={editor} />
    </div>
  );
};
