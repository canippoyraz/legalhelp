'use client';

import { AgreementType } from '@/types/agreement';

const TYPES: { type: AgreementType; icon: string; title: string; desc: string; tag: string }[] = [
  { type: 'nda',        icon: '🤝', title: 'Mutual NDA',           desc: 'Protect confidential information shared between two parties — mutual obligations for both.',  tag: 'NDA' },
  { type: 'employment', icon: '💼', title: 'Employment Contract',  desc: 'Define the terms and conditions of an employment relationship.',                               tag: 'Employment' },
  { type: 'freelance',  icon: '🖥️', title: 'Freelance Agreement',  desc: 'Set out the scope, deliverables, and payment for freelance work.',                            tag: 'Freelance' },
  { type: 'lease',      icon: '🏠', title: 'Lease Agreement',      desc: 'Establish the terms for renting a residential or commercial property.',                       tag: 'Lease' },
];

interface Props {
  selectedType: AgreementType | null;
  selectedState: string;
  states: [string, string][];
  onTypeSelect: (t: AgreementType) => void;
  onStateSelect: (s: string) => void;
  onNext: () => void;
}

export default function Step1Type({ selectedType, selectedState, states, onTypeSelect, onStateSelect, onNext }: Props) {
  const ready = !!(selectedType && selectedState);

  return (
    <div className="builder__step">
      <h2>Choose Agreement Type</h2>
      <p className="step-sub">Select the type of agreement you need to create.</p>

      <div className="type-grid">
        {TYPES.map(({ type, icon, title, desc, tag }) => (
          <button
            key={type}
            className={`type-card${selectedType === type ? ' selected' : ''}`}
            onClick={() => onTypeSelect(type)}
          >
            <div className="type-card__icon">{icon}</div>
            <h3>{title}</h3>
            <p>{desc}</p>
            <span className="type-card__tag">{tag}</span>
          </button>
        ))}
      </div>

      <div className="state-selector-wrap">
        <label className="state-selector-label" htmlFor="stateSelect">
          📍 Select Your State <span className="req">*</span>
          <span className="state-selector-hint">State-specific legal provisions are automatically added to your document.</span>
        </label>
        <select
          id="stateSelect"
          className="state-select"
          value={selectedState}
          onChange={e => onStateSelect(e.target.value)}
        >
          <option value="">— Select your state —</option>
          {states.map(([code, name]) => (
            <option key={code} value={code}>{name} ({code})</option>
          ))}
        </select>
      </div>

      <div className="builder__nav">
        <span></span>
        <button className="btn btn--primary" onClick={onNext} disabled={!ready}>
          Next: Fill Details →
        </button>
      </div>
    </div>
  );
}
