import React from 'react';

const PlatformReproRate = ({ platforms, reproRates, onChange, error }) => {
  const allPlatforms = ['PS4', 'PS5', 'XB1', 'XSX', 'Switch', 'PC', 'Android', 'iOS', 'iPAD', 'Switch 2'];

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
        Enter how many times the bug occurred vs total attempts for each platform.
        Leave 00/00 for platforms not tested.
      </p>

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
