import React, { useState } from 'react';

interface SuggestionListProps {
  items: Array<{
    title: string;
    icon?: string;
    description?: string;
  }>;
  command: (props: { item: any }) => void;
}

export const SuggestionList: React.FC<SuggestionListProps> = ({
  items,
  command,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleItemClick = (item: any) => {
    console.log('Handling click for item:', item);
    command({ item });
  };

  if (items.length === 0) {
    return (
      <div className='suggestion-list empty'>
        <div className='suggestion-item'>No suggestions found</div>
      </div>
    );
  }

  return (
    <div className='suggestion-list'>
      {items.map((item, index) => (
        <button
          key={item.title}
          className={`suggestion-item ${
            index === selectedIndex ? 'selected' : ''
          }`}
          onClick={() => handleItemClick(item)}
          onMouseEnter={() => setSelectedIndex(index)}
          type='button'
        >
          {item.icon && (
            <span
              className='suggestion-icon'
              role='img'
              aria-label={item.title}
            >
              {item.icon}
            </span>
          )}
          <span className='suggestion-title'>{item.title}</span>
          {item.description && (
            <span className='suggestion-description'>{item.description}</span>
          )}
        </button>
      ))}
    </div>
  );
};
