import React from 'react';

const TextInput = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  required = false,
  type = 'text',
  error
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-bold mb-2" style={{color: 'var(--retro-border)'}}>
        {label} {required && <span style={{color: 'var(--retro-primary)'}}>*</span>}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
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

export default TextInput;
