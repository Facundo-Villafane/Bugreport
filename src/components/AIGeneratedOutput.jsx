import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { SEVERITY_LEVELS } from '../constants/jiraFields';

const FieldCard = ({ title, content, onCopy, copied }) => {
  return (
    <div className="p-4 mb-4" style={{backgroundColor: 'var(--retro-accent)', border: '3px solid var(--retro-border)', boxShadow: 'var(--retro-shadow)'}}>
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-bold uppercase" style={{color: 'var(--retro-border)'}}>{title}</h3>
        <button
          onClick={onCopy}
          className="px-3 py-2 text-sm font-bold uppercase"
          style={{backgroundColor: copied ? 'var(--retro-secondary)' : 'var(--retro-primary)', color: 'var(--retro-header-text)'}}
        >
          {copied ? 'COPIED' : 'COPY'}
        </button>
      </div>
      <div className="p-3" style={{backgroundColor: 'var(--retro-card-bg)', border: '2px solid var(--retro-border)'}}>
        <pre className="whitespace-pre-wrap text-sm font-mono" style={{color: 'var(--retro-text)'}}>{content}</pre>
      </div>
    </div>
  );
};

const AIGeneratedOutput = ({ data, formData, onReset }) => {
  const [copied, setCopied] = useState({});

  // Build labels array from formData
  const buildLabels = () => {
    const labels = [];
    if (formData.labels?.primary) labels.push(formData.labels.primary);
    if (formData.labels?.secondary) labels.push(formData.labels.secondary);
    if (formData.labels?.gameMode) labels.push(formData.labels.gameMode);
    if (formData.labels?.llmEnabled) labels.push('LLM-Enabled');
    return labels;
  };

  const copyField = (fieldName, content) => {
    navigator.clipboard.writeText(content);
    setCopied({ ...copied, [fieldName]: true });
    toast.success(`${fieldName} copied to clipboard!`);

    setTimeout(() => {
      setCopied({ ...copied, [fieldName]: false });
    }, 2000);
  };

  const copyAllJiraFormat = () => {
    const labels = buildLabels();
    const jiraFormatted = `
========================================
JIRA BUG REPORT
========================================

PROJECT: ${formData.project}

SUMMARY:
${data.summary}

PLATFORMS TESTED: ${formData.platformsTested?.join(', ') || 'N/A'}
PLATFORMS: ${formData.platforms?.join(', ') || 'N/A'}
HOW FOUND: ${formData.howFound}
EXPERIENCES IMPACTED: ${formData.experiencesImpacted?.join(', ')}
LABELS: ${labels.join(', ') || 'N/A'}

SEVERITY: ${data.severity} - ${SEVERITY_LEVELS[data.severity]}
REPRODUCTION RATE: ${formData.reproductionCount}
COMPONENT/S: ${data.component}

BRANCH FOUND IN: ${formData.branchFoundIn || 'N/A'}
FOUND CL: ${formData.foundCL || 'N/A'}
COMMAND LINE: ${formData.commandLine || 'N/A'}
TEST TEAM: ${formData.testTeam || 'N/A'}
DEVICE SPECS: ${formData.deviceSpecs || 'N/A'}

========================================
STEPS TO REPRODUCE:
========================================

${data.steps}

========================================
DESCRIPTION:
========================================

${data.description}

${formData.callstack ? `
========================================
CALLSTACK:
========================================

${formData.callstack}
` : ''}

========================================
Generated with Bug Report Formatter
========================================
    `.trim();

    navigator.clipboard.writeText(jiraFormatted);
    toast.success('Complete report copied to clipboard!', {
      duration: 3000
    });
  };

  const copyJiraFieldsOnly = () => {
    const labels = buildLabels();
    const jiraFields = `
Summary: ${data.summary}
Severity: ${data.severity}
Component/s: ${data.component}
Platforms: ${formData.platforms?.join(', ')}
Platforms Tested: ${formData.platformsTested?.join(', ')}
Experiences Impacted: ${formData.experiencesImpacted?.join(', ')}
Labels: ${labels.join(', ') || 'N/A'}
How Found: ${formData.howFound}
Reproduction Rate: ${formData.reproductionCount}
Branch Found In: ${formData.branchFoundIn || 'N/A'}
Found CL: ${formData.foundCL || 'N/A'}
Test Team: ${formData.testTeam || 'N/A'}

Steps to Reproduce:
${data.steps}

Description:
${data.description}
${formData.callstack ? '\n\nCallstack:\n' + formData.callstack : ''}
    `.trim();

    navigator.clipboard.writeText(jiraFields);
    toast.success('Jira fields copied!');
  };

  return (
    <div className="max-w-6xl mx-auto retro-card p-8">
      <Toaster position="top-right" />

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold uppercase" style={{color: 'var(--retro-border)'}}>
          GENERATED BUG REPORT
        </h1>
        <button
          onClick={onReset}
          className="px-4 py-2 font-bold uppercase"
          style={{backgroundColor: 'var(--retro-accent)', color: 'var(--retro-text)'}}
        >
          NEW REPORT
        </button>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-4 mb-8">
        <button
          onClick={copyAllJiraFormat}
          className="flex-1 px-6 py-4 font-bold uppercase text-lg"
          style={{backgroundColor: 'var(--retro-secondary)', color: 'var(--retro-header-text)'}}
        >
          COPY COMPLETE REPORT
        </button>
        <button
          onClick={copyJiraFieldsOnly}
          className="flex-1 px-6 py-4 font-bold uppercase text-lg"
          style={{backgroundColor: 'var(--retro-primary)', color: 'var(--retro-header-text)'}}
        >
          COPY JIRA FIELDS ONLY
        </button>
      </div>

      {/* Generated Fields */}
      <div className="space-y-4">
        <FieldCard
          title="Summary"
          content={data.summary}
          onCopy={() => copyField('Summary', data.summary)}
          copied={copied.summary}
        />

        <FieldCard
          title={`Severity: ${data.severity} - ${SEVERITY_LEVELS[data.severity]}`}
          content={`Severity Level: ${data.severity}\nSeverity Name: ${SEVERITY_LEVELS[data.severity]}`}
          onCopy={() => copyField('Severity', data.severity)}
          copied={copied.severity}
        />

        <FieldCard
          title="Component/s"
          content={data.component}
          onCopy={() => copyField('Component', data.component)}
          copied={copied.component}
        />

        <FieldCard
          title="Steps to Reproduce"
          content={data.steps}
          onCopy={() => copyField('Steps', data.steps)}
          copied={copied.steps}
        />

        <FieldCard
          title="Description"
          content={data.description}
          onCopy={() => copyField('Description', data.description)}
          copied={copied.description}
        />
      </div>

      {/* Manual Fields Summary */}
      <div className="mt-8 p-6" style={{backgroundColor: 'var(--retro-secondary)', border: '3px solid var(--retro-border)', boxShadow: 'var(--retro-shadow)'}}>
        <h3 className="text-xl font-bold uppercase mb-4" style={{color: 'var(--retro-border)'}}>MANUAL FIELDS REFERENCE</h3>
        <div className="grid grid-cols-2 gap-4 text-sm font-mono">
          <div>
            <span className="font-bold" style={{color: 'var(--retro-border)'}}>Project:</span>{' '}
            <span style={{color: 'var(--retro-text)'}}>{formData.project}</span>
          </div>
          <div>
            <span className="font-bold" style={{color: 'var(--retro-border)'}}>Platforms:</span>{' '}
            <span style={{color: 'var(--retro-text)'}}>{formData.platforms?.join(', ')}</span>
          </div>
          <div>
            <span className="font-bold" style={{color: 'var(--retro-border)'}}>Platforms Tested:</span>{' '}
            <span style={{color: 'var(--retro-text)'}}>{formData.platformsTested?.join(', ') || 'N/A'}</span>
          </div>
          <div>
            <span className="font-bold" style={{color: 'var(--retro-border)'}}>How Found:</span>{' '}
            <span style={{color: 'var(--retro-text)'}}>{formData.howFound}</span>
          </div>
          <div>
            <span className="font-bold" style={{color: 'var(--retro-border)'}}>Experiences:</span>{' '}
            <span style={{color: 'var(--retro-text)'}}>{formData.experiencesImpacted?.join(', ')}</span>
          </div>
          <div>
            <span className="font-bold" style={{color: 'var(--retro-border)'}}>Reproduction Rate:</span>{' '}
            <span style={{color: 'var(--retro-text)'}}>{formData.reproductionCount}</span>
          </div>
          {buildLabels().length > 0 && (
            <div className="col-span-2">
              <span className="font-bold" style={{color: 'var(--retro-border)'}}>Labels:</span>{' '}
              <span style={{color: 'var(--retro-text)'}}>{buildLabels().join(', ')}</span>
            </div>
          )}
          {formData.branchFoundIn && (
            <div>
              <span className="font-bold" style={{color: 'var(--retro-border)'}}>Branch:</span>{' '}
              <span style={{color: 'var(--retro-text)'}}>{formData.branchFoundIn}</span>
            </div>
          )}
          {formData.foundCL && (
            <div>
              <span className="font-bold" style={{color: 'var(--retro-border)'}}>Found CL:</span>{' '}
              <span style={{color: 'var(--retro-text)'}}>{formData.foundCL}</span>
            </div>
          )}
          {formData.testTeam && (
            <div>
              <span className="font-bold" style={{color: 'var(--retro-border)'}}>Test Team:</span>{' '}
              <span style={{color: 'var(--retro-text)'}}>{formData.testTeam}</span>
            </div>
          )}
          {formData.deviceSpecs && (
            <div className="col-span-2">
              <span className="font-bold" style={{color: 'var(--retro-border)'}}>Device Specs:</span>{' '}
              <span style={{color: 'var(--retro-text)'}}>{formData.deviceSpecs}</span>
            </div>
          )}
        </div>
      </div>

      {/* Callstack if present */}
      {formData.callstack && (
        <div className="mt-4">
          <FieldCard
            title="Callstack"
            content={formData.callstack}
            onCopy={() => copyField('Callstack', formData.callstack)}
            copied={copied.callstack}
          />
        </div>
      )}

      {/* Reset button at bottom */}
      <div className="mt-8 flex justify-center">
        <button
          onClick={onReset}
          className="px-8 py-4 font-bold uppercase text-lg"
          style={{backgroundColor: 'var(--retro-accent)', color: 'var(--retro-text)'}}
        >
          CREATE NEW BUG REPORT
        </button>
      </div>
    </div>
  );
};

export default AIGeneratedOutput;
