import { ActionButton } from '@/components/buttons';
import { useZoomContext } from '@/shared/context';

export const ZoomControls = () => {
  const { zoom, zoomIn, zoomOut, resetZoom } = useZoomContext();

  return (
    <span className="flex flex-col items-center justify-center">
      <ActionButton
        customClass="my-1"
        icon="ZoomIn"
        tooltip="zoom-in"
        tooltipSide="left"
        action={() => zoomIn()}
      />
      <span className="flex items-center justify-center">
        <span className="text-xs" onClick={() => resetZoom()}>
          {(zoom * 100).toFixed(0)}%{' '}
        </span>
      </span>

      <ActionButton
        customClass="my-1"
        icon="ZoomOut"
        tooltip="zoom-out"
        tooltipSide="left"
        action={() => zoomOut()}
      />
    </span>
  );
};
