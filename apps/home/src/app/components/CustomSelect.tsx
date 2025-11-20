'use client';

import { useState, useRef, useEffect } from 'react';

interface CustomSelectProps {
  id: string;
  name: string;
  label: string;
  options: string[];
  required?: boolean;
  value?: string;
  onChange?: (value: string) => void;
}

export function CustomSelect({
  id,
  name,
  label,
  options,
  required = false,
  value: controlledValue,
  onChange,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(controlledValue || '');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (controlledValue !== undefined) {
      setSelectedValue(controlledValue);
    }
  }, [controlledValue]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option: string) => {
    setSelectedValue(option);
    setIsOpen(false);
    onChange?.(option);
  };

  return (
    <div ref={dropdownRef} className='relative'>
      <label
        htmlFor={id}
        className='block text-sm font-medium text-white/90 mb-2'
      >
        {label} {required && '*'}
      </label>

      {/* Hidden input for form submission */}
      <input
        type='hidden'
        name={name}
        value={selectedValue}
        required={required}
      />

      {/* Custom select button */}
      <button
        type='button'
        id={id}
        onClick={() => setIsOpen(!isOpen)}
        className='w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white text-left focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/20 transition-all flex items-center justify-between'
      >
        <span className={selectedValue ? 'text-white' : 'text-white/40'}>
          {selectedValue || '-- Select --'}
        </span>
        <svg
          className={`h-5 w-5 text-white/60 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 20 20'
          fill='currentColor'
        >
          <path
            fillRule='evenodd'
            d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
            clipRule='evenodd'
          />
        </svg>
      </button>

      {/* Dropdown options */}
      {isOpen && (
        <div className='absolute z-10 w-full mt-2 py-2 rounded-lg bg-[#05060b]/95 backdrop-blur-sm border border-white/10 shadow-xl max-h-60 overflow-auto'>
          {options.map(option => (
            <button
              key={option}
              type='button'
              onClick={() => handleSelect(option)}
              className={`w-full px-4 py-3 text-left transition-colors ${
                selectedValue === option
                  ? 'bg-white/15 text-white font-medium'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
