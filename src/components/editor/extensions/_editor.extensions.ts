import StarterKit from '@tiptap/starter-kit';
import { ItalicExtension } from './italic.extension';
import { BoldExtension } from './bold.extension';
import { UnderlineExtension } from './underline.extension';
import { StrikeExtension } from './strike.extension';

export const EditorExtension = [
  StarterKit.configure({}),
  BoldExtension,
  ItalicExtension,
  UnderlineExtension,
  StrikeExtension,
];
