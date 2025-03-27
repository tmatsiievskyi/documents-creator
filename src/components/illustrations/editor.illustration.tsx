'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FileText, ChevronDown, Check } from 'lucide-react';

import { Popover, PopoverContent, PopoverTrigger } from '@/ui/popover';

type TProps = {
  editorMessage: string;
  editorText: string;
  editorOptions: Record<string, Array<string>>;
};
export function EditorIllustration({ editorMessage, editorText, editorOptions }: TProps) {
  const [isTyping, setIsTyping] = useState(false);
  const [text, setText] = useState('');
  const [activeVariable, setActiveVariable] = useState<string | null>(null);
  const initialValues = useMemo(
    () =>
      Object.keys(editorOptions).reduce((acc, cur) => {
        if (acc) {
          acc = { ...acc, [cur]: '' };
        } else {
          acc = { [cur]: '' };
        }

        return acc;
      }, {}),
    [editorOptions]
  );

  const [selectedValues, setSelectedValues] = useState<Record<string, string>>(initialValues);

  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    let charIndex = 0;

    const typeNextChar = () => {
      if (charIndex < editorText.length) {
        setText(editorText.substring(0, charIndex + 1));
        charIndex++;

        if (editorText.charAt(charIndex - 1) === '{' && editorText.charAt(charIndex) === '{') {
          timeout = setTimeout(typeNextChar, 500);
        } else {
          timeout = setTimeout(typeNextChar, 50 + Math.random() * 50);
        }
      } else {
        setIsTyping(false);
      }
    };

    setIsTyping(true);
    typeNextChar();

    return () => clearTimeout(timeout);
  }, [editorText]);

  const handleSelectOption = (variable: string, value: string) => {
    setSelectedValues(prev => ({
      ...prev,
      [variable]: value,
    }));
    setActiveVariable(null);
  };

  const getDisplayText = () => {
    const displayText = text;

    return displayText;
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setActiveVariable(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="bg-background relative w-full max-w-md rounded-xl border p-4 shadow-xl">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="size-5" />
          <span className="text-sm font-medium">New Document</span>
        </div>
        <div className="flex items-center gap-2">
          <motion.div
            className="bg-primary/10 text-primary flex size-6 items-center justify-center rounded-full"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          ></motion.div>
          <motion.div
            className="bg-primary/10 text-primary flex size-6 items-center justify-center rounded-full"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          ></motion.div>
        </div>
      </div>

      <div className="bg-muted/50 min-h-[200px] rounded-lg border p-4 font-mono text-sm">
        <div className="relative">
          {getDisplayText()
            .split(/(\{\{.*?\}\})/)
            .map((part, index) => {
              const isVariable = part.startsWith('{{') && part.endsWith('}}');

              if (isVariable) {
                const hasValue = selectedValues[part] !== '';
                const variableName = part.replace(/\{\{|\}\}/g, '');
                const displayValue = hasValue ? selectedValues[part] : variableName;

                return (
                  <Popover
                    key={index}
                    open={activeVariable === part}
                    onOpenChange={open => {
                      if (open) setActiveVariable(part);
                      else setActiveVariable(null);
                    }}
                  >
                    <PopoverTrigger asChild>
                      <button
                        className={`inline-flex items-center gap-1 rounded px-1 py-0.5 ${
                          hasValue
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                            : 'bg-red-100 text-red-600'
                        }`}
                        onClick={() => setActiveVariable(part)}
                      >
                        {`{{${displayValue}}}`}
                        <ChevronDown className="size-3 opacity-70" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent ref={popoverRef} className="w-48 p-1" align="start">
                      <div className="space-y-1">
                        <div className="text-muted-foreground px-2 py-1.5 text-xs font-bold">
                          {variableName}
                        </div>
                        {editorOptions[part]?.map((option, i) => (
                          <button
                            key={i}
                            className="hover:bg-muted flex w-full items-center justify-between rounded-sm px-2 py-1.5 text-sm"
                            onClick={() => handleSelectOption(part, option)}
                          >
                            {option}
                            {selectedValues[part] === option && (
                              <Check className="text-primary size-4" />
                            )}
                          </button>
                        ))}
                      </div>
                    </PopoverContent>
                  </Popover>
                );
              }

              return <span key={index}>{part}</span>;
            })}
          {isTyping && (
            <motion.span
              className="bg-primary inline-block h-4 w-0.5"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
            />
          )}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="text-muted-foreground text-xs">{editorMessage}</div>
        {/* <motion.button
          className="bg-primary text-primary-foreground rounded-md px-3 py-1 text-xs font-medium"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Fill all variables
        </motion.button> */}
      </div>
    </div>
  );
}
