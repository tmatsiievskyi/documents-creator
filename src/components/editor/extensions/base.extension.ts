import { AnyExtension, Extension } from '@tiptap/core';
import TextStyle, { TextStyleOptions } from '@tiptap/extension-text-style';

type TBaseKitExtensionOptions = {
  /**
   * Text Style options or false, indicating whether to enable text style functionality
   *
   * @default true
   */
  textStyle: Partial<TextStyleOptions> | false;
};

export const BaseKitExtension = Extension.create<TBaseKitExtensionOptions>({
  name: 'base-kit',

  addExtensions() {
    const extensions: AnyExtension[] = [];

    if (this.options.textStyle !== false) {
      extensions.push(TextStyle.configure(this.options.textStyle));
    }

    return extensions;
  },
});
