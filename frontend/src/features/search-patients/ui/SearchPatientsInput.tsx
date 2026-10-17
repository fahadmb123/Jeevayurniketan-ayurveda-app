import React from 'react';
import { Search, X } from 'lucide-react';
import './SearchPatientsInput.css';

export interface SearchPatientsInputProps {
  value: string;
  onChange: (query: string) => void;
  placeholder?: string;
  className?: string;
}

export const SearchPatientsInput: React.FC<SearchPatientsInputProps> = ({
  value,
  onChange,
  placeholder = 'Search patients, records...',
  className = '',
}) => {
  return (
    <div className={`search-patients-field ${className}`}>
      <Search size={18} className="search-patients-field__icon" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="search-patients-field__input"
      />
      {value && (
        <button
          className="search-patients-field__clear"
          onClick={() => onChange('')}
          aria-label="Clear search"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
};
