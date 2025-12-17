import { useState } from 'react';
import BugReportForm from './components/BugReportForm';
import AIGeneratedOutput from './components/AIGeneratedOutput';
import LoadingSpinner from './components/LoadingSpinner';
import ThemeToggle from './components/ThemeToggle';
import groqService from './services/groqService';

function App() {
  const [step, setStep] = useState('input'); // 'input' | 'generating' | 'output'
  const [formData, setFormData] = useState({});
  const [generatedFields, setGeneratedFields] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerate = async (data) => {
    setFormData(data);
    setIsLoading(true);
    setStep('generating');
    setError(null);

    try {
      // Generate all fields using Groq API
      const results = await groqService.generateAllFields(data);

      setGeneratedFields(results);
      setStep('output');
    } catch (err) {
      console.error('Error generating bug report:', err);
      setError(err.message || 'Failed to generate bug report. Please try again.');
      setStep('input');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setStep('input');
    setFormData({});
    setGeneratedFields({});
    setError(null);
  };

  return (
    <div className="min-h-screen">
      <ThemeToggle />

      {error && (
        <div className="max-w-4xl mx-auto mb-4 bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-red-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <div>
              <h3 className="text-red-800 font-medium">Error</h3>
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          </div>
        </div>
      )}

      {step === 'input' && (
        <BugReportForm onSubmit={handleGenerate} isLoading={isLoading} />
      )}

      {step === 'generating' && <LoadingSpinner />}

      {step === 'output' && (
        <AIGeneratedOutput
          data={generatedFields}
          formData={formData}
          onReset={handleReset}
        />
      )}
    </div>
  );
}

export default App;
