import { Editor, Range } from '@tiptap/core';
import { useEffect, useState } from 'react';
import { TSuggestionItem } from '../extensions/suggestion.extension';

interface SuggestionListProps {
  items: TSuggestionItem[];
  command: (props: { item: TSuggestionItem }) => void;
  editor: Editor;
  range: Range;
}

export const SuggestionList: React.FC<SuggestionListProps> = ({
  items,
  command,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') {
        setSelectedIndex((prev) => Math.max(0, prev - 1));
        e.preventDefault();
      }
      if (e.key === 'ArrowDown') {
        setSelectedIndex((prev) => Math.min(items.length - 1, prev + 1));
        e.preventDefault();
      }
      if (e.key === 'Enter') {
        command({ item: items[selectedIndex] });
        e.preventDefault();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [items, selectedIndex, command]);

  return (
    <div className='suggestion-list'>
      {items.map((item, index) => (
        <button
          key={item.suggestion}
          className={`suggestion-item ${
            index === selectedIndex ? 'selected' : ''
          }`}
          onClick={() => command({ item })}
        >
          {/* {item.icon && <span className='suggestion-icon'>{item.icon}</span>} */}
          <span className='suggestion-value'>{item.suggestion}</span>
          {/* {item.description && (
            <span className='suggestion-description'>{item.description}</span>
          )} */}
        </button>
      ))}
    </div>
  );
};
