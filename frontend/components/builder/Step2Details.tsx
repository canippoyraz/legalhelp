'use client';

import { useState, FormEvent } from 'react';
import { AgreementType, FormConfig, FormValues } from '@/types/agreement';

interface Props {
  type: AgreementType;
  config: FormConfig;
  stateName: string;
  stateCode: string;
  onBack: () => void;
  onGenerate: (values: FormValues) => void;
}

export default function Step2Details({ config, stateName, stateCode, onBack, onGenerate }: Props) {
  const [values, setValues] = useState<FormValues>(() =>
    Object.fromEntries(config.fields.map(f => [f.id, '']))
  );

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onGenerate(values);
  }

  return (
    <div className="builder__step">
      <h2>{config.title}</h2>
      <p className="step-sub">All fields are used to generate your personalised agreement.</p>

      <div className="state-note">
        <span className="state-badge">📍 {stateName} ({stateCode})</span>
        State-specific legal provisions will be automatically included in your document.
      </div>

      <form className="details-form" onSubmit={handleSubmit}>
        {config.fields.map(field => (
          <div className="form__group" key={field.id}>
            <label htmlFor={field.id}>
              {field.label}{field.required && <span className="req"> *</span>}
            </label>
            {field.type === 'textarea' ? (
              <textarea
                id={field.id}
                placeholder={field.placeholder}
                required={field.required}
                rows={3}
                value={values[field.id]}
                onChange={e => setValues(v => ({ ...v, [field.id]: e.target.value }))}
              />
            ) : (
              <input
                id={field.id}
                type={field.type ?? 'text'}
                placeholder={field.placeholder}
                required={field.required}
                value={values[field.id]}
                onChange={e => setValues(v => ({ ...v, [field.id]: e.target.value }))}
              />
            )}
          </div>
        ))}

        <div className="builder__nav">
          <button type="button" className="btn btn--outline" onClick={onBack}>← Back</button>
          <button type="submit" className="btn btn--primary">Preview Agreement →</button>
        </div>
      </form>
    </div>
  );
}
