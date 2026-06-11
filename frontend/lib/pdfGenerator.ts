import { jsPDF } from 'jspdf';
import { AgreementType } from '@/types/agreement';

const FILE_NAMES: Record<AgreementType, string> = {
  nda: 'Mutual_NDA',
  employment: 'Employment_Contract',
  freelance: 'Freelance_Agreement',
  lease: 'Lease_Agreement',
};

export function downloadAsPdf(text: string, type: AgreementType, stateCode: string): void {
  const doc = new jsPDF({ unit: 'pt', format: 'letter' });
  const margin = 50;
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const maxLineWidth = pageWidth - margin * 2;
  const lineHeight = 13;

  doc.setFont('Courier', 'normal');
  doc.setFontSize(9);

  const lines = doc.splitTextToSize(text, maxLineWidth) as string[];
  let y = margin;

  for (const line of lines) {
    if (y + lineHeight > pageHeight - margin) {
      doc.addPage();
      y = margin;
    }
    doc.text(line, margin, y);
    y += lineHeight;
  }

  const date = new Date().toISOString().slice(0, 10);
  const filename = `LegalHelp_${FILE_NAMES[type]}_${stateCode}_${date}.pdf`;

  // jsPDF v4 save() is async; use blob + anchor to guarantee a real .pdf download
  const blob = doc.output('blob');
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
