'use client';

import { useState, useCallback } from 'react';
import { AgreementType, FormValues, HistoryItem } from '@/types/agreement';
import { FORM_CONFIGS, getParties } from '@/lib/formConfigs';
import { US_STATES, getStateName } from '@/lib/states';
import { generateAgreementText } from '@/lib/templates';
import Step1Type from './Step1Type';
import Step2Details from './Step2Details';
import Step3Preview from './Step3Preview';

type Step = 1 | 2 | 3;

export default function BuilderWizard() {
  const [step, setStep] = useState<Step>(1);
  const [selectedType, setSelectedType] = useState<AgreementType | null>(null);
  const [selectedState, setSelectedState] = useState('');
  const [generatedText, setGeneratedText] = useState('');

  const handleGenerate = useCallback((values: FormValues) => {
    if (!selectedType || !selectedState) return;
    const stateName = getStateName(selectedState);
    const text = generateAgreementText(selectedType, values, selectedState, stateName);
    setGeneratedText(text);
    saveToHistory(text, selectedType, selectedState, stateName, values);
    setStep(3);
  }, [selectedType, selectedState]);

  function saveToHistory(
    text: string,
    type: AgreementType,
    state: string,
    stateName: string,
    values: FormValues,
  ) {
    try {
      const existing: HistoryItem[] = JSON.parse(localStorage.getItem('lh_agreements') || '[]');
      existing.push({
        id: Date.now(), type, state, stateName,
        parties: getParties(type, values),
        createdAt: new Date().toISOString(), text,
      });
      localStorage.setItem('lh_agreements', JSON.stringify(existing));
    } catch { /* localStorage not available */ }
  }

  function startOver() {
    setSelectedType(null);
    setSelectedState('');
    setGeneratedText('');
    setStep(1);
  }

  const stepDotClass = (n: number) => {
    if (step > n) return 'step-dot done';
    if (step === n) return 'step-dot active';
    return 'step-dot';
  };

  return (
    <div className="builder-page">
      <div className="builder__header">
        <div className="container">
          <h1>Agreement Builder</h1>
          <p>Create a professional legal document in minutes. No account required.</p>
          <div className="steps-indicator">
            <div className={stepDotClass(1)}><span>1</span><label>Type</label></div>
            <div className="step-line"></div>
            <div className={stepDotClass(2)}><span>2</span><label>Details</label></div>
            <div className="step-line"></div>
            <div className={stepDotClass(3)}><span>3</span><label>Preview</label></div>
          </div>
        </div>
      </div>

      <div className="container builder__body">
        {step === 1 && (
          <Step1Type
            selectedType={selectedType}
            selectedState={selectedState}
            states={US_STATES}
            onTypeSelect={setSelectedType}
            onStateSelect={setSelectedState}
            onNext={() => setStep(2)}
          />
        )}
        {step === 2 && selectedType && (
          <Step2Details
            type={selectedType}
            config={FORM_CONFIGS[selectedType]}
            stateName={getStateName(selectedState)}
            stateCode={selectedState}
            onBack={() => setStep(1)}
            onGenerate={handleGenerate}
          />
        )}
        {step === 3 && selectedType && (
          <Step3Preview
            text={generatedText}
            type={selectedType}
            stateCode={selectedState}
            onBack={() => setStep(2)}
            onStartOver={startOver}
          />
        )}
      </div>
    </div>
  );
}
