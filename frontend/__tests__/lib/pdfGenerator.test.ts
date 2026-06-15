import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock jsPDF before importing the module under test
// Must use a regular function (not arrow) so `new jsPDF()` works
vi.mock('jspdf', () => {
  const JsPDF = vi.fn().mockImplementation(function (this: Record<string, unknown>) {
    this.setFont = vi.fn();
    this.setFontSize = vi.fn();
    this.splitTextToSize = vi.fn().mockReturnValue(['Line one', 'Line two', 'Line three']);
    this.text = vi.fn();
    this.addPage = vi.fn();
    this.output = vi.fn().mockReturnValue(new Blob(['%PDF-1.4 mock'], { type: 'application/pdf' }));
    this.internal = {
      pageSize: {
        getWidth: vi.fn().mockReturnValue(612),
        getHeight: vi.fn().mockReturnValue(792),
      },
    };
  });
  return { jsPDF: JsPDF };
});

import { downloadAsPdf } from '@/lib/pdfGenerator';

describe('downloadAsPdf', () => {
  let anchorElement: HTMLAnchorElement;

  beforeEach(() => {
    anchorElement = { href: '', download: '', click: vi.fn() } as unknown as HTMLAnchorElement;
    vi.spyOn(document, 'createElement').mockReturnValue(anchorElement);
  });

  it('creates an anchor element', () => {
    downloadAsPdf('Sample agreement text', 'nda', 'CA');
    expect(document.createElement).toHaveBeenCalledWith('a');
  });

  it('sets the correct download filename for NDA', () => {
    downloadAsPdf('text', 'nda', 'CA');
    expect(anchorElement.download).toMatch(/^LegalHelp_Mutual_NDA_CA_\d{4}-\d{2}-\d{2}\.pdf$/);
  });

  it('sets the correct download filename for employment', () => {
    downloadAsPdf('text', 'employment', 'TX');
    expect(anchorElement.download).toMatch(/^LegalHelp_Employment_Contract_TX_/);
  });

  it('sets the correct download filename for freelance', () => {
    downloadAsPdf('text', 'freelance', 'NY');
    expect(anchorElement.download).toMatch(/^LegalHelp_Freelance_Agreement_NY_/);
  });

  it('sets the correct download filename for lease', () => {
    downloadAsPdf('text', 'lease', 'FL');
    expect(anchorElement.download).toMatch(/^LegalHelp_Lease_Agreement_FL_/);
  });

  it('sets the href to a blob URL', () => {
    downloadAsPdf('text', 'nda', 'WA');
    expect(anchorElement.href).toBe('blob:mock-url');
    expect(URL.createObjectURL).toHaveBeenCalled();
  });

  it('triggers the download click', () => {
    downloadAsPdf('text', 'nda', 'IL');
    expect(anchorElement.click).toHaveBeenCalledTimes(1);
  });

  it('schedules URL revocation (does not revoke synchronously)', () => {
    vi.useFakeTimers();
    downloadAsPdf('text', 'nda', 'CA');
    // Should NOT have been revoked yet
    expect(URL.revokeObjectURL).not.toHaveBeenCalled();
    vi.runAllTimers();
    // Should have been revoked after the timeout
    expect(URL.revokeObjectURL).toHaveBeenCalledWith('blob:mock-url');
    vi.useRealTimers();
  });

  it('does not throw on empty text', () => {
    expect(() => downloadAsPdf('', 'nda', 'CA')).not.toThrow();
  });
});
