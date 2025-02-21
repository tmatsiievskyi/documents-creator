import React, { useState, useCallback, useEffect } from 'react';
import { TSuggestionItemProps, TSuggestionListProps } from './_types';

export const SuggestionList: React.FC<TSuggestionListProps> = ({ items, command }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectItem = useCallback(
    (index: number) => {
      const item = items[index];
      if (item) {
        command({ item });
      }
    },
    [items, command]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(index => Math.max(0, index - 1));
        return true;
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(index => Math.min(items.length - 1, index + 1));
        return true;
      }

      if (e.key === 'Enter') {
        e.preventDefault();
        selectItem(selectedIndex);
        return true;
      }

      return false;
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [items, selectItem, selectedIndex]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [items]);

  const handleItemClick = (item: TSuggestionItemProps) => {
    command({ item });
  };

  if (items.length === 0) {
    return (
      <div>
        <div>No suggestions available</div>
      </div>
    );
  }

  return (
    <div className="z-50 h-auto max-h-[330px] overflow-y-auto scroll-smooth rounded-md border border-gray-200 px-1 py-2 shadow-md transition-all">
      {items.map((item, index) => {
        const selected = selectedIndex === index;
        return (
          <button
            key={item.title}
            className={`flex w-full items-center space-x-2 rounded-md px-2 py-1 text-sm text-gray-800 hover:bg-gray-100
              ${selected ? 'bg-gray-100 text-gray-900' : ''}
            `}
            onClick={() => handleItemClick(item)}
            onMouseEnter={() => setSelectedIndex(index)}
            type="button"
          >
            <span className="suggestion-title pl-2">{item.title}</span>
          </button>
        );
      })}
    </div>
  );
};
