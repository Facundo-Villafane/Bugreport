import React from 'react';

const TextArea = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  required = false,
  rows = 4,
  error,
  helpText
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-bold mb-2" style={{color: 'var(--retro-border)'}}>
        {label} {required && <span style={{color: 'var(--retro-primary)'}}>*</span>}
      </label>
      {helpText && <p className="text-xs font-mono mb-2" style={{color: 'var(--retro-text)'}}>{helpText}</p>}
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        rows={rows}
        className="w-full px-3 py-2"
        style={{
          border: error ? '3px solid var(--retro-primary)' : '3px solid var(--retro-border)',
          backgroundColor: 'var(--retro-card-bg)',
          color: 'var(--retro-text)'
        }}
      />
      {error && <p className="mt-1 text-sm font-mono" style={{color: 'var(--retro-primary)'}}>{error}</p>}
    </div>
  );
};

export default TextArea;
