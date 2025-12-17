import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="max-w-4xl mx-auto retro-card p-12">
      <div className="flex flex-col items-center justify-center">
        <div className="relative w-24 h-24 mb-6">
          <div className="absolute top-0 left-0 w-full h-full border-8 rounded-full" style={{borderColor: 'var(--retro-accent)'}}></div>
          <div className="absolute top-0 left-0 w-full h-full border-8 rounded-full border-t-transparent animate-spin" style={{borderColor: 'var(--retro-primary)'}}></div>
        </div>

        <h2 className="text-3xl font-bold uppercase mb-3" style={{color: 'var(--retro-border)'}}>GENERATING BUG REPORT</h2>
        <p className="text-sm font-mono mb-8" style={{color: 'var(--retro-text)'}}>AI IS ANALYZING YOUR INPUT AND FORMATTING THE REPORT...</p>

        <div className="w-full max-w-md space-y-3">
          <div className="flex items-center text-sm font-mono" style={{color: 'var(--retro-text)'}}>
            <div className="w-4 h-4 mr-3 animate-pulse" style={{backgroundColor: 'var(--retro-secondary)', border: '2px solid var(--retro-border)'}}></div>
            <span>GENERATING SUMMARY...</span>
          </div>
          <div className="flex items-center text-sm font-mono" style={{color: 'var(--retro-text)'}}>
            <div className="w-4 h-4 mr-3 animate-pulse" style={{backgroundColor: 'var(--retro-secondary)', border: '2px solid var(--retro-border)', animationDelay: '0.2s'}}></div>
            <span>ANALYZING SEVERITY...</span>
          </div>
          <div className="flex items-center text-sm font-mono" style={{color: 'var(--retro-text)'}}>
            <div className="w-4 h-4 mr-3 animate-pulse" style={{backgroundColor: 'var(--retro-secondary)', border: '2px solid var(--retro-border)', animationDelay: '0.4s'}}></div>
            <span>CREATING STEPS TO REPRODUCE...</span>
          </div>
          <div className="flex items-center text-sm font-mono" style={{color: 'var(--retro-text)'}}>
            <div className="w-4 h-4 mr-3 animate-pulse" style={{backgroundColor: 'var(--retro-secondary)', border: '2px solid var(--retro-border)', animationDelay: '0.6s'}}></div>
            <span>WRITING DESCRIPTION...</span>
          </div>
          <div className="flex items-center text-sm font-mono" style={{color: 'var(--retro-text)'}}>
            <div className="w-4 h-4 mr-3 animate-pulse" style={{backgroundColor: 'var(--retro-secondary)', border: '2px solid var(--retro-border)', animationDelay: '0.8s'}}></div>
            <span>SUGGESTING COMPONENT...</span>
          </div>
        </div>

        <div className="mt-8 p-3 text-xs font-mono text-center uppercase" style={{backgroundColor: 'var(--retro-accent)', color: 'var(--retro-text)', border: '2px solid var(--retro-border)'}}>
          <p>THIS USUALLY TAKES 5-10 SECONDS</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
