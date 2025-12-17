import React from 'react';

const Select = ({
  label,
  name,
  value,
  onChange,
  options,
  required = false,
  error,
  placeholder = 'Select an option...'
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-bold mb-2" style={{color: 'var(--retro-border)'}}>
        {label} {required && <span style={{color: 'var(--retro-primary)'}}>*</span>}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-3 py-2"
        style={{
          border: error ? '3px solid var(--retro-primary)' : '3px solid var(--retro-border)',
          backgroundColor: 'var(--retro-card-bg)',
          color: 'var(--retro-text)'
        }}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm font-mono" style={{color: 'var(--retro-primary)'}}>{error}</p>}
    </div>
  );
};

export default Select;
