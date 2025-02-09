import { Ruler } from './ruler.container';
import { TCursorProps } from './components';

export type TRulerProps = {
  cursors: TCursorProps[];
  spaces: number;
  wrapperClassName?: string;
  wrapperRulerClassName?: string;
  size: number;
  orientation: 'landscape' | 'portrait';
};

export const WithRuler = (props: TRulerProps) => <Ruler {...props} />;
