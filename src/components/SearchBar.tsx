
import React, { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  onSearch: (query: string) => void;
  className?: string;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  className,
  placeholder = "Пошук термінів..." 
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(query);
    }, 300);
    
    return () => clearTimeout(handler);
  }, [query, onSearch]);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      inputRef.current?.blur();
    }
  };

  return (
    <div 
      className={cn(
        "relative flex items-center transition-all duration-300",
        isFocused ? "w-full" : "w-full md:w-96",
        className
      )}
    >
      <div
        className={cn(
          "absolute inset-0 rounded-xl transition-all duration-300",
          isFocused 
            ? "bg-background shadow-lg ring-1 ring-primary/20 scale-105" 
            : "bg-secondary/80"
        )}
      />
      
      <Search 
        className={cn(
          "absolute left-3 w-5 h-5 transition-colors",
          isFocused ? "text-primary" : "text-muted-foreground"
        )} 
      />
      
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={cn(
          "w-full h-12 pl-10 pr-4 bg-transparent relative z-10",
          "text-foreground placeholder-muted-foreground/70",
          "focus:outline-none"
        )}
      />
      
      {query && (
        <button
          onClick={() => setQuery('')}
          className="absolute right-3 z-10 rounded-full p-1 
            text-muted-foreground hover:text-foreground 
            hover:bg-muted transition-colors"
        >
          <span className="sr-only">Clear search</span>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      )}
    </div>
  );
};

export default SearchBar;
