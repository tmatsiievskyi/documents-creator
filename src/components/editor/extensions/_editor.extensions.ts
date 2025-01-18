import StarterKit from '@tiptap/starter-kit';
import { ItalicExtension } from './italic.extension';

export const EditorExtension = [StarterKit.configure({}), ItalicExtension];
