import StarterKit from '@tiptap/starter-kit';
import { ItalicExtension } from './italic.extension';
import { BoldExtension } from './bold.extension';
import { UnderlineExtension } from './underline.extension';
import { StrikeExtension } from './strike.extension';
import { FontSizeExtension } from './fontSize.extension';
import { BaseKitExtension } from './base.extension';
import { TextAlignExtension } from './textAlign.extension';
import { IndentExtension } from './indent.extension';
import { SuggestionCommand } from './suggestion.extension';

export const EditorExtension = [
  StarterKit.configure({}),
  BaseKitExtension.configure({}),
  BoldExtension,
  ItalicExtension,
  UnderlineExtension,
  StrikeExtension,
  FontSizeExtension,
  TextAlignExtension,
  IndentExtension,
  SuggestionCommand,
];
