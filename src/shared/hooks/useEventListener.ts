/* eslint-disable no-undef */
'use client';
import { useEffect, useRef } from 'react';

interface UseEventListenerOptions {
  capture?: boolean;
  passive?: boolean;
  once?: boolean;
}

type TEventMap = {} & HTMLElementEventMap & DocumentEventMap & WindowEventMap;

/**
 * Handling HTML, DOC, Win events
 * @param eventName - Name of the event to listen to
 * @param handler - Event handler function
 * @param element - Target element (add check for windon in next)
 * @param options - Event listener options
 */
function useEventListener<K extends keyof TEventMap>(
  eventName: K,
  callback: (e: TEventMap[K]) => void,
  element: HTMLElement | Window | null,
  options?: UseEventListenerOptions
) {
  const savedHandler = useRef(callback);

  useEffect(() => {
    savedHandler.current = callback;
  }, [callback]);

  useEffect(() => {
    const targetElement: HTMLElement | Document | Window = element || document;

    if (!targetElement?.addEventListener) return;

    const eventListener = (event: Event) => {
      if (eventName in targetElement || 'on' + eventName in targetElement) {
        savedHandler.current(event as TEventMap[K]);
      }
    };

    targetElement.addEventListener(eventName, eventListener, options);

    return () => targetElement.removeEventListener(eventName, eventListener, options);
  }, [eventName, element, options]);
}

export { useEventListener };
export type { UseEventListenerOptions };
