import type { Metadata } from 'next';
import DashboardClient from '@/components/dashboard/DashboardClient';

export const metadata: Metadata = {
  title: 'Dashboard – LegalHelp',
  description: 'View and manage your saved agreements.',
};

export default function DashboardPage() {
  return <DashboardClient />;
}
