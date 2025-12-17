import React, { useState } from 'react';
import TextInput from './FormFields/TextInput';
import TextArea from './FormFields/TextArea';
import Select from './FormFields/Select';
import MultiSelect from './FormFields/MultiSelect';
import PlatformReproRate from './FormFields/PlatformReproRate';
import {
  PLATFORMS,
  HOW_FOUND_OPTIONS,
  EXPERIENCES_IMPACTED,
  TEST_TEAMS,
  DEVICE_SPECS_PRESETS
} from '../constants/jiraFields';

const BugReportForm = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    // Manual fields
    project: 'FORT',
    platforms: [],
    howFound: '',
    experiencesImpacted: [],
    branchFoundIn: '',
    foundCL: '',
    commandLine: '',
    testTeam: '',
    affectsVersions: '',
    deviceSpecs: '',
    customDeviceSpecs: '',

    // Repro rates by platform
    reproRates: {
      'PS4': { occurred: '', total: '' },
      'PS5': { occurred: '', total: '' },
      'XB1': { occurred: '', total: '' },
      'XSX': { occurred: '', total: '' },
      'Switch': { occurred: '', total: '' },
      'PC': { occurred: '', total: '' },
      'Android': { occurred: '', total: '' },
      'iOS': { occurred: '', total: '' },
      'iPAD': { occurred: '', total: '' },
      'Switch 2': { occurred: '', total: '' }
    },

    // AI input fields
    bugDescription: '',
    whatWasDoing: '',
    whereHappened: '',
    workaround: '',
    callstack: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Required fields validation
    if (!formData.bugDescription || formData.bugDescription.length < 20) {
      newErrors.bugDescription = 'Please describe the bug in detail (minimum 20 characters)';
    }

    if (!formData.whatWasDoing) {
      newErrors.whatWasDoing = 'Please describe what you were doing when the bug occurred';
    }

    if (!formData.whereHappened) {
      newErrors.whereHappened = 'Please specify where the bug occurred';
    }

    // Check if at least one platform has repro data
    const hasReproData = Object.values(formData.reproRates).some(
      rate => rate.occurred || rate.total
    );

    if (!hasReproData) {
      newErrors.reproRates = 'Please enter reproduction rate for at least one platform';
    }

    if (!formData.experiencesImpacted || formData.experiencesImpacted.length === 0) {
      newErrors.experiencesImpacted = 'Please select at least one experience impacted';
    }

    if (!formData.howFound) {
      newErrors.howFound = 'Please select how the bug was found';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const fillTestData = () => {
    setFormData({
      project: 'FORT',
      howFound: 'Playtesting',
      experiencesImpacted: ['Battle Royale'],
      branchFoundIn: '39.10',
      foundCL: '38925561',
      commandLine: '',
      testTeam: 'EPAM',
      affectsVersions: '',
      deviceSpecs: 'PS5',
      customDeviceSpecs: '',

      reproRates: {
        'PS4': { occurred: '', total: '' },
        'PS5': { occurred: '3', total: '5' },
        'XB1': { occurred: '', total: '' },
        'XSX': { occurred: '2', total: '5' },
        'Switch': { occurred: '', total: '' },
        'PC': { occurred: '', total: '3' },
        'Android': { occurred: '', total: '' },
        'iOS': { occurred: '', total: '' },
        'iPAD': { occurred: '', total: '' },
        'Switch 2': { occurred: '', total: '' }
      },

      bugDescription: 'Game crashes to desktop when opening inventory while riding a vehicle at high speed',
      whatWasDoing: 'Playing Battle Royale, riding a car and trying to swap weapons in inventory',
      whereHappened: 'Near Mega City POI, on the main road while driving',
      workaround: 'Exit the vehicle before opening inventory',
      callstack: ''
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Calculate platforms where bug occurs (where occurred > 0)
      const platformsWithBug = Object.entries(formData.reproRates)
        .filter(([_, rate]) => parseInt(rate.occurred) > 0)
        .map(([platform]) => platform);

      // Calculate platforms tested (where total > 0)
      const platformsTested = Object.entries(formData.reproRates)
        .filter(([_, rate]) => parseInt(rate.total) > 0)
        .map(([platform]) => platform);

      // Calculate total repro count
      const totalOccurred = Object.values(formData.reproRates)
        .reduce((sum, rate) => sum + (parseInt(rate.occurred) || 0), 0);
      const totalAttempts = Object.values(formData.reproRates)
        .reduce((sum, rate) => sum + (parseInt(rate.total) || 0), 0);

      // Merge device specs if custom is selected
      const finalFormData = {
        ...formData,
        platforms: platformsWithBug,
        platformsTested: platformsTested,
        reproductionCount: `${totalOccurred}/${totalAttempts}`,
        deviceSpecs: formData.deviceSpecs === 'Custom'
          ? formData.customDeviceSpecs
          : DEVICE_SPECS_PRESETS[formData.deviceSpecs] || formData.deviceSpecs
      };

      onSubmit(finalFormData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-5xl mx-auto retro-card p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold" style={{color: 'var(--retro-border)'}}>
          BUG REPORT FORMATTER
        </h1>
      </div>

      {/* Section 1: Basic Information */}
      <div className="mb-8">
        <h2 className="retro-section-header text-xl uppercase">BASIC INFORMATION</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextInput
            label="Project"
            name="project"
            value={formData.project}
            onChange={handleChange}
            placeholder="FORT"
            required
          />

          <Select
            label="How Found"
            name="howFound"
            value={formData.howFound}
            onChange={handleChange}
            options={HOW_FOUND_OPTIONS}
            required
            error={errors.howFound}
          />

          <Select
            label="Test Team"
            name="testTeam"
            value={formData.testTeam}
            onChange={handleChange}
            options={TEST_TEAMS}
          />

          <TextInput
            label="Branch Found In"
            name="branchFoundIn"
            value={formData.branchFoundIn}
            onChange={handleChange}
            placeholder="39.10"
          />

          <TextInput
            label="Found CL"
            name="foundCL"
            value={formData.foundCL}
            onChange={handleChange}
            placeholder="38925561"
          />
        </div>
      </div>

      {/* Section 2: Reproduction Rate by Platform */}
      <div className="mb-8">
        <h2 className="retro-section-header text-xl uppercase">REPRODUCTION RATE</h2>

        <PlatformReproRate
          platforms={PLATFORMS}
          reproRates={formData.reproRates}
          onChange={handleChange}
          error={errors.reproRates}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <Select
            label="Device Specs"
            name="deviceSpecs"
            value={formData.deviceSpecs}
            onChange={handleChange}
            options={Object.keys(DEVICE_SPECS_PRESETS)}
          />

          {formData.deviceSpecs === 'Custom' && (
            <TextInput
              label="Custom Device Specs"
              name="customDeviceSpecs"
              value={formData.customDeviceSpecs}
              onChange={handleChange}
              placeholder="Enter custom device specifications"
            />
          )}
        </div>
      </div>

      {/* Section 3: Experiences */}
      <div className="mb-8">
        <h2 className="retro-section-header text-xl uppercase">EXPERIENCES IMPACTED</h2>

        <MultiSelect
          label="Game Modes / Experiences"
          name="experiencesImpacted"
          value={formData.experiencesImpacted}
          onChange={handleChange}
          options={EXPERIENCES_IMPACTED}
          required
          error={errors.experiencesImpacted}
        />
      </div>

      {/* Section 4: Bug Description (AI Input) */}
      <div className="mb-8">
        <h2 className="retro-section-header text-xl uppercase">BUG DETAILS (FOR AI)</h2>

        <TextArea
          label="Bug Description"
          name="bugDescription"
          value={formData.bugDescription}
          onChange={handleChange}
          placeholder="Describe what happened in detail. Be specific about the issue you observed."
          required
          rows={5}
          error={errors.bugDescription}
          helpText="This will be used to generate the Summary, Steps, and Description"
        />

        <TextArea
          label="What Were You Doing?"
          name="whatWasDoing"
          value={formData.whatWasDoing}
          onChange={handleChange}
          placeholder="Describe the actions you were performing when the bug occurred"
          required
          rows={3}
          error={errors.whatWasDoing}
          helpText="Be specific about the sequence of actions"
        />

        <TextArea
          label="Where Did It Happen?"
          name="whereHappened"
          value={formData.whereHappened}
          onChange={handleChange}
          placeholder="Specify the location, menu, or screen where the bug occurred"
          required
          rows={2}
          error={errors.whereHappened}
          helpText="Include POI names, menu names, specific locations, etc."
        />

        <TextArea
          label="Workaround (Optional)"
          name="workaround"
          value={formData.workaround}
          onChange={handleChange}
          placeholder="Is there any way to avoid or work around this bug?"
          rows={2}
        />
      </div>

      {/* Section 5: Technical Details */}
      <div className="mb-8">
        <h2 className="retro-section-header text-xl uppercase">TECHNICAL DETAILS (OPTIONAL)</h2>

        <TextArea
          label="Callstack"
          name="callstack"
          value={formData.callstack}
          onChange={handleChange}
          placeholder="Paste callstack here if available"
          rows={6}
        />

        <TextInput
          label="Command Line Arguments"
          name="commandLine"
          value={formData.commandLine}
          onChange={handleChange}
          placeholder="-nullRHI -log"
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-end mt-8">
        <button
          type="submit"
          disabled={isLoading}
          className="px-8 py-4 text-lg font-bold uppercase"
          style={{
            backgroundColor: isLoading ? 'var(--retro-accent)' : 'var(--retro-primary)',
            color: 'var(--retro-header-text)'
          }}
        >
          {isLoading ? 'GENERATING...' : 'GENERATE BUG REPORT WITH AI'}
        </button>
      </div>
    </form>
  );
};

export default BugReportForm;
