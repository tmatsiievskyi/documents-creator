/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from '@/lib/utils';
import { isFunction } from '@/utils';
import type { AnyExtension, Editor } from '@tiptap/core';
import { ReactNode, useMemo, ComponentType } from 'react';
import { ZoomControls } from './zoom-controls';

type TProps = {
  editor: Editor;
  disabled?: boolean;
  toolbarType: 'ui' | 'manage';
  wrapperClassName?: string;
  sectionClassName?: string;
  itemWrapperClassName?: string;
};

type TToolbarButton = {
  component: ComponentType<any>;
  componentProps: Record<string, any>;
};

type TGeneratedToolbarItems = Record<
  string,
  { component: ComponentType<any>; componentProps: Record<string, any> }[]
>;

const generateToolbarItems = (editor: TProps['editor'], toolbarType: 'ui' | 'manage') => {
  const extensions: AnyExtension[] = [...editor.extensionManager.extensions];

  const items = extensions.reduce((acc, extension) => {
    const { button, group, editorGroup } = extension.options;

    if (!button || !isFunction(button) || editorGroup !== toolbarType) return acc;

    const buttonSpec: TToolbarButton = button({
      editor,
      extension,
    });

    if (!acc[group]) {
      acc[group] = [];
    }

    if (Array.isArray(buttonSpec)) {
      acc[group].push([...buttonSpec] as unknown as TToolbarButton);
    } else {
      acc[group].push(buttonSpec);
    }

    return acc;
  }, {} as TGeneratedToolbarItems);

  return items;
};

// TODO: keep focus after button click

export const EditorToolbar = ({
  editor,
  disabled,
  toolbarType,
  wrapperClassName,
  sectionClassName,
  itemWrapperClassName,
}: TProps) => {
  const generatedToolbarItems = useMemo(
    () => generateToolbarItems(editor, toolbarType),
    [editor, toolbarType]
  );
  const buttonStyle = useMemo(
    () => ({
      manage: 'my-1 [&_svg]:size-5',
      ui: 'mx-0 [&_svg]:size-5',
    }),
    []
  );

  const domSections = useMemo(
    () =>
      Object.entries(generatedToolbarItems).map(([section, buttons], index) => {
        return (
          <div key={section} className={cn('flex items-center', sectionClassName)}>
            {buttons.map((buttonComp, key) => {
              if (Array.isArray(buttonComp)) {
                return buttonComp.map((buttonFromArr, i) => {
                  const ButtonComp = buttonFromArr.component;
                  return (
                    <ButtonComp
                      key={
                        (buttonFromArr.component?.displayName || buttonFromArr.component?.name) + i
                      }
                      {...buttonFromArr.componentProps}
                      disabled={disabled || buttonFromArr.componentProps?.disabled}
                      className={cn(buttonStyle[toolbarType])}
                      tooltipSide={toolbarType === 'ui' ? 'bottom' : 'left'}
                    />
                  );
                });
              } else {
                const ButtonComp = buttonComp.component;
                return (
                  <ButtonComp
                    key={(buttonComp.component?.displayName || buttonComp.component?.name) + key}
                    {...buttonComp.componentProps}
                    disabled={disabled || buttonComp.componentProps?.disabled}
                    className={cn(buttonStyle[toolbarType])}
                    tooltipSide={toolbarType === 'ui' ? 'bottom' : 'left'}
                  />
                );
              }
            })}

            {Object.keys(generatedToolbarItems).length > index + 1 && (
              <div
                className={cn(
                  {
                    'min-w-5 h-px bg-gray-200': toolbarType === 'manage',
                    'min-h-5 w-px mx-1  bg-gray-200 ': toolbarType === 'ui',
                  },

                  itemWrapperClassName
                )}
              ></div>
            )}
          </div>
        );
      }),
    [
      disabled,
      generatedToolbarItems,
      itemWrapperClassName,
      sectionClassName,
      buttonStyle,
      toolbarType,
    ]
  );

  const domContainer = (innerContent: ReactNode) => {
    return (
      <div className={cn('flex items-center', wrapperClassName)}>
        {innerContent}
        {toolbarType === 'manage' && (
          <div className="mt-auto">
            <ZoomControls />
          </div>
        )}
      </div>
    );
  };

  return domContainer(domSections);
};
