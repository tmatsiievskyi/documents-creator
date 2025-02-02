import { Ruler } from './ruler.container';
import { TCursorProps } from './components';

export type TRulerProps = {
  cursors: TCursorProps[];
  spaces: number;
};

export const WithRuler = (props: TRulerProps) => <Ruler {...props} />;
