import { TEditorStateContext } from '@/shared/context';
import { TCursorType } from '../components';

type TEditorContextKeys = keyof Pick<
  TEditorStateContext,
  'paddingLeft' | 'paddingTop' | 'paddingBottom' | 'paddingRight'
>;

const CURSOR_TYPE_TO_PADDING_MAP = {
  cursorXLeft: 'paddingLeft',
  cursorYTop: 'paddingTop',
  cursorXRight: 'paddingRight',
  cursorYBottom: 'paddingBottom',
} satisfies Record<TCursorType, TEditorContextKeys>;

export const getPaddingFromCursorCoordinates = (
  cursorType: TCursorType,
  coordinates: { x: number; y: number },
  size: number
): { padding: TEditorContextKeys; value: number } | undefined => {
  if (cursorType === 'cursorXLeft') {
    return { padding: CURSOR_TYPE_TO_PADDING_MAP[cursorType], value: coordinates.x };
  }
  if (cursorType === 'cursorXRight') {
    return { padding: CURSOR_TYPE_TO_PADDING_MAP[cursorType], value: size - coordinates.x };
  }
  if (cursorType === 'cursorYTop') {
    return { padding: CURSOR_TYPE_TO_PADDING_MAP[cursorType], value: coordinates.y };
  }
  if (cursorType === 'cursorYBottom') {
    return { padding: CURSOR_TYPE_TO_PADDING_MAP[cursorType], value: size - coordinates.y };
  }
};
