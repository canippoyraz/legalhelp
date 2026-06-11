'use client';

import { useState, useCallback } from 'react';
import { AgreementType } from '@/types/agreement';

interface Props {
  text: string;
  type: AgreementType;
  stateCode: string;
  onBack: () => void;
  onStartOver: () => void;
}

export default function Step3Preview({ text, type, stateCode, onBack, onStartOver }: Props) {
  const [toastVisible, setToastVisible] = useState(false);

  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(text).then(() => {
      setToastVisible(true);
      setTimeout(() => setToastVisible(false), 2500);
    });
  }, [text]);

  const downloadPdf = useCallback(async () => {
    const { downloadAsPdf } = await import('@/lib/pdfGenerator');
    downloadAsPdf(text, type, stateCode);
  }, [text, type, stateCode]);

  return (
    <div className="builder__step">
      <div className="preview-toolbar">
        <h2>Your Agreement is Ready</h2>
        <div className="preview-actions">
          <button className="btn btn--outline" onClick={copyToClipboard}>📋 Copy to Clipboard</button>
          <button className="btn btn--primary" onClick={downloadPdf}>⬇ Download PDF</button>
        </div>
      </div>

      <div className="preview-wrap">
        <div className="preview-doc">{text}</div>
      </div>

      <div className="builder__nav">
        <button className="btn btn--outline" onClick={onBack}>← Edit Details</button>
        <button className="btn btn--ghost" onClick={onStartOver}>Start Over</button>
      </div>

      <div className={`toast${toastVisible ? ' show' : ''}`}>Copied to clipboard!</div>
    </div>
  );
}
