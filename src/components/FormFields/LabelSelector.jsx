import React from 'react';

const LabelSelector = ({ value, onChange, labelCategories }) => {
  const handleLabelChange = (category, selectedValue) => {
    const newLabels = {
      ...value,
      [category]: selectedValue
    };
    onChange({ target: { name: 'labels', value: newLabels } });
  };

  const handleCheckboxChange = (checked) => {
    const newLabels = {
      ...value,
      llmEnabled: checked
    };
    onChange({ target: { name: 'labels', value: newLabels } });
  };

  // Build final labels array for display
  const buildLabelsList = () => {
    const labels = [];
    if (value.primary) labels.push(value.primary);
    if (value.secondary) labels.push(value.secondary);
    if (value.gameMode) labels.push(value.gameMode);
    if (value.llmEnabled) labels.push('LLM-Enabled');
    return labels;
  };

  const finalLabels = buildLabelsList();

  return (
    <div className="mb-4">
      <label className="block text-sm font-bold mb-2" style={{color: 'var(--retro-border)'}}>
        Jira Labels <span style={{color: 'var(--retro-primary)'}}>*</span>
      </label>
      <p className="text-xs font-mono mb-3" style={{color: 'var(--retro-text)'}}>
        Select labels in order: Primary (required) → Secondary (optional) → Game Mode (optional) → LLM flag (if applicable)
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4" style={{border: '3px solid var(--retro-border)', backgroundColor: 'var(--retro-accent)'}}>
        {/* Primary Label (Required) */}
        <div>
          <label className="block text-xs font-bold mb-2 uppercase" style={{color: 'var(--retro-border)'}}>
            1. Primary Label <span style={{color: 'var(--retro-primary)'}}>*</span>
          </label>
          <div className="flex gap-2">
            {labelCategories.PRIMARY.map((label) => (
              <button
                key={label}
                type="button"
                onClick={() => handleLabelChange('primary', label)}
                className="px-4 py-2 text-sm font-bold uppercase flex-1"
                style={{
                  backgroundColor: value.primary === label ? 'var(--retro-primary)' : 'var(--retro-card-bg)',
                  color: value.primary === label ? 'var(--retro-header-text)' : 'var(--retro-text)',
                  border: '2px solid var(--retro-border)',
                  boxShadow: value.primary === label ? 'var(--retro-shadow)' : 'none'
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Secondary Label (Optional) */}
        <div>
          <label className="block text-xs font-bold mb-2 uppercase" style={{color: 'var(--retro-border)'}}>
            2. Secondary Label (Optional)
          </label>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => handleLabelChange('secondary', '')}
              className="px-3 py-2 text-sm font-bold uppercase"
              style={{
                backgroundColor: !value.secondary ? 'var(--retro-primary)' : 'var(--retro-card-bg)',
                color: !value.secondary ? 'var(--retro-header-text)' : 'var(--retro-text)',
                border: '2px solid var(--retro-border)'
              }}
            >
              NONE
            </button>
            {labelCategories.SECONDARY.map((label) => (
              <button
                key={label}
                type="button"
                onClick={() => handleLabelChange('secondary', label)}
                className="px-4 py-2 text-sm font-bold uppercase flex-1"
                style={{
                  backgroundColor: value.secondary === label ? 'var(--retro-primary)' : 'var(--retro-card-bg)',
                  color: value.secondary === label ? 'var(--retro-header-text)' : 'var(--retro-text)',
                  border: '2px solid var(--retro-border)',
                  boxShadow: value.secondary === label ? 'var(--retro-shadow)' : 'none'
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Game Mode Label (Optional) */}
        <div className="md:col-span-2">
          <label className="block text-xs font-bold mb-2 uppercase" style={{color: 'var(--retro-border)'}}>
            3. Game Mode Label (Optional)
          </label>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => handleLabelChange('gameMode', '')}
              className="px-3 py-2 text-xs font-bold uppercase"
              style={{
                backgroundColor: !value.gameMode ? 'var(--retro-primary)' : 'var(--retro-card-bg)',
                color: !value.gameMode ? 'var(--retro-header-text)' : 'var(--retro-text)',
                border: '2px solid var(--retro-border)'
              }}
            >
              NONE
            </button>
            {labelCategories.GAME_MODES.map((label) => (
              <button
                key={label}
                type="button"
                onClick={() => handleLabelChange('gameMode', label)}
                className="px-3 py-2 text-xs font-bold uppercase"
                style={{
                  backgroundColor: value.gameMode === label ? 'var(--retro-primary)' : 'var(--retro-card-bg)',
                  color: value.gameMode === label ? 'var(--retro-header-text)' : 'var(--retro-text)',
                  border: '2px solid var(--retro-border)',
                  boxShadow: value.gameMode === label ? 'var(--retro-shadow)' : 'none'
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* LLM Enabled Checkbox */}
        <div className="md:col-span-2">
          <label className="flex items-center cursor-pointer p-3" style={{backgroundColor: value.llmEnabled ? 'var(--retro-card-bg)' : 'transparent', border: '2px solid var(--retro-border)'}}>
            <input
              type="checkbox"
              checked={value.llmEnabled}
              onChange={(e) => handleCheckboxChange(e.target.checked)}
              className="mr-3 h-5 w-5"
              style={{accentColor: 'var(--retro-primary)'}}
            />
            <span className="text-sm font-bold uppercase" style={{color: 'var(--retro-border)'}}>
              4. Add LLM-Enabled label
            </span>
          </label>
        </div>
      </div>

      {/* Display selected labels */}
      {finalLabels.length > 0 && (
        <div className="mt-3 p-3" style={{border: '2px solid var(--retro-border)', backgroundColor: 'var(--retro-card-bg)'}}>
          <p className="text-xs font-bold mb-2 uppercase" style={{color: 'var(--retro-border)'}}>Selected Labels:</p>
          <div className="flex flex-wrap gap-2">
            {finalLabels.map((label, index) => (
              <span
                key={label}
                className="inline-flex items-center px-3 py-1 text-xs font-bold uppercase"
                style={{
                  backgroundColor: 'var(--retro-secondary)',
                  color: 'var(--retro-header-text)',
                  border: '2px solid var(--retro-border)'
                }}
              >
                {index + 1}. {label}
              </span>
            ))}
          </div>
        </div>
      )}

      {!value.primary && (
        <p className="mt-2 text-xs font-mono" style={{color: 'var(--retro-primary)'}}>
          Please select a primary label (EPAM-F or EPAM-X)
        </p>
      )}
    </div>
  );
};

export default LabelSelector;
