import StarterKit from '@tiptap/starter-kit';
import { ItalicExtension } from './italic.extension';
import { BoldExtension } from './bold.extension';
import { UnderlineExtension } from './underline.extension';
import { StrikeExtension } from './strike.extension';
import { FontSizeExtension } from './fontSize.extension';
import { BaseKitExtension } from './base.extension';
import { TextAlignExtension } from './textAlign.extension';
import { IndentExtension } from './indent.extension';
import { SuggestionKey } from './suggestions/suggestionKey.extension';
import { suggestionValue } from './suggestions';
import { ExportPdfExtension } from './exportPdf';
import { ExportEmailExtension } from './exportEmail.extension';
import { ExportMessengersExtension } from './exportMessengers.extension';
import { HistoryExtension } from './history.extension';
import { SaveExtension } from './save.extension';
import { DeleteExtension } from './delete.extension';
import { FullScreenExtension } from './fullScreen.extension';

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
  SuggestionKey,
  suggestionValue,
  HistoryExtension,
  FullScreenExtension,
  SaveExtension,
  DeleteExtension,
  ExportPdfExtension,
  ExportEmailExtension,
  ExportMessengersExtension,
];
