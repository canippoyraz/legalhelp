export type AgreementType = 'nda' | 'employment' | 'freelance' | 'lease';

export interface FormField {
  id: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  type?: 'text' | 'number' | 'date' | 'textarea';
  min?: number;
}

export interface FormConfig {
  title: string;
  fields: FormField[];
}

export interface FormValues {
  [key: string]: string;
}

export interface HistoryItem {
  id: string;
  type: AgreementType;
  state: string;
  stateName: string;
  parties: string;
  createdAt: string;
  text: string;
}
