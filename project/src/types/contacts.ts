import { Database } from './supabase';

export type Contact = Database['public']['Tables']['contacts']['Row'];

export interface ContactFormData {
  first_name: string;
  last_name: string;
  email?: string;
  phone?: string;
  company?: string;
  type: 'lead' | 'customer' | 'prospect';
  status: 'active' | 'inactive';
  tags: string[];
  custom_fields: Record<string, any>;
  dnd_settings: {
    all: boolean;
    sms: boolean;
    calls: boolean;
  };
}

export interface ContactFilters {
  search?: string;
  type?: string[];
  status?: string[];
  tags?: string[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  customFields?: Record<string, any>;
}

export interface ImportPreview {
  headers: string[];
  rows: string[][];
  mapping: Record<string, string>;
}

export interface DuplicateContact {
  id: string;
  matchType: 'email' | 'phone' | 'name';
  contact: Contact;
  differences: Record<string, { current: any; duplicate: any }>;
}