import type { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import BuilderWizard from '@/components/builder/BuilderWizard';

export const metadata: Metadata = {
  title: 'Agreement Builder – LegalHelp',
  description: 'Create a professional legal agreement in minutes.',
};

export default function BuilderPage() {
  return (
    <>
      <Navigation />
      <BuilderWizard />
      <Footer />
    </>
  );
}
