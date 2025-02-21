import { DataUtil, EDimmesionUnits } from '@/utils';
import { useCallback, useMemo } from 'react';
import { TRulerGridProps } from './grid.hoc';
import { cn } from '@/lib/utils';

export const RulerGrid = ({
  size,
  spaces,
  orientation,
  wrapperRulerClassName,
}: TRulerGridProps) => {
  const wrapperStyle = orientation === 'landscape' ? 'w-[1px] h-[10px]' : 'w-[10px] h-[1px]';
  const itemStyle = orientation === 'landscape' ? 'translate-x-[-50%]' : 'translate-y-[-50%]';

  const gridItems = useMemo(
    () =>
      DataUtil.generateArrayOfNumbers(0, size, spaces).map(item => ({
        px: item,
        cm: DataUtil.roundToTwoDecimals(
          DataUtil.convertDimensionToDifUnits(item, EDimmesionUnits.px, EDimmesionUnits.cm)
        ),
      })),
    [size, spaces]
  );

  const getItemStyle = useCallback(
    (value: { cm: number; px: number }) => {
      switch (true) {
        case value.cm % 1 === 0:
          return (
            <>
              <span
                style={{
                  position: 'absolute',
                  right: '0',
                  bottom: '0',
                  width: `${orientation === 'landscape' ? '1px' : '5px'} `,
                  height: `${orientation === 'landscape' ? '5px' : '1px'}`,
                }}
                className={`${itemStyle} bg-gray-600`}
              ></span>
              <span
                style={{
                  right: `${
                    value.cm >= 10 && orientation === 'landscape'
                      ? '-5px'
                      : orientation === 'landscape'
                        ? '-3px'
                        : value.cm >= 10 && orientation === 'portrait'
                          ? '12px'
                          : '12px'
                  }`,
                  bottom: `${orientation === 'landscape' ? '9px' : '-7px'}`,
                  position: 'absolute',
                }}
                className={'text-gray-600'}
              >
                {value.cm}
              </span>
            </>
          );
        case value.cm % 0.5 === 0:
          return (
            <span
              style={{
                position: 'absolute',
                right: '0',
                bottom: '0',
                width: `${orientation === 'landscape' ? '1px' : '8px'} `,
                height: `${orientation === 'landscape' ? '8px' : '1px'}`,
              }}
              className={`${itemStyle} bg-gray-400`}
            ></span>
          );

        case value.cm % 0.25 === 0:
          return (
            <span
              style={{
                position: 'absolute',
                right: '0',
                bottom: '0',
                width: `${orientation === 'landscape' ? '1px' : '3px'} `,
                height: `${orientation === 'landscape' ? '3px' : '1px'}`,
              }}
              className={`${itemStyle} bg-gray-400`}
            ></span>
          );

        default:
          return null;
      }
    },
    [orientation, itemStyle]
  );

  return (
    <div className={cn('w-full relative', wrapperRulerClassName)}>
      {gridItems.map(item => {
        return (
          <span
            key={item.px}
            className={`absolute bottom-0 text-xs ${wrapperStyle} right-0`}
            style={{
              left: `${orientation === 'landscape' ? `${item.px}px` : null}`,
              top: `${orientation === 'portrait' ? `${item.px}px` : null}`,
              right: `${orientation === 'portrait' ? `0px` : null}`,
            }}
          >
            {getItemStyle(item)}
          </span>
        );
      })}
    </div>
  );
};
