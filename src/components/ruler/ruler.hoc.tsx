import { Ruler } from './ruler.container';

export type TProps = {
  width: string;
};

export const WithRuler = ({ width }: TProps) => <Ruler width={width} />;
