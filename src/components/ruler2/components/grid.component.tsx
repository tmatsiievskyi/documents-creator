import { DataUtil, EDimmesionUnits } from '@/utils';
import { useCallback, useMemo } from 'react';
import { TRulerGridProps } from './grid.hoc';

export const RulerGrid = ({ width, spaces }: TRulerGridProps) => {
  const gridItems = useMemo(
    () =>
      DataUtil.generateArrayOfNumbers(0, width, spaces).map((item) => ({
        px: item,
        cm: DataUtil.roundToTwoDecimals(
          DataUtil.convertDimensionToDifUnits(
            item,
            EDimmesionUnits.px,
            EDimmesionUnits.cm
          )
        ),
      })),
    [width, spaces]
  );

  const getItemStyle = useCallback((value: { cm: number; px: number }) => {
    switch (true) {
      case value.cm % 1 === 0:
        return (
          <span className='relative w-full h-full'>
            <span
              style={{
                position: 'absolute',
                left: '0',
                bottom: '0',
                width: '1px',
                height: '5px',
                backgroundColor: 'red',
              }}
            ></span>
            <span
              style={{
                left: `${value.cm >= 10 ? '-5px' : '-3px'}`,
                top: '-22px',
                position: 'absolute',
              }}
            >
              {value.cm}
            </span>
          </span>
        );
      case value.cm % 0.5 === 0:
        return (
          <span className='relative w-full h-full'>
            <span
              style={{
                position: 'absolute',
                left: '0',
                bottom: '0',
                width: '1px',
                height: '8px',
                backgroundColor: 'black',
              }}
            ></span>
          </span>
        );

      case value.cm % 0.25 === 0:
        return (
          <span className='relative w-full h-full'>
            <span
              style={{
                position: 'absolute',
                left: '0',
                bottom: '0',
                width: '1px',
                height: '3px',
                backgroundColor: 'black',
              }}
            ></span>
          </span>
        );

      default:
        return null;
    }
  }, []);

  // console.log(gridItems);

  return (
    <div className='w-full relative h-2'>
      {gridItems.map((item) => {
        console.log(item);
        return (
          <span
            key={item.px}
            className={`text-[10px] absolute bottom-0`}
            style={{ left: `${item.px}px` }}
          >
            {getItemStyle(item)}
          </span>
        );
      })}
    </div>
  );
};
