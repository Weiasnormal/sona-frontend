"use client";

import { useState, useRef, useEffect } from 'react';
import { SortOption, SORT_OPTIONS } from '@/utils/sortUtils';
import dynamic from 'next/dynamic';

// Dynamically import Lucide React icons with SSR disabled to prevent hydration errors
const ChevronDown = dynamic(() => import('lucide-react').then(mod => mod.ChevronDown), { ssr: false });

interface SortDropdownProps {
  onSortChange: (option: SortOption) => void;
  defaultOption?: SortOption;
}

export default function SortDropdown({ onSortChange, defaultOption = SORT_OPTIONS[0] }: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<SortOption>(defaultOption);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleOptionSelect = (option: SortOption) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSortChange(option);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 text-sm text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <span>Sort: {selectedOption.label}</span>
        <ChevronDown className="h-4 w-4" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-md shadow-lg z-100 py-1 border border-gray-200 dark:border-gray-700">
          {SORT_OPTIONS.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionSelect(option)}
              className={`block w-full text-left px-4 py-2 text-sm ${
                selectedOption.label === option.label
                  ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
