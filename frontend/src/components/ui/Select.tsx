import React, { SelectHTMLAttributes } from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: SelectOption[];
  error?: string;
}

export const Select: React.FC<SelectProps> = ({ label, options, error, id, className = '', ...props }) => {
  const selectId = id || label.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="w-full flex flex-col mb-4">
      <label htmlFor={selectId} className="mb-1.5 text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <select
        id={selectId}
        className={`px-4 py-2 bg-white dark:bg-dark-bg border ${
          error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-dark-border focus:ring-brand-500'
        } rounded-md text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:border-transparent transition-colors appearance-none ${className}`}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <span className="mt-1 text-sm text-red-500">{error}</span>}
    </div>
  );
};
