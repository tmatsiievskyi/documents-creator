'use client';

import { createContext, ReactNode, useContext } from 'react';
import { useZoom } from '../hooks';

export type TZoomContext = {
  zoom: number;
  zoomIn: () => void;
  zoomOut: () => void;
  resetZoom: () => void;
  initialZoom: number;
};

export type TZoomProviderProps = {
  children: ReactNode;
  minZoom?: number;
  maxZoom?: number;
  step?: number;
  initialZoom?: number;
};

const ZoomContext = createContext<TZoomContext | null>(null);

export const ZoomProvider = ({ children, ...restProps }: TZoomProviderProps) => {
  const zoomState = useZoom(restProps);

  return <ZoomContext value={zoomState}>{children}</ZoomContext>;
};

export const useZoomContext = () => {
  const context = useContext(ZoomContext);

  if (context === null) {
    throw new Error('ZoomContext is required inside useZoomContext');
  }

  return context;
};
