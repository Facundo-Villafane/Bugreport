import { useState, useEffect } from 'react';
import BugReportForm from './components/BugReportForm';
import AIGeneratedOutput from './components/AIGeneratedOutput';
import ThemeToggle from './components/ThemeToggle';
import groqService from './services/groqService';

function App() {
  const [formData, setFormData] = useState({});
  const [generatedFields, setGeneratedFields] = useState({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(null);

  // Auto-generate when form data changes (debounced)
  useEffect(() => {
    // Check if we have minimum required data
    const hasRequiredData =
      formData.bugDescription &&
      formData.bugDescription.length >= 20 &&
      formData.whatWasDoing &&
      formData.whereHappened &&
      formData.experiencesImpacted?.length > 0 &&
      formData.howFound;

    if (!hasRequiredData) {
      setGeneratedFields({});
      return;
    }

    // Debounce the generation
    const timeoutId = setTimeout(async () => {
      setIsGenerating(true);
      setError(null);

      try {
        const results = await groqService.generateAllFields(formData);
        setGeneratedFields(results);
      } catch (err) {
        console.error('Error generating bug report:', err);
        setError(err.message || 'Failed to generate bug report. Please try again.');
      } finally {
        setIsGenerating(false);
      }
    }, 1500); // Wait 1.5s after user stops typing

    return () => clearTimeout(timeoutId);
  }, [formData]);

  const handleFormChange = (data) => {
    setFormData(data);
  };

  const handleReset = () => {
    setFormData({});
    setGeneratedFields({});
    setError(null);
  };

  return (
    <div className="min-h-screen">
      <ThemeToggle />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Form */}
          <div className="lg:sticky lg:top-8 lg:self-start">
            <BugReportForm
              onChange={handleFormChange}
              formData={formData}
            />
          </div>

          {/* Right Column - Live Preview */}
          <div>
            {error && (
              <div className="mb-4 p-4 retro-card" style={{backgroundColor: '#ffebee'}}>
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" style={{color: '#c62828'}}>
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h3 className="font-bold" style={{color: '#c62828'}}>Error</h3>
                    <p className="text-sm" style={{color: '#c62828'}}>{error}</p>
                  </div>
                </div>
              </div>
            )}

            {Object.keys(generatedFields).length === 0 && !isGenerating && (
              <div className="retro-card p-8 text-center">
                <h2 className="text-2xl font-bold uppercase mb-4" style={{color: 'var(--retro-border)'}}>
                  LIVE PREVIEW
                </h2>
                <p className="font-mono text-sm" style={{color: 'var(--retro-text)'}}>
                  Fill out the form on the left to see the AI-generated bug report here in real-time.
                </p>
                <div className="mt-6 p-4" style={{border: '2px solid var(--retro-border)', backgroundColor: 'var(--retro-accent)'}}>
                  <p className="text-xs font-mono" style={{color: 'var(--retro-text)'}}>
                    Required fields: Bug Description (20+ chars), What Were You Doing, Where Did It Happen, Experience Impacted, How Found
                  </p>
                </div>
              </div>
            )}

            {isGenerating && (
              <div className="retro-card p-8">
                <div className="flex flex-col items-center">
                  <div className="relative w-16 h-16 mb-4">
                    <div className="absolute top-0 left-0 w-full h-full border-4 rounded-full" style={{borderColor: 'var(--retro-accent)'}}></div>
                    <div className="absolute top-0 left-0 w-full h-full border-4 rounded-full border-t-transparent animate-spin" style={{borderColor: 'var(--retro-primary)'}}></div>
                  </div>
                  <h3 className="text-xl font-bold uppercase" style={{color: 'var(--retro-border)'}}>
                    GENERATING...
                  </h3>
                  <p className="text-sm font-mono mt-2" style={{color: 'var(--retro-text)'}}>
                    AI is analyzing your input
                  </p>
                </div>
              </div>
            )}

            {Object.keys(generatedFields).length > 0 && !isGenerating && (
              <AIGeneratedOutput
                data={generatedFields}
                formData={formData}
                onReset={handleReset}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
