/* eslint-disable @typescript-eslint/no-explicit-any */
import { isFunction } from '@/utils';
import type { AnyExtension, Editor } from '@tiptap/core';
import { ReactNode, useMemo, ComponentType } from 'react';

type TProps = {
  editor: Editor;
  disabled?: boolean;
};

type TToolbarButton = {
  component: ComponentType<any>;
  componentProps: Record<string, any>;
};

type TGeneratedToolbarItems = Record<
  string,
  { component: ComponentType<any>; componentProps: Record<string, any> }[]
>;

const generateToolbarItems = (editor: TProps['editor']) => {
  const extensions: AnyExtension[] = [...editor.extensionManager.extensions];

  const items = extensions.reduce((acc, extension) => {
    const { button, group } = extension.options;

    if (!button || !isFunction(button)) return acc;

    const buttonSpec: TToolbarButton = button({
      editor,
      extension,
    });

    if (!acc[group]) {
      acc[group] = [];
    }

    if (Array.isArray(buttonSpec)) {
      acc[group].push([...buttonSpec] as unknown as TToolbarButton);
    }

    acc[group].push(buttonSpec);

    return acc;
  }, {} as TGeneratedToolbarItems);

  return items;
};

export const EditorToolbar = ({ editor, disabled }: TProps) => {
  const generatedToolbarItems = useMemo(
    () => generateToolbarItems(editor),
    [editor]
  );

  const domSections = Object.entries(generatedToolbarItems).map(
    ([section, buttons]) => {
      return (
        <div key={section}>
          <p>{section}</p>
          {buttons.map((button, key) => {
            const ButtonComp = button.component;
            return (
              <ButtonComp
                key={button.componentProps.tooltip + key}
                {...button.componentProps}
                disabled={disabled || button.componentProps?.disabled}
              />
            );
          })}
        </div>
      );
    }
  );

  const domContainer = (innerContent: ReactNode) => {
    return <div>{innerContent}</div>;
  };

  return domContainer(domSections);
};
