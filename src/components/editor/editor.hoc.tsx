import { Editor } from './editor.container';

export type TEditorProps = {
  className?: string;
};

export const WithEditor = ({ className }: TEditorProps) => (
  <Editor className={className} />
);
