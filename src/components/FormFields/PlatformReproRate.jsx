import React, { useState } from 'react';

const PlatformReproRate = ({ platforms, reproRates, onChange, error }) => {
  const allPlatforms = ['PS4', 'PS5', 'XB1', 'XSX', 'Switch', 'PC', 'Android', 'iOS', 'iPAD', 'Switch 2'];
  const [activeTab, setActiveTab] = useState('BR');

  const MODE_PRESETS = {
    'BR': {
      'PS4': 10,
      'PS5': 6,
      'XB1': 10,
      'XSX': 11,
      'Switch': 14,
      'PC': 18,
      'Android': 8,
      'iOS': 10,
      'iPAD': 4,
      'Switch 2': 4 // Sage
    },
    'JUNO': {
      'PS4': 9,
      'PS5': 1,
      'XB1': 7,
      'XSX': 5,
      'Switch': 5,
      'PC': 4,
      'Android': 2,
      'iOS': 3,
      'iPAD': 0,
      'Switch 2': 0
    },
    'SPARKS': {
      'PS4': 7,
      'PS5': 3,
      'XB1': 2,
      'XSX': 4,
      'Switch': 8,
      'PC': 2,
      'Android': 3,
      'iOS': 3,
      'iPAD': 0,
      'Switch 2': 0
    }
  };

  const handleTabChange = (mode) => {
    setActiveTab(mode);
    const preset = MODE_PRESETS[mode];

    // Fill the "total" field for each platform with preset values
    const newReproRates = {};
    allPlatforms.forEach(platform => {
      newReproRates[platform] = {
        occurred: reproRates[platform]?.occurred || '',
        total: preset[platform]?.toString() || ''
      };
    });

    onChange({ target: { name: 'reproRates', value: newReproRates } });
  };

  const handleReproChange = (platform, field, value) => {
    // Only allow numbers
    if (value && !/^\d+$/.test(value)) return;

    const newReproRates = {
      ...reproRates,
      [platform]: {
        ...reproRates[platform],
        [field]: value
      }
    };

    onChange({ target: { name: 'reproRates', value: newReproRates } });
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-bold mb-2" style={{color: 'var(--retro-border)'}}>
        Reproduction Rate by Platform <span style={{color: 'var(--retro-primary)'}}>*</span>
      </label>
      <p className="text-xs font-mono mb-3" style={{color: 'var(--retro-text)'}}>
        Select a game mode to auto-fill device tested values. You can still edit them manually.
      </p>

      {/* Mode Tabs */}
      <div className="flex gap-2 mb-3">
        {['BR', 'JUNO', 'SPARKS'].map((mode) => (
          <button
            key={mode}
            type="button"
            onClick={() => handleTabChange(mode)}
            className="px-4 py-2 text-sm font-bold uppercase"
            style={{
              backgroundColor: activeTab === mode ? 'var(--retro-primary)' : 'var(--retro-secondary)',
              color: activeTab === mode ? 'var(--retro-header-text)' : 'var(--retro-text)',
              border: '3px solid var(--retro-border)',
              boxShadow: activeTab === mode ? 'var(--retro-shadow)' : 'none'
            }}
          >
            {mode}
          </button>
        ))}
      </div>

      <div className="p-4" style={{border: '3px solid var(--retro-border)', backgroundColor: 'var(--retro-accent)'}}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {allPlatforms.map((platform) => {
            const occurred = reproRates[platform]?.occurred || '';
            const total = reproRates[platform]?.total || '';

            return (
              <div key={platform} className="flex items-center gap-2">
                <label className="text-sm font-bold w-20" style={{color: 'var(--retro-border)'}}>
                  {platform}:
                </label>
                <input
                  type="text"
                  value={occurred}
                  onChange={(e) => handleReproChange(platform, 'occurred', e.target.value)}
                  placeholder="00"
                  maxLength={3}
                  className="w-14 px-2 py-1 text-center text-sm font-mono"
                  style={{border: '2px solid var(--retro-border)', backgroundColor: 'var(--retro-card-bg)', color: 'var(--retro-text)'}}
                />
                <span className="font-bold" style={{color: 'var(--retro-border)'}}>/</span>
                <input
                  type="text"
                  value={total}
                  onChange={(e) => handleReproChange(platform, 'total', e.target.value)}
                  placeholder="00"
                  maxLength={3}
                  className="w-14 px-2 py-1 text-center text-sm font-mono"
                  style={{border: '2px solid var(--retro-border)', backgroundColor: 'var(--retro-card-bg)', color: 'var(--retro-text)'}}
                />
              </div>
            );
          })}
        </div>

        {/* Calculate total */}
        <div className="mt-4 pt-3" style={{borderTop: '2px solid var(--retro-border)'}}>
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold uppercase" style={{color: 'var(--retro-border)'}}>Total:</span>
            <span className="text-lg font-bold" style={{color: 'var(--retro-primary)'}}>
              {Object.values(reproRates).reduce((sum, rate) => sum + (parseInt(rate.occurred) || 0), 0)}
              /
              {Object.values(reproRates).reduce((sum, rate) => sum + (parseInt(rate.total) || 0), 0)}
            </span>
          </div>
        </div>
      </div>

      {error && <p className="mt-1 text-sm font-mono" style={{color: 'var(--retro-primary)'}}>{error}</p>}
    </div>
  );
};

export default PlatformReproRate;
