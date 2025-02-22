import { useCallback, useState } from 'react';

type TZoomProps = {
  minZoom?: number;
  maxZoom?: number;
  step?: number;
  initialZoom?: number;
};

export const useZoom = ({
  minZoom = 0.5,
  maxZoom = 2,
  step = 0.1,
  initialZoom = 1,
}: TZoomProps) => {
  const [zoom, setZoom] = useState(initialZoom);

  const zoomIn = useCallback(() => {
    setZoom(curZoom => Math.min(+(curZoom + step).toFixed(2), maxZoom));
  }, [maxZoom, step]);

  const zoomOut = useCallback(() => {
    setZoom(curZoom => Math.max(+(curZoom - step).toFixed(2), minZoom));
  }, [minZoom, step]);

  const resetZoom = useCallback(() => {
    setZoom(initialZoom);
  }, [initialZoom]);

  return {
    zoom,
    zoomIn,
    zoomOut,
    resetZoom,
    initialZoom,
  };
};
