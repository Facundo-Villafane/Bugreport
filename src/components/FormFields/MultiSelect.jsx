import React from 'react';

const MultiSelect = ({
  label,
  name,
  value = [],
  onChange,
  options,
  required = false,
  error
}) => {
  const handleCheckboxChange = (option) => {
    const newValue = value.includes(option)
      ? value.filter(v => v !== option)
      : [...value, option];

    onChange({ target: { name, value: newValue } });
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-bold mb-2" style={{color: 'var(--retro-border)'}}>
        {label} {required && <span style={{color: 'var(--retro-primary)'}}>*</span>}
      </label>
      <div className="p-3 max-h-48 overflow-y-auto" style={{border: '3px solid var(--retro-border)', backgroundColor: 'var(--retro-card-bg)'}}>
        {options.map((option) => (
          <label key={option} className="flex items-center mb-2 cursor-pointer p-1" style={{backgroundColor: value.includes(option) ? 'var(--retro-accent)' : 'transparent'}}>
            <input
              type="checkbox"
              checked={value.includes(option)}
              onChange={() => handleCheckboxChange(option)}
              className="mr-2 h-4 w-4"
              style={{accentColor: 'var(--retro-primary)'}}
            />
            <span className="text-sm font-mono" style={{color: 'var(--retro-text)'}}>{option}</span>
          </label>
        ))}
      </div>
      {value.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {value.map((item) => (
            <span key={item} className="inline-flex items-center px-3 py-1 text-xs font-bold uppercase" style={{backgroundColor: 'var(--retro-secondary)', color: 'var(--retro-border)', border: '2px solid var(--retro-border)'}}>
              {item}
              <button
                type="button"
                onClick={() => handleCheckboxChange(item)}
                className="ml-2 font-bold"
                style={{color: 'var(--retro-border)'}}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}
      {error && <p className="mt-1 text-sm font-mono" style={{color: 'var(--retro-primary)'}}>{error}</p>}
    </div>
  );
};

export default MultiSelect;
