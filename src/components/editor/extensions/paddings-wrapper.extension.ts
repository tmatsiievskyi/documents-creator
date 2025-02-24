import { TPaddingItems } from '@/shared/context';
import { Extension } from '@tiptap/core';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    paddings: {
      setInitialPaddings: (paddings: TPaddingItems) => ReturnType;
      setPadding: (padding: Partial<TPaddingItems>) => ReturnType;
    };
  }
}

export type TWrapperPaddingsOptions = {
  initialPaddings: TPaddingItems;
  paddings: Partial<TPaddingItems>;
};

const updateDomElementPaddings = (domElement: HTMLElement, paddings: Partial<TPaddingItems>) => {
  domElement.style.paddingTop = paddings.paddingTop + 'px';
  domElement.style.paddingRight = paddings.paddingRight + 'px';
  domElement.style.paddingBottom = paddings.paddingBottom + 'px';
  domElement.style.paddingLeft = paddings.paddingLeft + 'px';
};

export const PaddingsWrapperExtension = Extension.create<TWrapperPaddingsOptions>({
  name: 'wrapperPaddings',

  onCreate() {
    this.editor.commands.setInitialPaddings(this.options.initialPaddings);
  },

  addCommands() {
    return {
      setInitialPaddings:
        (paddings: TPaddingItems) =>
        ({ editor }) => {
          const domElement = editor.view.dom.parentNode;
          if (domElement instanceof HTMLElement) {
            updateDomElementPaddings(domElement, paddings);
          }

          return true;
        },
      setPadding:
        (paddings: Partial<TPaddingItems>) =>
        ({ editor }) => {
          const domElement = editor.view.dom.parentNode;
          if (domElement instanceof HTMLElement) {
            updateDomElementPaddings(domElement, paddings);
          }
          return true;
        },
    };
  },
});
